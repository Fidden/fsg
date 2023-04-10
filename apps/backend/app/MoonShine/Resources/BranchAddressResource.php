<?php

namespace App\MoonShine\Resources;

use App\Models\BranchAddress;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\HasOne;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class BranchAddressResource extends Resource
{
    public static string $model = BranchAddress::class;

    public static string $title = 'BranchAddress';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Branch ID', 'branch'),
            Text::make('Street', 'street'),
            Text::make('Zip', 'zip'),
            Text::make('Comment', 'comment'),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }

    public function search(): array
    {
        return ['id'];
    }

    public function filters(): array
    {
        return [];
    }

    public function actions(): array
    {
        return [
            FiltersAction::make(trans('moonshine::ui.filters')),
        ];
    }
}
