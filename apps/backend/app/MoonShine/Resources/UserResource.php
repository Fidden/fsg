<?php

namespace App\MoonShine\Resources;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Leeto\MoonShine\Actions\FiltersAction;
use Leeto\MoonShine\Fields\{BelongsTo, ID, Number, Text};
use Leeto\MoonShine\Resources\Resource;

class UserResource extends Resource
{
    public static string $model = User::class;

    public static string $title = 'User';
    public static bool $withPolicy = true;

    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Email', 'email'),
            Text::make('Phone', 'phone'),
            Number::make('Balance', 'balance'),
            BelongsTo::make('Recipient id', 'recipient')
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
