<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\BranchAddress;
use App\Models\BranchWorkingHour;
use App\Models\City;
use App\Models\Flight;
use App\Models\Storage;
use App\Models\StorageAddress;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CountrySeeder::class,
            PermissionsTableSeeder::class,
            RolesTableSeeder::class,
            PermissionRoleTableSeeder::class,
            UsersTableSeeder::class,
            RoleUserTableSeeder::class,
        ]);

        Branch::factory()->count(50)->create()->each(function (Branch $branch) {
            $branch->workingHours()->saveMany(BranchWorkingHour::factory()->count(4)->make());

            BranchAddress::factory()->create([
                'branch_id' => $branch->id
            ]);

            Storage::factory()->create()->each(function (Storage $storage) use ($branch) {
                StorageAddress::factory()->create([
                    'storage_id' => $storage->id,
                    'city_id' => City::query()->inRandomOrder()->first()->id,
                ]);
                Flight::factory()->count(4)->create([
                    'from_storage_id' => $storage->id,
                    'to_branch_id' => $branch->id,
                ]);
            });
        });
    }
}
