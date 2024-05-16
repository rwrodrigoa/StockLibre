<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->paginate(15);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filter' => $request->get('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'nullable|decimal:10,2',
            'quantity' => 'nullable|numeric|min:0',
            'minimum' => 'nullable|numeric|min:0',
            'location' => 'nullable|string|max:100',
            'weight' => 'nullable|decimal:10,2',
            'length' => 'nullable|decimal:10,2',
            'width' => 'nullable|decimal:10,2',
            'height' => 'nullable|decimal:10,2',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        if ($request->hasFile('image_url')) {

            $request->validate([
                'image_url' => ['image'],
            ]);

            $image_url = $request->file('image_url');
            $path = uniqid() . '_' . $image_url->getClientOriginalName();
            $path = $image_url->storeAs('product', $path, 'public');

            $validated['image_url'] = $path;
        }

        Product::create([
            ...$validated,
            'user_id' => $request->user()->id
        ]);

        return redirect(route('products.index'));
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Form', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'nullable|decimal:10,2',
            'quantity' => 'nullable|numeric|min:0',
            'minimum' => 'nullable|numeric|min:0',
            'location' => 'nullable|string|max:100',
            'weight' => 'nullable|decimal:10,2',
            'length' => 'nullable|decimal:10,2',
            'width' => 'nullable|decimal:10,2',
            'height' => 'nullable|decimal:10,2',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        if ($request->hasFile('image_url')) {

            $request->validate([
                'image_url' => ['image'],
            ]);

            if ($product->image_url != null && $product->image_url != '') {
                Storage::disk('public')->delete($product->image_url);
            }

            $image_url = $request->file('image_url');
            $path = uniqid() . '_' . $image_url->getClientOriginalName();
            $path = $image_url->storeAs('product', $path, 'public');

            $validated['image_url'] = $path;
        }

        $product->update($validated);

        return redirect(route('products.index'));
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect(route('products.index'));
    }
}