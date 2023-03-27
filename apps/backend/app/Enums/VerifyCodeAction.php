<?php

namespace App\Enums;

enum VerifyCodeAction: string
{
    case Register = 'register';
    case ChangeEmail = 'change_email';
    case ChangePassword = 'change_password';
}
