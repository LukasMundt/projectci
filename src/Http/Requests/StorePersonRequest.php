<?php

namespace Lukasmundt\ProjectCI\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePersonRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'anrede' => ['nullable', 'string', 'max:255', Rule::in(['', 'Frau', 'Herr'])],
            'vorname' => ['nullable', 'string', 'max:255'],
            'nachname' => ['nullable', 'string', 'max:255'],
            'telefonnummer' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'string', 'email:rfc,dns', Rule::unique('projectci_person', 'email')],
            'strasse' => ['nullable', 'string', 'max:255'],
            'hausnummer' => ['nullable', 'string', 'max:255'],
            'plz' => ['nullable', 'string', 'max:255'],
            'stadt' => ['nullable', 'string', 'max:255'],
        ];
    }
}
