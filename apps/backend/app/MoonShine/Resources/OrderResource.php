<?php

namespace App\MoonShine\Resources;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\Enum;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Number;
use Leeto\MoonShine\Resources\Resource;

class OrderResource extends Resource
{
    public static string $model = 'App\Models\Order';

    public static string $title = 'Order';

    public static bool $withPolicy = true;

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('User ID', 'user')->sortable(),
            BelongsTo::make('Flight ID', 'flight')->sortable(),
            Enum::make('Status', 'status')->attach(OrderStatus::class),
            BelongsTo::make('Branch ID', 'branch'),
            Number::make('Amount total', 'amount_total'),
            Number::make('Amount paid', 'amount_paid'),
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
