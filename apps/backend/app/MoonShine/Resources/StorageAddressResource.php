<?php

namespace App\MoonShine\Resources;

use App\Models\StorageAddress;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class StorageAddressResource extends Resource
{
    public static string $model = StorageAddress::class;

    public static string $title = 'StorageAddress';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Storage ID', 'storage'),
            BelongsTo::make('City', 'city', 'key'),
            Text::make('Street', 'street'),
            Text::make('Zip', 'zip'),
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
