<?php

namespace App\Notifications;

use App\Enums\VerifyCodeAction;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailChangeNotification extends Notification
{
    use Queueable;

    private User $user;
    private string $newEmail;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, string $newEmail)
    {
        $this->user = $user;
        $this->newEmail = $newEmail;
        $this->user->createVerifyCode(VerifyCodeAction::ChangeEmail, [
            'email' => $newEmail
        ]);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)->markdown('email-change', [
            'code' => $this->user->getVerifyCode(VerifyCodeAction::ChangeEmail),
            'user_email' => $this->user->email,
            'new_email' => $this->newEmail
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
