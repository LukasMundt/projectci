<?php

namespace Lukasmundt\ProjectCI\Http\Requests;

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
            "anrede" => ["string", "max:255", "nullable", Rule::in(['', 'Frau', 'Herr', 'Familie'])],
            "titel" => "nullable|string|max:255",
            "vorname" => "nullable|string|max:255",
            "nachname" => "nullable|string|max:255",
            "email" => "nullable|string|max:255|email",
            "strasse" => "required_with:hausnummer,plz,stadt|nullable|string|max:255",
            "hausnummer" => "required_with:strasse,plz,stadt|nullable|string|max:255",
            "plz" => ["required_with:strasse,hausnummer,stadt", "nullable", "string", "max:5"],
            // nur zahlen hinzufügen
            "stadt" => "required_with:strasse,hausnummer,plz|nullable|string|max:255",
            "telefonnummern.*.value" => ["sometimes", "string", "max:30"] // nur zahlen, bindestrich, plus und leerzeichen
        ];
    }

    public function messages(): array
    {
        return [
            '*.required_with' => 'Wenn eines der anderen Adress-Felder gefüllt ist müssen auch alle anderen befüllt sein.',
            'email.email' => 'Bitte gib eine gültige E-Mail-Adresse ein.',
            '*.string' => "Bitte gib eine Zeichenkette ein.",
            '*.max' => "Bitte kürze deine Eingabe."
        ];
    }
}
