<?php

namespace App\Providers;

use App\MoonShine\Resources\BranchAddressResource;
use App\MoonShine\Resources\BranchResource;
use App\MoonShine\Resources\BranchWorkingHoursResource;
use App\MoonShine\Resources\CityResource;
use App\MoonShine\Resources\CountryResource;
use App\MoonShine\Resources\FlightResource;
use App\MoonShine\Resources\IncomingPackagesResource;
use App\MoonShine\Resources\OrderPackageResource;
use App\MoonShine\Resources\OrderResource;
use App\MoonShine\Resources\RecipientResource;
use App\MoonShine\Resources\ShopResource;
use App\MoonShine\Resources\StorageAddressResource;
use App\MoonShine\Resources\StorageResource;
use App\MoonShine\Resources\UserResource;
use Illuminate\Support\ServiceProvider;
use Leeto\MoonShine\Menu\MenuGroup;
use Leeto\MoonShine\Menu\MenuItem;
use Leeto\MoonShine\MoonShine;
use Leeto\MoonShine\Resources\MoonShineUserResource;
use Leeto\MoonShine\Resources\MoonShineUserRoleResource;

class MoonShineServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        app(MoonShine::class)->menu([
            MenuGroup::make(__('moonshine::ui.resource.system'), [
                MenuItem::make(__('moonshine::ui.resource.admins_title'), new MoonShineUserResource())
                    ->icon('users'),
                MenuItem::make(__('moonshine::ui.resource.role_title'), new MoonShineUserRoleResource())
                    ->icon('bookmark'),
                MenuItem::make(
                    __('moonshine::ui.resource.users_title'),
                    new UserResource()
                )->icon('users'),
                MenuItem::make(
                    __('moonshine::ui.resource.recipient_title'),
                    new RecipientResource()
                ),
                BranchResource::class,
                BranchAddressResource::class,
                BranchWorkingHoursResource::class,
                CountryResource::class,
                CityResource::class,
                FlightResource::class,
                IncomingPackagesResource::class,
                OrderResource::class,
                OrderPackageResource::class,
                ShopResource::class,
                StorageResource::class,
                StorageAddressResource::class
            ])
        ]);
    }
}
