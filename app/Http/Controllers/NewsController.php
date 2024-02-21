<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsKategori;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function index()
    {
        $data = DB::table('news')
            ->join('newskategori', 'news.idkategori', '=', 'newskategori.id')
            ->join('users', 'news.iduploader', '=', 'users.id')
            ->select('news.*', 'newskategori.kategori', 'users.name as uploader')->get();
        return response()->json($data);
    }

    public function showEditForm($id)
    {
        $data = News::where('id', $id)->first();
        return response()->json(compact('data'));
    }

    public function getKategori()
    {
        $data = NewsKategori::selectRaw("CAST(id AS CHAR) AS value, CONCAT(UCASE(SUBSTRING(kategori, 1, 1)), LCASE(SUBSTRING(kategori, 2))) AS label")->get();

        return response()->json($data);
    }

    public function getUploader()
    {
        $data = User::selectRaw("CAST(id AS CHAR) AS value,name AS label")->get();

        return response()->json($data);
    }
}
