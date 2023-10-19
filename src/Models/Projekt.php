<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Projekt extends Model
{
    use SoftDeletes, HasUlids;

    protected $table = "projectci_projekt";

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
}
