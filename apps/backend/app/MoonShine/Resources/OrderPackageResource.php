<?php

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Resources\Resource;

class OrderPackageResource extends Resource
{
    public static string $model = 'App\Models\OrderPackage';

    public static string $title = 'OrderPackage';

    public function fields(): array
    {
        return [
            BelongsTo::make('Order Id', 'order'),
            BelongsTo::make('Package Id', 'package'),
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
