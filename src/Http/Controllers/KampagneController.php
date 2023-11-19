<?php

namespace Lukasmundt\ProjectCI\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\ProjectCI\Http\Requests\StorePersonRequest;
use Lukasmundt\ProjectCI\Http\Requests\UpdatePersonRequest;
use Lukasmundt\ProjectCI\Models\Gruppe;
use Lukasmundt\ProjectCI\Models\Kampagne;
use Lukasmundt\ProjectCI\Models\Person;
use Lukasmundt\ProjectCI\Models\Projekt;
use Lukasmundt\ProjectCI\Models\Telefonnummer;

class KampagneController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('lukasmundt/projectci::Kampagne/Index', [
            'kampagnen' => Kampagne::all(),
        ]);
    }

    public function stepByStepCreate(Request $request, string $id = "0", string $step = "0")
    {
        // Log::debug(Cache::get('SBS01HFJ85Z9YDWHZYWHBMP3K98KR'));
        if ($step == "1") {
            return Inertia::render(
                'lukasmundt/projectci::Kampagne/B_WelcherName',
                ['id' => $id]
            );
        } else if ($step == "2" || $step == "2.1" || $step == "2.2") {
            $campaignCache = Cache::get($id);

            $stadtteile = Projekt::orderBy('stadtteil')->get('stadtteil')->groupBy('stadtteil')->transform(function ($item, string $key) {
                return count($item);
            });
            $stadtteile = $stadtteile->keys()->zip($stadtteile->values());

            $postleitzahl = Projekt::whereIn('stadtteil', $campaignCache['filter']['stadtteil'])->orderBy('plz')->get('plz')->groupBy('plz')->transform(function ($item, string $key) {
                return count($item);
            });
            $postleitzahl = $postleitzahl->keys()->zip($postleitzahl->values());

            $strassen = Projekt::whereIn('stadtteil', $campaignCache['filter']['stadtteil'])
                ->whereIn('plz', $campaignCache['filter']['plz'])
                ->orderBy('strasse')
                ->get('strasse')
                ->groupBy('strasse')
                ->transform(function ($item, string $key) {
                    return count($item);
                });
            $strassen = $strassen->keys()->zip($strassen->values());

            return Inertia::render(
                'lukasmundt/projectci::Kampagne/C_Filter',
                [
                    'step' => $step,
                    'id' => $id,
                    'stadtteile' => $stadtteile,
                    'postleitzahlen' => $postleitzahl,
                    'strassen' => $strassen,
                ]
            );
        } else if ($step == "3") {
            return Inertia::render(
                'lukasmundt/projectci::Kampagne/D_PdfVorlage',
                [
                    'step' => $step,
                    'id' => $id,
                ]
            );
        } else {
            return Inertia::render('lukasmundt/projectci::Kampagne/A_WelcherTyp');
        }
    }

    public function SBS_SetProps(Request $request, string $id = "")
    {
        $validated = $request->validate([
            'key' => ['required', Rule::in(['typ', 'name', 'filter', 'vorlage'])],
        ]);
        if ($validated['key'] == 'typ') {
            $validated = $request->validate([
                'key' => ['required'],
                'typ' => ['required', 'string', 'max:255'],
            ]);

            $ulid = Str::ulid();
            while (Cache::has($ulid)) {
                $ulid = Str::ulid();
            }

            $data = ['typ' => $validated['typ']];

            Cache::put('SBS' . $ulid, $data);

            return redirect(
                route(
                    'projectci.kampagne.SBS-Create',
                    ['step' => 1, 'id' => "SBS" . $ulid]
                )
            );
        } else if ($validated['key'] == 'name') {
            $validated = $request->validate([
                'key' => ['required'],
                'name' => ['required', 'string', 'max:255'],
            ]);
            Log::debug($validated);
            Log::debug($id);

            $data = Cache::get($id);
            $data['name'] = $validated['name'];

            Cache::put($id, $data);

            return to_route(
                'projectci.kampagne.SBS-Create',
                ['step' => 2, 'id' => $id]
            );
        } else if ($validated['key'] == 'filter') {
            $validated = $request->validate([
                'key' => ['required'],
                'filter' => ['required', 'string', 'max:255'],
                'values' => ['array'],
            ]);
            Log::debug($validated);
            Log::debug($id);

            $data = Cache::get($id);
            $data['filter'][$validated['filter']] = $validated['values'];

            Cache::put($id, $data);

            Log::debug(Cache::get($id));

            $nextStep = "2.1";
            if ($validated['filter'] == "plz") {
                $nextStep = "2.2";
            } else if ($validated['filter'] == "straße") {
                $nextStep = "3";
            }
            return to_route(
                'projectci.kampagne.SBS-Create',
                ['step' => $nextStep, 'id' => $id]
            );
        } else if ($validated['key'] == 'vorlage') {
            $validated = $request->validate([
                'key' => ['required'],
                'vorlage' => ['required', File::types(['pdf'])->max(20 * 1024)]
            ]);
            Log::debug($validated);
        }
    }
}