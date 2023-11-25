<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Lukasmundt\Akquise\Models\Akquise;

class Kampagne extends Model
{
    use HasUlids;
    use SoftDeletes;

    protected $table = 'projectci_kampagne';

    protected $fillable = [
        'bezeichnung',
        'status',
        'typ',
        'filter',
        'created_by',
        'updated_by',
        'reichweite'
    ];

    protected $casts = [
        'filter' => 'array',
    ];

    public function vorlage(): MorphTo
    {
        return $this->morphTo('vorlage');
    }

    public function akquise(): MorphToMany
    {
        return $this->morphedByMany(Akquise::class, 'bewerbbar','projectci_kampagne-bewerbbar');
    }
}