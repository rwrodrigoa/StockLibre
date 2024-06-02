<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoricController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('dashboard'));
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/company', [CompanyController::class, 'update'])->name('company.update');

    Route::get('categories/export/xlsx', [CategoryController::class, 'exportXLSX'])->name('categories.export.xlsx');
    Route::get('categories/export/pdf', [CategoryController::class, 'exportPDF'])->name('categories.export.pdf');
    Route::resource('categories', CategoryController::class)->except('show');

    Route::get('suppliers/export/xlsx', [SupplierController::class, 'exportXLSX'])->name('suppliers.export.xlsx');
    Route::get('suppliers/export/pdf', [SupplierController::class, 'exportPDF'])->name('suppliers.export.pdf');
    Route::resource('suppliers', SupplierController::class)->except('show');

    Route::get('products/export/xlsx', [ProductController::class, 'exportXLSX'])->name('products.export.xlsx');
    Route::get('products/export/pdf', [ProductController::class, 'exportPDF'])->name('products.export.pdf');
    Route::post('products/{product}/update', [ProductController::class, 'update'])->name('products.update');
    Route::get('products/{product}/label', [ProductController::class, 'label'])->name('products.label');
    Route::resource('products', ProductController::class)->except('show', 'update');

    Route::get('historics/export/xlsx', [HistoricController::class, 'exportXLSX'])->name('historics.export.xlsx');
    Route::get('historics/export/pdf', [HistoricController::class, 'exportPDF'])->name('historics.export.pdf');
    Route::resource('historics', HistoricController::class)->except('show', 'edit', 'update', 'destroy');
});

require __DIR__ . '/auth.php';
