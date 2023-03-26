<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecipientRequest;
use App\Models\Branch;
use App\Models\Interfaces\RecipientInterface;
use App\Models\Recipient;
use OpenApi\Annotations as OA;

class RecipientController extends Controller
{
    /**
     * @OA\Post(
     *     path="/recipients",
     *     tags={"Users"},
     *     summary="Create a recipient",
     *
     *     @OA\Parameter(
     *          name="type",
     *          in="query",
     *          description="Recipient type",
     *
     *          @OA\Schema(
     *              type="string",
     *              enum={"business", "individual_resident", "individual_non_resident"},
     *          ),
     *          required=true,
     *     ),
     *
     *     @OA\Parameter(
     *          name="first_name_en",
     *          in="query",
     *          description="First Name in English (required for individuals)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=2,
     *              maxLength=255,
     *              pattern="^[a-zA-Z]+$",
     *              example="John",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="last_name_en",
     *          in="query",
     *          description="Last Name in English (required for individuals)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=2,
     *              maxLength=255,
     *              pattern="^[a-zA-Z]+$",
     *              example="Doe",
     *          ),
     *      ),
     *
     *      @OA\Parameter(
     *          name="first_name_ka",
     *          in="query",
     *          description="First Name in Georgian (for residents only)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=2,
     *              maxLength=255,
     *              pattern="^[ა-ჰ]+$",
     *              example="გიორგი",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="last_name_ka",
     *          in="query",
     *          description="First Name in Georgian (for residents only)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=2,
     *              maxLength=255,
     *              pattern="^[ა-ჰ]+$",
     *              example="გიორგიაშვილი",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="company_name_en",
     *          in="query",
     *          description="Company Name in English (for companies only)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=2,
     *              maxLength=255,
     *              pattern="^[a-zA-Z]+$",
     *              example="Apple Inc.",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="personal_number",
     *          in="query",
     *          description="Personal Number (for residents only)",
     *
     *          @OA\Schema(
     *              type="number",
     *              minLength=11,
     *              maxLength=11,
     *              example="60001101384",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="document_number",
     *          in="query",
     *          description="Document Number (for non-residents only)",
     *
     *          @OA\Schema(
     *              type="string",
     *              minLength=7,
     *              maxLength=14,
     *              example="12AB63008",
     *          ),
     *     ),
     *
     *     @OA\Parameter(
     *          name="uid",
     *          in="query",
     *          description="Company ID (for companies only)",
     *
     *          @OA\Schema(
     *              type="number",
     *              minLength=7,
     *              maxLength=12,
     *              example="405588380",
     *          ),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated or recipient already exists",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     )
     * )
     */
    public function store(StoreRecipientRequest $request)
    {
        $user = $request->user();

        /** @var Branch $branch */
        $branch = Branch::query()->where('id', $request->branch_id)->firstOrFail();

        $uniqueFields = $request->type::uniqueFields();

        /** @var RecipientInterface $model */
        $model = app($request->type)
            ->query()
            ->firstOrCreate($request->only($uniqueFields), $request->validated());

        /** @var Recipient $recipient */
        $recipient = Recipient::query()->create([
            'user_id' => $user->id,
            'model_type' => $request->type,
            'model_id' => $model->id,
            'address' => null, // FIXME
            'city_id' => $branch->city_id,
            'branch_id' => $request->branch_id,
        ])->setRelations(compact('user', 'model'));

        return response()->json($recipient->toArray(), 201);
    }
}
