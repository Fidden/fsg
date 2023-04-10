<?php

namespace App\MoonShine\Resources;

use App\Enums\FlightStatus;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\Date;
use Leeto\MoonShine\Fields\Enum;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Resources\Resource;

class FlightResource extends Resource
{
    public static string $model = 'App\Models\Flight';

    public static string $title = 'Flight';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Storage ID', 'storage'),
            BelongsTo::make('Branch ID', 'branch'),
            Date::make('Departured at', 'departured_at'),
            Date::make('Arrived at', 'arrived_at'),
            Enum::make('Status', 'status')->attach(FlightStatus::class),
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
