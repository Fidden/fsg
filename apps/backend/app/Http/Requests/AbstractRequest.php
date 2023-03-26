<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @method User|null user($guard = null)
 */
abstract class AbstractRequest extends FormRequest
{
    abstract public function rules(): array;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return callable[]
     */
    protected function getTypeCasts(): array
    {
        return [];
    }

    /**
     * @return string[]
     */
    protected function getRouteParams(): array
    {
        return [];
    }

    /**
     * @param  array|mixed|null  $keys
     */
    public function all($keys = null): array
    {
        $data = parent::all($keys);

        $params = $this->getRouteParams();
        foreach ($params as $routeParam => $key) {
            $data[$key] = $this->route($routeParam);
        }

        $casts = $this->getTypeCasts();
        foreach ($casts as $key => $callback) {
            if (is_callable($callback) && isset($data[$key])) {
                $data[$key] = $callback($data[$key]);
            }
        }

        return $data;
    }
}
