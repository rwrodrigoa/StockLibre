<?php

namespace App\Http\Controllers;

use App\Exports\ProductExport;
use App\Models\Category;
use App\Models\Historic;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use Picqer\Barcode\BarcodeGeneratorHTML;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Product::class);

        $products = Product::where('user_id', $request->user()->id)->filter($request->only(['search']))->orderBy('name')->with(['category', 'supplier'])->paginate(15);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filter' => $request->get('search'),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorize('create', Product::class);

        $categories = Category::where('user_id', $request->user()->id)->orderBy('name')->get();
        $suppliers = Supplier::where('user_id', $request->user()->id)->orderBy('name')->get();
        return Inertia::render('Products/Form', [
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Product::class);

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

        $product = Product::create([
            ...$validated,
            'user_id' => $request->user()->id
        ]);

        Historic::create([
            'quantity' => $product->quantity,
            'type' => 'Novo produto',
            'description' => 'Estoque inicial do novo produto no sistema',
            'product_id' => $product->id,
            'supplier_id' => $product->supplier?->id,
            'user_id' => $request->user()->id,
        ]);

        return redirect(route('products.index'));
    }

    public function edit(Request $request, Product $product)
    {
        $this->authorize('update', $product);

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
        $this->authorize('update', $product);

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

        $oldQuantity = $product->quantity;

        $product->update($validated);


        if ($product->quantity !== $oldQuantity) {
            Historic::create([
                'quantity' => $product->quantity - $oldQuantity,
                'type' => 'Edição do produto',
                'description' => 'Ajuste manual no produto no sistema',
                'product_id' => $product->id,
                'supplier_id' => $product->supplier?->id,
                'user_id' => $request->user()->id,
            ]);
        }

        return redirect(route('products.index'));
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        if ($product->image_url != null && $product->image_url != '') {
            Storage::disk('public')->delete($product->image_url);
        }

        $product->delete();
        return redirect(route('products.index'));
    }

    public function label(Product $product)
    {
        $product->price = number_format($product->price, 2, ",", ".");
        $labelSize = array(0, 0, 250, 80);
        $generator = new BarcodeGeneratorHTML();
        $barcode = $generator->getBarcode($product->code, $generator::TYPE_CODE_128);
        $pdf = Pdf::loadView('pdfs.product_label', [
            'product' => $product,
            'barcode' => $barcode,
        ])->setPaper($labelSize);
        return $pdf->stream('Etiqueta ' . $product->name . '.pdf');
    }

    public function exportXLSX(Request $request)
    {
        return Excel::download(new ProductExport($request->user(), $request->only(['search'])), 'Produtos.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    public function exportPDF(Request $request)
    {
        return Excel::download(new ProductExport($request->user(), $request->only(['search'])), 'Produtos.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }
}
