<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('historics', function (Blueprint $table) {
            $table->integer('invoice')->after('description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('historics', function (Blueprint $table) {
            $table->dropColumn('invoice');
        });
    }
};
