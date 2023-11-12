<?php

use Illuminate\Support\Facades\Route;
use Lukasmundt\ProjectCI\Http\Controllers\PersonController;
use Lukasmundt\ProjectCI\Http\Controllers\ProjektController;


Route::middleware(['web', 'auth', 'verified'])->prefix("projectci")->group(function () {
    Route::get('', [ProjektController::class, 'index'])->name('akquise.index');

    // Route::get('person/create', [PersonController::class, 'create'])->name('projectci.person.create');
    Route::middleware([])->prefix("/person")->group(function () {
        Route::get('/create', [PersonController::class, 'create'])->name('projectci.person.create');
        Route::post('', [PersonController::class, 'store'])->name('projectci.person.store');

        Route::get("", [PersonController::class, "index"])->name("projectci.person.index");
        Route::get("/{person}", [PersonController::class, "show"])->name("projectci.person.show");

        Route::get('/{person}/edit', [PersonController::class, 'edit'])->name('projectci.person.edit');
        Route::post('/{person}', [PersonController::class, 'update'])->name('projectci.person.update');
    });
});