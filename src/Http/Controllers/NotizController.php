<?php

namespace Lukasmundt\ProjectCI\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\ProjectCI\Http\Requests\SaveNotizRequest;
use Lukasmundt\ProjectCI\Http\Requests\StorePersonRequest;
use Lukasmundt\ProjectCI\Http\Requests\UpdatePersonRequest;
use Lukasmundt\ProjectCI\Models\Gruppe;
use Lukasmundt\ProjectCI\Models\Notiz;
use Lukasmundt\ProjectCI\Models\Person;
use Lukasmundt\ProjectCI\Models\Telefonnummer;

class NotizController extends Controller
{
    public function save(SaveNotizRequest $request)
    {
        $model = null;
        switch ($request->validated('related_type')) {
            case "Lukasmundt\\Akquise\\Models\\Akquise":
                $model = Akquise::where('id', $request->validated('related_id'))->first();
                break;

            // default:
            //     # code...
            //     break;
        }

        // neue Notiz
        if (empty($request->validated('id'))) {
            if ($model == null) {
                Log::error('Moin');
            } else {

                $model->notizen()
                    ->save(
                        $notiz = new Notiz([
                            'inhalt' => json_encode($request->validated('notiz')),
                            'created_by' => Auth::user()->id,
                            'updated_by' => Auth::user()->id,
                        ])
                    );
            }

        }
        // bestehende Notiz
        {
            $notiz = Notiz::where('id', $request->validated('id'))->first();
            $notiz->inhalt = json_encode($request->validated('notiz'));
            $notiz->updated_by = Auth::user()->id;
            $notiz->save();
        }
        // Log::debug();
        Log::debug($request->validated());

        // return Inertia::lazy(fn() => 'hallo');
        return redirect(route('akquise.akquise.showMitNotiz', ['projekt' => $model->projekt_id, 'notiz' => $notiz]));
    }
}