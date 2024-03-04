<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\Role as ModelsRole;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:role-list', ['only' => ['index', 'show']]);
        $this->middleware('permission:role-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }
    public function index()
    {
        $roles = DB::table('roles')
            ->join('role_has_permissions', 'roles.id', '=', 'role_has_permissions.role_id')
            ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->select('roles.id as role_id', 'roles.name as role', 'permissions.name as permission', 'roles.id as id')
            ->orderBy('id')
            ->get();

        // Kelompokkan data berdasarkan role
        $groupedRoles = [];
        foreach ($roles as $role) {
            $groupedRoles[$role->role_id]['role'] = $role->role;
            $groupedRoles[$role->role_id]['permissions'][] = $role->permission;
            $groupedRoles[$role->role_id]['id'] = $role->id;
        }

        // Ubah format data ke dalam array yang sesuai
        $formattedRoles = [];
        foreach ($groupedRoles as $role) {
            $formattedRoles[] = [
                'id' => $role['id'], // id dari tabel roles
                'role' => $role['role'],
                'permissions' => $role['permissions'],
            ];
        }

        return response()->json($formattedRoles);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permission = Permission::get();
        return response()->json($permission);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'permissions' => 'required',
        ]);

        // Role::create(['name' => $request->input('name')]);

        $data = new Role();
        $data->name = $request->input('name');
        $data->guard_name = 'web';
        $data->save();

        foreach ($request->input('permissions') as $permission) {
            $data->givePermissionTo($permission);
        }
        // $role->syncPermissions($request->permissions);

        return response()->json(['message' => 'Role created successfully']);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")
            ->where("role_has_permissions.role_id", $id)
            ->get();

        return response()->json($rolePermissions);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $roles = DB::table('roles')
            ->join('role_has_permissions', 'roles.id', '=', 'role_has_permissions.role_id')
            ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->select('roles.id as role_id', 'roles.name as role', 'permissions.name as permission', 'roles.id as id')
            ->where('roles.id', $id)
            ->get();

        $groupedRoles = [];
        foreach ($roles as $role) {
            $groupedRoles[$role->role_id]['role'] = $role->role;
            $groupedRoles[$role->role_id]['permissions'][] = $role->permission;
            $groupedRoles[$role->role_id]['id'] = $role->id;
        }

        // Ubah format data ke dalam array yang sesuai
        $formattedRoles = [];
        foreach ($groupedRoles as $role) {
            $formattedRoles = [
                'id' => $role['id'], // id dari tabel roles
                'role' => $role['role'],
                'permissions' => $role['permissions'],
            ];
        }

        return response()->json($formattedRoles);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $this->validate($request, [
        //     'name' => 'required',
        //     'permissions' => 'required',
        // ]);

        $role = Role::findOrFail($id);

        // Update role name
        $role->name = $request->input('name');
        $role->save();

        // Remove all current permissions
        $role->permissions()->detach();

        // Give permissions from the request
        $permissions = $request->input('permissions');
        foreach ($permissions as $permission) {
            $role->givePermissionTo($permission);
        }

        return response()->json(['message' => 'Role updated successfully']);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("roles")->where('id', $id)->delete();
        return response()->json(['message' => 'Role deleted successfully']);
        // // Periksa apakah ada pengguna yang memiliki peran yang akan dihapus
        // $usersWithRole = DB::table('users')->where('role_id', $id)->count();

        // if ($usersWithRole > 0) {
        //     return response()->json(['error' => 'Cannot delete role. There are users assigned to this role.'], 400);
        // }

        // // Jika tidak ada pengguna yang memiliki peran tersebut, maka hapus peran dari basis data
        // DB::table("roles")->where('id', $id)->delete();

        // return response()->json(['message' => 'Role deleted successfully']);
    }
    public function getPermission()
    {
        $data = Permission::all();

        return response()->json($data);
    }

    public function getUserLoginPermission(Request $request)
    {
        $permission = DB::table('role_has_permissions')
            ->join('permissions', 'role_has_permissions.permission_id', '=', 'permissions.id')
            ->where('role_has_permissions.role_id', $request->roleid)
            ->select('permissions.name')
            ->get();

        foreach ($permission as $p) {
            $permissionGroup[] = $p->name;
        }
        return response()->json($permission);
    }
}
