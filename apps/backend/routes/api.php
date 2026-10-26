
Route::prefix('v1')->group(function () {
    Route::get('/health', [App\Http\Controllers\Api\V1\HealthController::class, 'index']);
});
