<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Udin Makarov',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'roleid' => 1,
        ]);

        $admin->assignRole('admin');

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john.doe@gmail.com',
            'password' => bcrypt('password'),
            'roleid' => 2,
        ]);
        $user->assignRole('user');
    }
}
