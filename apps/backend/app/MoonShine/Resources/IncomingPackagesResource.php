<?php

namespace App\MoonShine\Resources;

use App\Models\IncomingPackage;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Number;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class IncomingPackagesResource extends Resource
{
    public static string $model = IncomingPackage::class;

    public static string $title = 'IncomingPackages';

    public static bool $withPolicy = true;

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('User ID', 'user'),
            Text::make('Name', 'name'),
            Number::make('Tracking number', 'tracking_number'),
            BelongsTo::make('Shop', 'shop', 'name'),
            BelongsTo::make('Storage ID', 'storage'),
            Number::make('Weight', 'weight'),
            Text::make('Size', 'size'),
            Number::make('Worth amount', 'worth_amount'),
            Text::make('Worth currency', 'worth_currency')
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
