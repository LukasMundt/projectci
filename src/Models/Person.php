<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Person extends Authenticatable
{
    use Notifiable, SoftDeletes, HasUlids;

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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    // protected $hidden = [
    //     'password',
    //     'remember_token',
    // ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    //     'password' => 'hashed',
    // ];

    // public function teams(): MorphToMany
    // {
    //     return $this->morphToMany(Team::class, 'teamable', 'teamable');
    // }

    public function telefonnummern(): HasMany
    {
        return $this->hasMany(Telefonnummer::class, 'person_id');
    }
}
