<?php

namespace Lukasmundt\ProjectCI\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\ProjectCI\Http\Requests\StorePersonRequest;
use Lukasmundt\ProjectCI\Models\Person;
use Lukasmundt\ProjectCI\Models\Telefonnummer;
use Spatie\Navigation\Navigation;

class PersonController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render(
            'lukasmundt/projectci::Person/Create',
            [
                'navigation' => app(Navigation::class)->tree(),
            ]
        );
    }

    public function store(StorePersonRequest $request): Response
    {
        $person = Person::create($request->validated());

        return Inertia::render('lukasmundt/projectci::Person/Update', [
            'person' => $person,
        ]);
    }

    public function edit(Request $request, Person $person): Response
    {
        // $person = Person::create($request->validated());

        return Inertia::render('lukasmundt/projectci::Person/Update', [
            'person' => $person,
        ]);
    }
}