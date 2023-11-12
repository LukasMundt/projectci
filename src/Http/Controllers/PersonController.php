<?php

namespace Lukasmundt\ProjectCI\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\ProjectCI\Http\Requests\StorePersonRequest;
use Lukasmundt\ProjectCI\Http\Requests\UpdatePersonRequest;
use Lukasmundt\ProjectCI\Models\Gruppe;
use Lukasmundt\ProjectCI\Models\Person;
use Lukasmundt\ProjectCI\Models\Telefonnummer;

class PersonController extends Controller
{

    public function show(Request $request, Person $person)
    {
        $person = $person->load('gruppe');
        $personenAuchInGruppe = [];
        foreach ($person->load('gruppe.personen')['gruppe']['personen'] as $value) {
            if ($value->id != $person->id) {
                $personenAuchInGruppe[] = $value;
            }
        }
        return Inertia::render('lukasmundt/projectci::Person/Show', [
            'person' => $person,
            'personenAuchInGruppe' => $personenAuchInGruppe,
            'personStr' => $person->nameAsString(),
        ]);
    }

    // public function store(StorePersonRequest $request): Response
    // {
    //     $person = Person::create($request->validated());

    //     return Inertia::render('lukasmundt/projectci::Person/Update', [
    //         'person' => $person,
    //     ]);
    // }

    // public function edit(Request $request, Person $person): Response
    // {
    //     // $person = Person::create($request->validated());

    //     return Inertia::render('lukasmundt/projectci::Person/Update', [
    //         'person' => $person,
    //     ]);
    // }

    public function index(Request $request)
    {
        $personen = Person::paginate();
        return Inertia::render("lukasmundt/projectci::Person/Index", ['personen' => $personen]);
    }

    public function create(Request $request)
    {
        return Inertia::render("lukasmundt/projectci::Person/Create");
    }

    public function store(StorePersonRequest $request)
    {
        // Gruppe erzeugt
        $gruppe = Gruppe::factory()->create();
        $gruppe->update($request->validated());
        $gruppe->save();

        // Person erzeugt
        $person = Person::factory()->create();
        $person->update($request->validated());

        // Gruppe speichern und Person zuordnen
        $gruppe->personen()->save($person);

        if ($request->validated('telefonnummern') != null) {
            // Hinzufügen neuer Telefonnummern
            foreach ($request->validated('telefonnummern') as $newNumber) {
                $person->telefonnummern()->save(Telefonnummer::create(['telefonnummer' => $newNumber['value']]));
            }
        }

        return redirect(route('projectci.person.show', ['person' => $person->id]));
    }

    public function edit(Request $request, Person $person)
    {
        $telefonnummern = [];
        foreach ($person->telefonnummern as $telefonnummer) {
            $telefonnummern[] = ["label" => $telefonnummer->telefonnummer, "value" => $telefonnummer->telefonnummer];
        }

        return Inertia::render("lukasmundt/projectci::Person/Edit", [
            'personId' => $person->id,
            'person' => $person->load('gruppe'),
            'personStr' => $person->nameAsString(),
            'telefonnummernDefault' => $telefonnummern,
        ]);
    }

    public function update(UpdatePersonRequest $request, Person $person)
    {
        // Ändern der Informationen der Person
        $person->update($request->validated());
        // Ändern der Informationen der Gruppe
        $person->gruppe->update($request->validated());


        if ($request->validated('telefonnummern') != null) {
            // Hinzufügen neuer Telefonnummern
            foreach ($request->validated('telefonnummern') as $newNumber) {
                $telefonnummerAdded = false;
                foreach ($person->telefonnummern as $addedNumber) {
                    if ($addedNumber['telefonnummer'] == $newNumber['value']) {
                        $telefonnummerAdded = true;
                    }
                }
                if (!$telefonnummerAdded) {
                    $person->telefonnummern()->save(Telefonnummer::create(['telefonnummer' => $newNumber['value']]));
                }
            }

            // Entfernen alter Telefonnummern
            foreach ($person->telefonnummern as $telefonnummer) {
                $detachNumber = true;
                foreach ($request->validated('telefonnummern') as $newNumber) {
                    if ($telefonnummer['telefonnummer'] == $newNumber['value']) {
                        $detachNumber = false;
                    }
                }
                if ($detachNumber) {
                    Telefonnummer::where('id', $telefonnummer['id'])->first()->delete();
                }
            }
        }


        return redirect(route('projectci.person.show', ['person' => $person->id]));
    }
}