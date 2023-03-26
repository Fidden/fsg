<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendSMSJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * @param  string  $phone Format E.164
     */
    public function __construct(protected string $phone, protected string $message)
    {
    }

    public function handle(): void
    {
        $response = Http::asJson()
            ->acceptJson()
            ->withToken(config('services.smsTo.token'))
            ->timeout(10)
            ->post('https://api.sms.to/sms/send', [
                'message' => $this->message,
                'to' => $this->phone,
                'sender_id' => config('services.smsTo.sender_id'),
            ]);

        Log::debug('SMS sent', [
            'phone' => $this->phone,
            'message' => $this->message,
            'response' => $response->json(),
        ]);
    }
}
