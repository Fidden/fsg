<?php

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class CityResource extends Resource
{
    public static string $model = 'App\Models\City';

    public static string $title = 'City';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name', 'key'),
            BelongsTo::make('Country', 'country', 'name')
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
