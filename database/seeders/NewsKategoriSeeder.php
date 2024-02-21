<?php

namespace Database\Seeders;

use App\Models\NewsKategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsKategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'kategori' => 'berita'
            ],
            [
                'kategori' => 'artikel',
            ],
            [
                'kategori' => 'pengumuman',
            ]
        ];
        foreach ($data as $item) {
            NewsKategori::create($item);
        }
    }
}
