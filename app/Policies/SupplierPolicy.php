<?php

namespace App\Policies;

use App\Models\Supplier;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SupplierPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Supplier $supplier): bool
    {
        return $user->id === $supplier->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Supplier $supplier): bool
    {
        return $user->id === $supplier->user_id;
    }

    public function delete(User $user, Supplier $supplier): bool
    {
        return $user->id === $supplier->user_id;
    }
}
