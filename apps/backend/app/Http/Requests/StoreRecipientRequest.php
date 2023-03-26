<?php

namespace App\Http\Requests;

use App\Enums\RecipientType;
use App\Models\Branch;
use App\Models\Interfaces\RecipientInterface;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

/**
 * @property class-string|RecipientInterface $type
 * @property string|null $first_name_en
 * @property string|null $last_name_en
 * @property string|null $first_name_ka
 * @property string|null $last_name_ka
 * @property int|null $uid
 * @property int|null $personal_number
 * @property string|null $document_number
 * @property string|null $company_name_en
 * @property int $branch_id
 */
class StoreRecipientRequest extends AbstractRequest
{
    public function authorize(): bool
    {
        /** @var User|null $user */
        $user = auth()->user();

        return $user && is_null($user->recipient);
    }

    protected function getTypeCasts(): array
    {
        $fixName = fn ($value) => Str::ucfirst(mb_strtolower($value));

        return [
            'first_name_en' => $fixName,
            'last_name_en' => $fixName,
            'company_name_en' => fn ($value) => Str::headline(mb_strtolower($value)),
        ];
    }

    public function all($keys = null): array
    {
        $data = parent::all($keys);

        if (isset($data['type'])) {
            $data['type'] = match ($data['type']) {
                'business' => RecipientType::Business->value,
                'individual_resident' => RecipientType::IndividualResident->value,
                'individual_non_resident' => RecipientType::IndividualNonResident->value,
                default => null,
            };
        }

        return $data;
    }

    public function rules(): array
    {
        $enNames = [
            Rule::requiredIf(fn () => $this->type !== RecipientType::Business->value),
            'string',
            'max:255',
            'min:2',
            'regex:/^[a-zA-Z]+$/',
        ];

        $kaNames = [
            Rule::requiredIf(fn () => $this->type === RecipientType::IndividualResident->value),
            'string',
            'max:255',
            'min:2',
            'regex:/^[ა-ჰ]+$/',
        ];

        return [
            'type' => ['required', Rule::in(RecipientType::values())],
            'first_name_en' => $enNames,
            'last_name_en' => $enNames,
            'first_name_ka' => $kaNames,
            'last_name_ka' => $kaNames,
            'uid' => [
                Rule::requiredIf(fn () => $this->type === RecipientType::Business->value),
                'numeric',
                'digits_between:7,12',
            ],
            'company_name_en' => [
                Rule::requiredIf(fn () => $this->type === RecipientType::Business->value),
                'string',
                'max:255',
                'min:2',
                'regex:/^[a-zA-Z0-9()_\-,.\s]+$/',
            ],
            'personal_number' => [
                Rule::requiredIf(fn () => $this->type === RecipientType::IndividualResident->value),
                'numeric',
                'digits:11',
            ],
            'document_number' => [
                Rule::requiredIf(fn () => $this->type === RecipientType::IndividualNonResident->value),
                'string',
                'min:7',
                'max:14',
            ],
            'branch_id' => ['required', 'int', Rule::exists(Branch::class, 'id')],
        ];
    }

    public function attributes(): array
    {
        return [
            'branch_id' => 'branch',
            'company_name_en' => 'company name',
        ];
    }
}
