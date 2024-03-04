<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user()->roleid == 2) {
            return response()->json(['message' => 'Unauthorized'], 403);
        } else if (auth()->user()->roleid == 1) {
            return response()->json(['message' => 'Authorized']);
        }
        return $next($request);
    }
}
