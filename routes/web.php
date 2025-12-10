<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $countries = json_decode(file_get_contents(resource_path('js/data/countries.json')), true);
    
    return Inertia::render('Home', [
        'countries' => $countries
    ]);
})->name('home');


// TEST ROUTE FOR SANDBOXING NEW FEATURES, DELETE LATER
Route::get('/sandbox', function () {
    return Inertia::render('Sandbox');
})->name('sandbox');