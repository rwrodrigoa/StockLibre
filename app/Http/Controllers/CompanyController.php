<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'document' => 'required|string|max:18',
            'phone' => 'nullable|string|max:16',
            'reverify' => 'required|date|after:today',
        ]);

        if ($request->hasFile('image_url')) {

            $request->validate([
                'image_url' => ['image'],
            ]);

            if ($request->user()->company->image_url != null && $request->user()->company->image_url != '') {
                Storage::disk('public')->delete($request->user()->company->image_url);
            }

            $image_url = $request->file('image_url');
            $path = uniqid() . '_' . $image_url->getClientOriginalName();
            $path = $image_url->storeAs('company', $path, 'public');

            $request->user()->company()->update(['image_url' => $path]);
        }

        $request->user()->company()->update($validated);

        return Redirect::route('profile.edit');
    }

}
