<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {

        $this->call(NewsSeeder::class);
        $this->call(NewsKategoriSeeder::class);
        // $this->call(roles::class);
        $this->call(RolePermissionSeeder::class);
        $this->call(UserTableSeeder::class);
    }
}
