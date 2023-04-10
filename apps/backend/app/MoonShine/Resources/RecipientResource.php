<?php

namespace App\MoonShine\Resources;

use App\Models\Recipient;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\BelongsTo;
use Leeto\MoonShine\Fields\ID;
use Leeto\MoonShine\Fields\Text;
use Leeto\MoonShine\Resources\Resource;

class RecipientResource extends Resource
{
    public static string $model = Recipient::class;

    public static string $title = 'Recipient';

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('User', 'user', 'email')->searchable(),
            BelongsTo::make('City', 'city', 'key'),
            BelongsTo::make('Branch', 'branch'),
            Text::make('Address', 'address')
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
