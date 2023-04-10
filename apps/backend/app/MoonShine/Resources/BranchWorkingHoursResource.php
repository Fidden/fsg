<?php

namespace App\MoonShine\Resources;

use App\Models\BranchWorkingHour;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class BranchWorkingHoursResource extends Resource
{
    public static string $model = BranchWorkingHour::class;

    public static string $title = 'BranchWorkingHours';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Branch ID', 'branch'),
            Text::make('Day', 'weekday'),
            Text::make('From', 'from'),
            Text::make('To', 'to'),
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
