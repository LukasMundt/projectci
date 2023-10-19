<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Person extends Model
{
    use SoftDeletes, HasUlids;

    protected $table = "projectci_person";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'anrede',
        'vorname',
        'nachname',
        'email',
        'strasse',
        'hausnummer',
        'plz',
        'stadt',
    ];

    public function telefonnummern(): HasMany
    {
        return $this->hasMany(Telefonnummer::class, 'person_id');
    }

    public function gruppen(): BelongsToMany
    {
        return $this->belongsToMany(Gruppe::class,'projectci_gruppe_person','gruppe_id','person_id');
    }
}
