<?php

namespace App\Http\Controllers;

use App\Exports\SupplierExport;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class SupplierController extends Controller
{

    public function index(Request $request)
    {
        $suppliers = Supplier::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->paginate(15);

        return Inertia::render('Suppliers/Index', [
            'suppliers' => $suppliers,
            'filter' => $request->get('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Suppliers/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'document' => 'nullable|string|max:18',
            'address' => 'nullable|string|max:120',
            'phone' => 'nullable|string|max:16',
            'email' => 'nullable|email'
        ]);

        Supplier::create([
            ...$validated,
            'user_id' => $request->user()->id
        ]);

        return redirect(route('suppliers.index'));
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Form', [
            'supplier' => $supplier,
        ]);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'document' => 'nullable|string|max:18',
            'address' => 'nullable|string|max:120',
            'phone' => 'nullable|string|max:16',
            'email' => 'nullable|email'
        ]);

        $supplier->update($validated);

        return redirect(route('suppliers.index'));
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return redirect(route('suppliers.index'));
    }

    public function exportXLSX(Request $request)
    {
        return Excel::download(new SupplierExport($request->user(), $request->only(['search'])), 'Fornecedores.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function exportPDF(Request $request)
    {
        return Excel::download(new SupplierExport($request->user(), $request->only(['search'])), 'Fornecedores.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }
}
