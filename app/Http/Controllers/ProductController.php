<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->with(['category', 'supplier'])->paginate(15);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filter' => $request->get('search'),
        ]);
    }

    public function create(Request $request)
    {
        $categories = Category::where('user_id', $request->user()->id)->orderBy('name')->get();
        $suppliers = Supplier::where('user_id', $request->user()->id)->orderBy('name')->get();
        return Inertia::render('Products/Form', [
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'quantity' => 'required|numeric|min:0',
            'minimum' => 'required|numeric|min:0',
            'location' => 'nullable|string|max:100',
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'height' => 'nullable|numeric',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
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

    public function edit(Request $request, Product $product)
    {
        $categories = Category::where('user_id', $request->user()->id)->orderBy('name')->get();
        $suppliers = Supplier::where('user_id', $request->user()->id)->orderBy('name')->get();
        return Inertia::render('Products/Form', [
            'product' => $product,
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'quantity' => 'required|numeric|min:0',
            'minimum' => 'required|numeric|min:0',
            'location' => 'nullable|string|max:100',
            'weight' => 'nullable|numeric',
            'length' => 'nullable|numeric',
            'width' => 'nullable|numeric',
            'height' => 'nullable|numeric',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
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
        if ($product->image_url != null && $product->image_url != '') {
            Storage::disk('public')->delete($product->image_url);
        }

        $product->delete();
        return redirect(route('products.index'));
    }

    public function label(Product $product)
    {
        $labelSize = array(0, 0, 300, 82);
        $pdf = Pdf::loadView('pdfs.product_label', compact('product'))->setPaper($labelSize);
        return $pdf->download('Etiqueta '. $product->name .'.pdf');
    }
}
