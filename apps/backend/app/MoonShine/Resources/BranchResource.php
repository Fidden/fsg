<?php

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\HasMany;
use Leeto\MoonShine\Fields\HasOne;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class BranchResource extends Resource
{
    public static string $model = 'App\Models\Branch';

    public static string $title = 'Branch';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('City', 'city', 'key'),
            HasMany::make('Working Hours', 'workingHours')->fields([
                Text::make('Day', 'weekday'),
                Text::make('From', 'from'),
                Text::make('To', 'to'),
            ]),
            HasOne::make('Address', 'currentAddress', 'zip')->fields([
                Text::make('Street', 'street'),
                Text::make('Zip', 'zip'),
                Text::make('City', 'city.key'),
            ])
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
