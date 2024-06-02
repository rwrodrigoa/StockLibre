<?php

namespace App\Http\Controllers;

use App\Exports\HistoricExport;
use App\Models\Historic;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class HistoricController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Historic::class);

        $historics = Historic::where('user_id', $request->user()->id)->filter($request->only(['search', 'date']))->orderBy('created_at', 'desc')->with(['product'])->paginate(15);

        return Inertia::render('Historics/Index', [
            'historics' => $historics,
            'filter' => $request->only(['search', 'date']),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Historic::class);

        return Inertia::render('Historics/Form');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Historic::class);

        $validated = $request->validate([
            'quantity' => 'required|integer|numeric|min:1',
            'type' => 'required|string',
            'description' => 'nullable|string|min:8',
            'code' => 'required|exists:products,code,user_id,' . $request->user()->id,
        ]);

        $product = Product::where('code', $validated['code'])->get()->first();

        $quantity = in_array($validated['type'], ['Retirar do Estoque']) ? $validated['quantity'] * -1 : $validated['quantity'];

        if ($quantity < 0 && $product->quantity < abs($quantity)) {
            return back()->withErrors(['quantity' => 'Quantidade insuficiente em estoque para realizar a retirada.'])->withInput();
        }

        if (!isset($validated['description'])) {
            $description = in_array($validated['type'], ['Retirar do Estoque']) ? 'Retirando do estoque ' . $validated['quantity'] . ' unidade(s) do produto ' . $product->name : 'Adicionado em estoque ' . $validated['quantity'] . ' unidade(s) do produto ' . $product->name;
        } else {
            $description = $validated['description'];
        }

        Historic::create([
            'quantity' => $quantity,
            'type' => $validated['type'],
            'description' => $description,
            'product_id' => $product->id,
            'supplier_id' => $product->supplier?->id,
            'user_id' => $request->user()->id,
        ]);

        $product->update([
            'quantity' => $product->quantity + $quantity,
        ]);

        return redirect()->back();
    }

    public function exportXLSX(Request $request)
    {
        return Excel::download(new HistoricExport($request->user(), $request->only(['search', 'date'])), 'Histórico.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function exportPDF(Request $request)
    {
        return Excel::download(new HistoricExport($request->user(), $request->only(['search', 'date'])), 'Histórico.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }
}
