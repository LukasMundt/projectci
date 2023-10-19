<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gruppe extends Model
{
    use HasUlids;

    protected $table = "projectci_gruppe";

    public function personen(): HasMany{
        return $this->hasMany(Person::class);
    }
}
