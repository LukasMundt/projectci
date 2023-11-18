<?php

namespace Lukasmundt\ProjectCI\Models;

use App\Models\User;
use EditorJS\EditorJS;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Lukasmundt\ProjectCI\Database\Factories\NotizFactory;

class Notiz extends Model
{
    use HasUlids;
    use HasFactory;

    protected $table = 'projectci_notiz';

    protected $fillable = ['inhalt', 'created_by', 'updated_by'];

    protected $appends = [];

    protected $casts = [
        'inhalt' => 'encrypted',
        // 'created_by' => User::class
    ];

    protected static function newFactory(): Factory
    {
        return NotizFactory::new();
    }

    public function notierbar(): MorphTo
    {
        return $this->morphTo('notierbar');
    }
}