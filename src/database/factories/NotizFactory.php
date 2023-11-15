<?php

namespace Lukasmundt\ProjectCI\Database\Factories;
 
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\Factory;
use Lukasmundt\ProjectCI\Models\Notiz;
 
class NotizFactory extends Factory
{
    protected $model = Notiz::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'inhalt' => fake()->text(200),
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
        ];
    }
}