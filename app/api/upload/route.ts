// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Membuat nama file unik untuk menghindari tumpang tindih
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    // Simpan file di dalam folder /public/uploads/
    const path = join(process.cwd(), 'public', 'uploads', filename);
    
    await writeFile(path, buffer);

    console.log(`File tersimpan di: ${path}`);

    // Kembalikan path publik yang bisa diakses dari browser
    const publicUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengunggah file.' }, { status: 500 });
  }
}