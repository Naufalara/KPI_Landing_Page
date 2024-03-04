<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permissions
        $permissions = [
            'create-user', 'index-user', 'edit-user', 'delete-user',
            'delete-news', 'index-news', 'edit-news', 'create-news',
            'change-visibility', 'role-list', 'role-create', 'role-edit', 'role-delete'
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Define roles
        $roles = [
            'admin' => [
                'create-user', 'index-user', 'edit-user', 'delete-user',
                'delete-news', 'index-news', 'edit-news', 'create-news',
                'change-visibility', 'role-list', 'role-create', 'role-edit', 'role-delete'
            ],
            'user' => [
                'index-news', 'edit-news', 'create-news', 'change-visibility'
            ]
        ];

        // Create roles and assign permissions
        foreach ($roles as $roleName => $permissions) {
            $role = Role::create(['name' => $roleName]);
            foreach ($permissions as $permissionName) {
                $role->givePermissionTo($permissionName);
            }
        }
    }
}
