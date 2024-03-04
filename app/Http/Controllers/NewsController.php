<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsKategori;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:index-news', ['only' => ['index', 'search']]);
        $this->middleware('permission:edit-news', ['only' => ['showEditForm', 'update']]);
        $this->middleware('permission:delete-news', ['only' => ['delete']]);
        $this->middleware('permission:change-visibility', ['only' => ['changeVisibilitas']]);
    }
    public function index()
    {
        $data = DB::table('news')
            ->join('newskategori', 'news.idkategori', '=', 'newskategori.id')
            ->join('users', 'news.iduploader', '=', 'users.id')
            ->select('news.*', 'newskategori.kategori', 'users.name as uploader')->get();

        // Membersihkan tag HTML dari deskripsi
        foreach ($data as $news) {
            $news->deskripsi = strip_tags($news->deskripsi);
            $news->tanggal = date('d-m-Y', strtotime($news->tanggal));
            $news->foto = asset('storage/' . $news->foto);
        }

        return response()->json($data);
    }

    public function showEditForm($id)
    {
        $data = News::where('id', $id)->first();
        $imagebefore = asset('storage/' . $data->foto);
        $responseData = [
            'data' => $data,
            'imagebefore' => $imagebefore
        ];
        return response()->json($responseData);
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

    public function upload(Request $request)
    {
        $data = new News();
        $data->judul = $request->judul;

        $imagename = $request->foto->getClientOriginalName();

        Storage::disk('public')->put($imagename, file_get_contents($request->foto));

        $data->foto = $imagename;

        if ($request->hasFile('foto')) {
            $image = $request->file('foto');
            $originalName = $image->getClientOriginalName(); // Get the original file name
            $imageName = date('Y-m-d_H-i-s') . '_' . uniqid() . '.' . $originalName; // Generate unique file name with date and time
            $image->storeAs('public', $imageName); // Store the image in storage/app/public directory
            $data->foto = $imageName; // Save the image name to the database
        }
        $data->tanggal = $request->tanggal;
        $data->deskripsi = $request->deskripsi;
        $data->visibilitas = $request->visibilitas;
        $data->idkategori = $request->idkategori;
        $data->iduploader = $request->iduploader;
        $data->save();

        // return response()->json(['message' => 'Data berhasil disimpan'],);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        // Mengecek apakah ada file foto dalam request
        if ($request->hasFile('foto')) {
            $image = $request->file('foto');
            $originalName = $image->getClientOriginalName(); // Dapatkan nama file asli
            $imageName = date('Y-m-d_H-i-s') . '_' . uniqid() . '.' . $originalName; // Generate nama file unik dengan tanggal dan waktu
            $image->storeAs('public', $imageName); // Simpan gambar di direktori storage/app/public

            // Mengambil nama foto dari database
            $existingNews = News::findOrFail($id);
            $existingPhoto = $existingNews->foto;

            // Jika nama foto di database berbeda dengan nama foto baru, maka kolom foto diupdate
            if ($existingPhoto !== $imageName) {
                News::where('id', $id)->update([
                    'foto' => $imageName,
                ]);
            }
        }

        // Memeriksa apakah ada tanggal dalam request
        if ($request->tanggal) {
            News::where('id', $id)->update([
                'judul' => $request->judul,
                'tanggal' => $request->tanggal,
                'deskripsi' => $request->deskripsi,
                'visibilitas' => $request->visibilitas,
                'idkategori' => $request->idkategori,
                'iduploader' => $request->iduploader
            ]);
        } else {
            News::where('id', $id)->update([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'visibilitas' => $request->visibilitas,
                'idkategori' => $request->idkategori,
                'iduploader' => $request->iduploader
            ]);
        }

        return response()->json(['message' => 'Data berhasil diubah']);
    }


    public function delete($id)
    {
        try {
            News::where('id', $id)->delete();
            return response()->json(['message' => 'Data berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Data gagal dihapus']);
        }
    }

    public function changeVisibilitas($id)
    {
        $data = News::where('id', $id)->first();
        if ($data->visibilitas == 'public') {
            News::where('id', $id)->update([
                'visibilitas' => 'private'
            ]);
        } else {
            News::where('id', $id)->update([
                'visibilitas' => 'public'
            ]);
        }
        return response()->json(['message' => 'Data berhasil diubah']);
    }
    public function search($searchdata)
    {
        $data = DB::table('news')
            ->join('newskategori', 'news.idkategori', '=', 'newskategori.id')
            ->join('users', 'news.iduploader', '=', 'users.id')
            ->select('news.*', 'newskategori.kategori', 'users.name as uploader')
            ->where(function ($query) use ($searchdata) {
                $query->whereRaw("news.judul LIKE ?", ['%' . $searchdata . '%'])
                    ->orWhereRaw("news.tanggal LIKE ?", ['%' . $searchdata . '%'])
                    ->orWhereRaw("news.deskripsi LIKE ?", ['%' . $searchdata . '%'])
                    ->orWhereRaw("newskategori.kategori LIKE ?", ['%' . $searchdata . '%'])
                    ->orWhereRaw("users.name LIKE ?", ['%' . $searchdata . '%']);
            })
            ->get();

        // Ubah nama file gambar menjadi URL
        foreach ($data as $news) {
            $news->deskripsi = strip_tags($news->deskripsi);
            $news->foto = asset('storage/' . $news->foto);
        }

        return response()->json($data);
    }


    public function showOnLP()
    {
        $data = DB::table('news')
            ->join('newskategori', 'news.idkategori', '=', 'newskategori.id')
            ->select('news.*', 'newskategori.kategori')
            ->where('visibilitas', 'public')
            ->orderBy('tanggal', 'desc')
            ->get();

        // Ubah format tanggal
        foreach ($data as $news) {
            $news->tanggal = date('d-m-Y', strtotime($news->tanggal));
            // $news->deskripsi = strip_tags($news->deskripsi);
            $news->foto = asset('storage/' . $news->foto);
        }

        return response()->json($data);
    }
    public function news($id)
    {
        $data = DB::table('news')
            ->select('id', 'judul', 'foto', 'tanggal', 'deskripsi', 'visibilitas', 'idkategori',)
            ->where('news.id', $id)
            ->get();

        foreach ($data as $news) {
            $news->foto = asset('storage/' . $news->foto);
        }

        return response()->json($data);
    }
}
