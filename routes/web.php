<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'message' => 'required|string|max:2000',
    ]);

    Log::info('Portfolio Contact Form Received:', $validated);

    return response()->json([
        'status' => 'success',
        'message' => 'Pesan Anda berhasil diterima oleh backend Laravel 12!',
        'data' => $validated,
    ]);
});
