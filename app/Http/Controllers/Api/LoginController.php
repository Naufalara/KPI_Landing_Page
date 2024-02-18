<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //set validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json([$validator->errors()], 422);
        }

        //get credentials
        $credentials = $request->only('email', 'password');

        //check if credentials are failed
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['success' => false, 'message' => 'Email atau Password salah'], 401);
        }
        return response()->json([
            'success' => true,
            'user' => auth()->user(),
            'token' => $token,
        ], 200);
    }
}
