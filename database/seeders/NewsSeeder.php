<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [

            [
                'judul' => 'Judul Berita 1',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2024-02-19',
                'deskripsi' => 'Deskripsi berita 1.',
                'visibilitas' => 'public',
                'idkategori' => '1',
                'iduploader' => '1'
            ],
            [
                'judul' => 'Judul Berita 2',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2024-02-20',
                'deskripsi' => 'Deskripsi berita 2.',
                'visibilitas' => 'private',
                'idkategori' => '2',
                'iduploader' => '1'
            ],
            // Tambahkan data lainnya di sini
            [
                'judul' => 'Judul Berita 3',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2024-02-21',
                'deskripsi' => 'Deskripsi berita 3.',
                'visibilitas' => 'public',
                'idkategori' => '1',
                'iduploader' => '2'
            ],
            [
                'judul' => 'Judul Berita 4',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2024-02-22',
                'deskripsi' => 'Deskripsi berita 4.',
                'visibilitas' => 'private',
                'idkategori' => '2',
                'iduploader' => '2'
            ],
            [
                'judul' => 'Random Berita 5',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2023-03-23',
                'deskripsi' => 'Sed elementum consequat enim a accumsan.',
                'visibilitas' => 'public',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            [
                'judul' => 'Random Berita 6',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2022-11-05',
                'deskripsi' => 'In hac habitasse platea dictumst.',
                'visibilitas' => 'private',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            [
                'judul' => 'Random Berita 7',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2023-06-12',
                'deskripsi' => 'Praesent id metus ac tellus imperdiet pharetra.',
                'visibilitas' => 'public',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            [
                'judul' => 'Random Berita 8',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2022-07-28',
                'deskripsi' => 'Vestibulum convallis, lacus non euismod volutpat, lacus ante venenatis massa.',
                'visibilitas' => 'private',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            [
                'judul' => 'Random Berita 9',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2023-01-10',
                'deskripsi' => 'Nullam porttitor lorem et nisi porta, non aliquam nisi fermentum.',
                'visibilitas' => 'public',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            [
                'judul' => 'Random Berita 10',
                'foto' => '65d564b974cba.png',
                'tanggal' => '2022-10-22',
                'deskripsi' => 'Sed congue, mi eget bibendum volutpat, augue velit venenatis quam, ut aliquam massa nisi et ligula.',
                'visibilitas' => 'private',
                'idkategori' => mt_rand(1, 3),
                'iduploader' => mt_rand(1, 2)
            ],
            // Tambahkan data lainnya di sini
            // Anda bisa menambahkan data sebanyak yang Anda inginkan
        ];

        foreach ($data as $item) {
            News::create($item);
        }
    }
}
