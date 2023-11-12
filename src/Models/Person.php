<?php

namespace Lukasmundt\ProjectCI\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use Lukasmundt\ProjectCI\Database\Factories\PersonFactory;

class Person extends Model
{
    use SoftDeletes, HasUlids, HasFactory;

    protected $table = "projectci_person";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'titel',
        'anrede',
        'vorname',
        'nachname',
        'email',
    ];

    protected $appends = ['name'];

    protected $casts = [
        'name' => 'string',
    ];

    protected static function newFactory(): Factory
    {
        return PersonFactory::new();
    }

    public function telefonnummern(): HasMany
    {
        return $this->hasMany(Telefonnummer::class, 'person_id');
    }

    public function gruppe(): BelongsTo
    {
        return $this->belongsTo(Gruppe::class, 'gruppe_id');
    }

    public function nameAsString(): string
    {
        $result = "";

        $result .= empty($this->anrede) ? "" : $this->anrede . " ";
        $result .= empty($this->titel) ? "" : $this->titel . " ";
        $result .= empty($this->vorname) ? "" : $this->vorname . " ";
        $result .= empty($this->nachname) ? "" : $this->nachname . " ";
        $result = Str::squish($result);

        return $result;
    }

    protected function name(): Attribute
    {
        return new Attribute(
            get: fn() => $this->nameAsString(),
        );
    }
}
