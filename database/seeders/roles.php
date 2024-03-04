<?php

namespace Database\Seeders;

use App\Models\Role as ModelsRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class roles extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'admin', 'guard_name' => 'admin'],
            ['name' => 'user', 'guard_name' => 'admin'],
        ];

        foreach ($data as $item) {
            ModelsRole::insert($item);
        }
    }
}
