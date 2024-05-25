<?php

namespace App\Http\Controllers;

use App\Models\Historic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Historic::class);

        $historics = Historic::where('user_id', $request->user()->id)->filter($request->only(['search', 'date']))->orderBy('date')->with(['product', 'supplier'])->paginate(15);

        return Inertia::render('Historics/Index', [
            'historics' => $historics,
            'filter' => $request->only(['search', 'date']),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Historic $historic)
    {
        //
    }

    public function edit(Historic $historic)
    {
        //
    }

    public function update(Request $request, Historic $historic)
    {
        //
    }

    public function destroy(Historic $historic)
    {
        //
    }
}
