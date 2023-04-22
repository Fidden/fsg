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
use Leeto\MoonShine\Models\MoonshineUser;
use Leeto\MoonShine\MoonShine;
use Leeto\MoonShine\MoonShineRequest;
use Leeto\MoonShine\Resources\MoonShineUserResource;
use Leeto\MoonShine\Resources\MoonShineUserRoleResource;

class MoonShineServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        app(MoonShine::class)->menu([
            MenuGroup::make(__('moonshine::ui.resource.system'), [
                MenuItem::make(
                    __('moonshine::ui.resource.admins_title'),
                    new MoonShineUserResource()
                )
                    ->icon('users')
                    ->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),
                MenuItem::make(
                    __('moonshine::ui.resource.role_title'),
                    new MoonShineUserRoleResource()
                )
                    ->icon('bookmark')
                    ->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),
                MenuItem::make(
                    __('moonshine::ui.resource.users_title'),
                    new UserResource()
                )
                    ->icon('users')
                    ->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.recipient_title'),
                    new RecipientResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.branch_title'),
                    new BranchResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.branch_address_title'),
                    new BranchAddressResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.branch_hours_title'),
                    new BranchWorkingHoursResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),


                MenuItem::make(
                    __('moonshine::ui.resource.country_title'),
                    new CountryResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.city_title'),
                    new CityResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.flight_title'),
                    new FlightResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.incoming_package_title'),
                    new IncomingPackagesResource()
                ),

                MenuItem::make(
                    __('moonshine::ui.resource.order_title'),
                    new OrderResource()
                ),

                MenuItem::make(
                    __('moonshine::ui.resource.order_package_title'),
                    new OrderPackageResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.shop_title'),
                    new ShopResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.storage_title'),
                    new StorageResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),

                MenuItem::make(
                    __('moonshine::ui.resource.storage_address_title'),
                    new StorageAddressResource()
                )->canSee(fn (MoonShineRequest $request) => $this->isAdmin($request)),
            ])
        ]);
    }

    private function isAdmin(MoonShineRequest $request)
    {
        return $request->user('moonshine')->moonshineUserRole()->value('name') === 'Admin';
    }
}
