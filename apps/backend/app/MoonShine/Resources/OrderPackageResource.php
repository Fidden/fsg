<?php

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;

use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Resources\Resource;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Decorations\Block;
use Leeto\MoonShine\Actions\FiltersAction;

class OrderPackageResource extends Resource
{
	public static string $model = 'App\Models\OrderPackage';

	public static string $title = 'OrderPackage';

	public function fields(): array
	{
		return [
		    ID::make('order_id')->sortable(),
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
