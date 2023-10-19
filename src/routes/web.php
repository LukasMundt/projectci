<?php

use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Lukasmundt\ProjectCI\Http\Controllers\PersonController;
use Lukasmundt\ProjectCI\Http\Controllers\ProjektController;

// Route::group(['middleware' => ['web', 'auth']], function () {
//     Route::get('inspire', [AkquiseController::class, 'index'])->name('akquise.index');
// });

Route::middleware(['web','auth', 'verified'])->prefix("projectci")->group(function () {
    Route::get('', [ProjektController::class, 'index'])->name('akquise.index');
    

    Route::middleware([])->prefix("person")->group(function () {
        Route::get('/create', [PersonController::class, 'create'])->name('projectci.person.create');
        Route::post('', [PersonController::class, 'store'])->name('projectci.person.store');
        Route::get('//{person}/edit', [PersonController::class, 'edit'])->name('projectci.person.edit');
        // Route::patch('{transaction}/status', [TransactionController::class, 'status'])->name('finances.transactions.status');
    });
});