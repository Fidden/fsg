<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    /**
     * @throws AuthorizationException
     */
    public function show(Request $request)
    {
        $this->authorize('auth_profile_edit');

        return view('profile.show');
    }
}
