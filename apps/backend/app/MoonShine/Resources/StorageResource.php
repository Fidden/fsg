<?php

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\HasOne;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class StorageResource extends Resource
{
    public static string $model = 'App\Models\Storage';

    public static string $title = 'Storage';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Country', 'country', 'name'),
            HasOne::make('Address', 'currentAddress', 'zip')->fields([
                BelongsTo::make('City', 'city', 'key'),
                Text::make('Street', 'street'),
                Text::make('Zip', 'zip'),
            ]),
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
