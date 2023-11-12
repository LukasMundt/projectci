<?php

namespace Lukasmundt\ProjectCI\Database\Factories;
 
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\Factory;
use Lukasmundt\ProjectCI\Models\Person;
 
class PersonFactory extends Factory
{
    protected $model = Person::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'anrede' => "",
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
        ];
    }
}