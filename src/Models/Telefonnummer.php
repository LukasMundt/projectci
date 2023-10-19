<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Telefonnummer extends Authenticatable
{
    use  HasUlids;

    protected $table = "projectci_person_telefonnummer";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'telefonnummer',
        'typ',
        
    ];

    public function personen(): BelongsTo
    {
        return $this->BelongsTo(Person::class,'person_id');
    }
}
