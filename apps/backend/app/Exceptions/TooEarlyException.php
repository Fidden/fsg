<?php

namespace App\Exceptions;

use Exception;

class TooEarlyException extends Exception
{
    public function __construct(string $message = 'Too early. Try again later')
    {
        parent::__construct($message);
    }
}
