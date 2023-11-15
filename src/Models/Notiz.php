<?php

namespace Lukasmundt\ProjectCI\Models;

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

    protected $appends = ['blocks'];

    protected $casts = [
        'blocks' => 'array',
    ];

    protected static function newFactory(): Factory
    {
        return NotizFactory::new();
    }

    public function notierbar(): MorphTo
    {
        return $this->morphTo('notierbar');
    }

    public function blocksAsArray(): array
    {
        $editor = new EditorJS(
            $this->inhalt,
            json_encode([
                "tools" => [
                    "header" => [
                        "text" => [
                            "type" => "string",
                            "required" => true,
                            "allowedTags" => "b,i,a[href]"
                        ],
                        "level" => [
                            "type" => "int",
                            "canBeOnly" => [1, 2, 3, 4, 5, 6]
                        ]
                    ],
                    "paragraph" => [
                        "text" => [
                            "type" => "string",
                            "allowedTags" => "i,b,u,a[href]"
                        ]
                    ],
                ]
            ])

        );
        return $editor->getBlocks();
    }
    protected function blocks(): Attribute
    {
        return new Attribute(
            get: fn() => $this->blocksAsArray(),
        );
    }
}