<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

    public User $user;
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'roleid' => 'required',
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'roleid' => $data['roleid'],
        ]);

        $role = DB::table('roles')->where('id', $data['roleid'])->first();

        if ($role) {
            $user = User::where('email', $data['email'])->first();
            $user->assignRole($role->name);
        }

        return response()->json([
            'message' => 'registered'
        ], 200);
    }

    public function login(LoginRequest $request)
    {

        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 422);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24); // 1 day


        return response()->json([
            'message' => 'Logged in',
        ], 200)->withCookie($cookie);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out'
        ])->withCookie($cookie);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
