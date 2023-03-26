<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Recipient;
use App\Models\Shop;
use App\Models\Storage;
use Database\Seeders\CountrySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(CountrySeeder::class);
    }

    public function testListOrders()
    {
        /** @var Recipient $recipient */
        $recipient = Recipient::factory()->create();

        $this->actingAs($recipient->user)
            ->get('/orders')
            ->assertOk();
    }

    public function testCreateOrder()
    {
        /** @var Recipient $recipient */
        $recipient = Recipient::factory()->create();

        /** @var Shop $shop */
        $shop = Shop::factory()->create();

        /** @var Storage $storage */
        $storage = Storage::factory()->create();

        /** @var Branch $branch */
        $branch = Branch::factory()->create();

        $response = $this->actingAs($recipient->user)
            ->post('/orders', [
                'tracking_number' => '123456789012',
                'name' => 'flashlight',
                'weight' => 0.37,
                'shop_id' => $shop->id,
                'storage_id' => $storage->id,
                'branch_id' => $branch->id,
                'worth_amount' => 10.99,
                'worth_currency' => 'USD',
            ])->assertCreated();

        echo $response->getContent();
    }
}
