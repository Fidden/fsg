<?php

namespace App\Policies;

use App\Enums\OrderStatus;
use App\Models\Order;
use Leeto\MoonShine\Models\MoonshineUser;

class OrderPolicy
{
    public function viewAny(MoonshineUser $user)
    {
        return true;
    }

    public function view(MoonshineUser $user, Order $model)
    {
        return true;
    }

    public function create(MoonshineUser $user)
    {
        return true;
    }

    public function update(MoonshineUser $user, Order $model)
    {
        if ($user->moonshineUserRole()->value('name') === 'Worker'
            && $model->status === OrderStatus::Pending
        ) {
            return false;
        }

        return true;
    }

    public function delete(MoonshineUser $user, Order $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function massDelete(MoonshineUser $user)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function restore(MoonshineUser $user, Order $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function forceDelete(MoonshineUser $user, Order $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }
}
