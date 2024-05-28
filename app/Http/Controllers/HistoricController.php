<?php

namespace App\Http\Controllers;

use App\Models\Historic;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Historic::class);

        $historics = Historic::where('user_id', $request->user()->id)->filter($request->only(['search', 'date']))->orderBy('date')->with(['product'])->paginate(15);

        return Inertia::render('Historics/Index', [
            'historics' => $historics,
            'filter' => $request->only(['search', 'date']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Historics/Form');
    }

    // TODO: Finalizar descrição e tipo ao salvar no banco.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|numeric|min:1',
            'type' => 'required|boolean',
            'description' => 'nullable|string|min:8',
            'code' => 'required|exists:products,code,user_id,' . $request->user()->id,
        ]);

        $product = Product::where('code', $validated['code'])->get()->first();

        $quantity = $validated['type'] === false ? $validated['quantity'] * -1 : $validated['quantity'];

        Historic::create([
            'quantity' => $quantity,
            'type' => $validated['type'],
            'description' => $validated['description'],
            'product_id' => $product->id,
            'supplier_id' => $product->supplier?->id,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->back();
    }
}
