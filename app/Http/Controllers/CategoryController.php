<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->paginate(15);
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'filter' => $request->get('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Form');
    }

    public function store(Request $request)
    {
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
        return Inertia::render('Categories/Form', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'description' => 'nullable|string'
        ]);

        $category->update($validated);

        return redirect(route('categories.index'));
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect(route('categories.index'));
    }
}
