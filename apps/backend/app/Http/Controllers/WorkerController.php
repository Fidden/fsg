<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkerController extends Controller
{
    public function income(): \Illuminate\Contracts\View\View|\Illuminate\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Foundation\Application
    {
        $user = auth('moonshine')->user();
        if (!$user) {
            return redirect()->route('moonshine.login');
        }

        return view('worker.income');
    }

    public function outcome(): \Illuminate\Contracts\View\View|\Illuminate\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Foundation\Application
    {
        $user = auth('moonshine')->user();
        if (!$user) {
            return redirect()->route('moonshine.login');
        }

        return view('worker.outcome');
    }
}
