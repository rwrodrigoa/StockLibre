<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $sums = [];
        $sums['sum_categories'] = Category::where('user_id', $request->user()->id)->get()->count();
        $sums['sum_suppliers'] = Supplier::where('user_id', $request->user()->id)->get()->count();
        $sums['sum_products_ok'] = Product::where('user_id', $request->user()->id)->whereColumn('quantity', '>', 'minimum')->get()->count();
        $sums['sum_products_minimum'] = Product::where('user_id', $request->user()->id)->whereColumn('quantity', '<=', 'minimum')->get()->count();

        return Inertia::render('Dashboard', [
            'sums' => $sums,
        ]);
    }
}
