<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{

    function __construct()
    {
        $this->middleware('permission:index-user', ['only' => ['index', 'search']]);
        $this->middleware('permission:edit-user', ['only' => ['showEditForm', 'update']]);
        $this->middleware('permission:delete-user', ['only' => ['delete']]);
    }

    public User $user;
    public function index()
    {
        $data = DB::table('users')
            ->join('roles', 'users.roleid', '=', 'roles.id')
            ->select('users.*', 'roles.name as role')->get();

        return response()->json($data);
    }
    public function showEditForm($id)
    {
        $data = DB::table('users')
            ->join('roles', 'users.roleid', '=', 'roles.id')
            ->select('users.*', 'roles.name as role')->where('users.id', $id)->first();
        return response()->json($data);
    }

    public function getRole()
    {
        $data = DB::table('roles')->selectRaw("CAST(id AS CHAR) AS value, name AS label")->get();

        return response()->json($data);
    }
    public function update(Request $request)
    {
        if ($request->password) {
            $data = DB::table('users')->where('id', $request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'roleid' => $request->roleid,
                'password' => bcrypt($request->password),
            ]);
        } else {
            $data = DB::table('users')->where('id', $request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'roleid' => $request->roleid,
            ]);
        }
        return response()->json($data);
    }

    public function delete($id)
    {
        $data = DB::table('users')->where('id', $id)->delete();
        return response()->json($data);
    }

    public function search($searchdata)
    {
        $data = DB::table('users')
            ->join('roles', 'users.roleid', '=', 'roles.id')
            ->select('users.*', 'roles.name as role')
            ->where('users.name', 'like', '%' . $searchdata . '%')
            ->orWhere('users.email', 'like', '%' . $searchdata . '%')
            ->get();

        if ($data->isEmpty()) {
            return response()->json(['error' => 'No matching records found.'], 404);
        }

        return response()->json($data);
    }
}
