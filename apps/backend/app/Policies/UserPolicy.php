<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Leeto\MoonShine\Models\MoonshineUser;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(MoonshineUser $user)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function view(MoonshineUser $user, User $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function create(MoonshineUser $user)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function update(MoonshineUser $user, User $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function delete(MoonshineUser $user, User $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function massDelete(MoonshineUser $user)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function restore(MoonshineUser $user, User $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }

    public function forceDelete(MoonshineUser $user, User $model)
    {
        return $user->moonshineUserRole()->value('name') === 'Admin';
    }
}
