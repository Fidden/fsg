<?php

namespace App\Policies;

use App\Enums\OrderStatus;
use App\Models\IncomingPackage;
use Leeto\MoonShine\Models\MoonshineUser;

class IncomingPackagePolicy
{
    public function viewAny(MoonshineUser $user)
    {
        return true;
    }

    public function view(MoonshineUser $user, IncomingPackage $model)
    {
        return true;
    }

    public function create(MoonshineUser $user)
    {
        return true;
    }

    public function update(MoonshineUser $user, IncomingPackage $model)
    {
        if ($user->moonshineUserRole()->value('name') === 'Worker'
            && $model->orders()->first()->status === OrderStatus::Pending
        ) {
            return false;
        }

        return true;
    }

    public function delete(MoonshineUser $user, IncomingPackage $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function massDelete(MoonshineUser $user)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function restore(MoonshineUser $user, IncomingPackage $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function forceDelete(MoonshineUser $user, IncomingPackage $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }
}
