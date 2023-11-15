<?php

namespace Lukasmundt\ProjectCI\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lukasmundt\ProjectCI\Models\Notiz;

class SaveNotizRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    protected function prepareForValidation(): void
    {
        $this->merge([
            'id' => Notiz::where('id', $this->id)->first() == null ? "" : $this->id,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            "id" => ["sometimes", "ulid"],
            "notiz" => "required|array",
            "related_type" => "required|string",
            "related_id" => "required"
        ];
    }

    public function messages(): array
    {
        return [
            "*.*" => "Es ist leider ein Fehler aufgetreten. Bitte versuchen Sie es später nochmal oder benachrichtigen Sie Ihren Administrator.",
        ];
    }
}
