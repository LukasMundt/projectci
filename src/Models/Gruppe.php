<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\Factory;
use Lukasmundt\ProjectCI\Database\Factories\GruppeFactory;

class Gruppe extends Model
{
    use HasUlids, HasFactory;

    protected $table = "projectci_gruppe";
    protected $primaryKey = "id";
    protected $fillable = ['typ', 'strasse', 'hausnummer', 'plz', 'stadt'];

    protected static function newFactory(): Factory
    {
        return GruppeFactory::new();
    }

    public function personen(): HasMany
    {
        return $this->hasMany(Person::class, 'gruppe_id');
    }

    public function namesAsString(): string
    {
        $personen = $this->personen;
        $result = "";

        foreach ($personen as $person) {
            if (!empty($label)) {
                $result .= " und ";
            }

            // Bezeichnung dieser Person erzeugen
            $result .= $person->nameAsString();
        }

        return $result;
    }
}
