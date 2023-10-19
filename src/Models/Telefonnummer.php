<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Telefonnummer extends Model
{
    use HasUlids;

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
