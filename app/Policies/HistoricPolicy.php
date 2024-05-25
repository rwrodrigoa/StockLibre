<?php

namespace App\Policies;

use App\Models\Historic;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class HistoricPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Historic $historic): bool
    {
        return $user->id === $historic->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Historic $historic): bool
    {
        return $user->id === $historic->user_id;
    }

    public function delete(User $user, Historic $historic): bool
    {
        return $user->id === $historic->user_id;
    }
}
