<?php

namespace App\Http\Controllers;

use App\Exports\CategoryExport;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);

        $categories = Category::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->paginate(15);
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'filter' => $request->get('search'),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Category::class);

        return Inertia::render('Categories/Form');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Category::class);

        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'nullable|string'
        ]);

        Category::create([
            ...$validated,
            'user_id' => $request->user()->id
        ]);

        return redirect(route('categories.index'));
    }

    public function edit(Category $category)
    {
        $this->authorize('update', $category);

        return Inertia::render('Categories/Form', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'nullable|string'
        ]);

        $category->update($validated);

        return redirect(route('categories.index'));
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $category->delete();
        return redirect(route('categories.index'));
    }

    public function exportXLSX(Request $request)
    {
        return Excel::download(new CategoryExport($request->user(), $request->only(['search'])), 'Categorias.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function exportPDF(Request $request)
    {
        return Excel::download(new CategoryExport($request->user(), $request->only(['search'])), 'Categorias.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }
}
