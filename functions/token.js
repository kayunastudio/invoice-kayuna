export async function onRequest(context) {
  // Cloudflare otomatis membaca GITHUB_TOKEN dari Environment Variables yang Anda setel tadi
  const token = context.env.GITHUB_TOKEN;

  if (!token) {
    return new Response(JSON.stringify({ error: "Token tidak ditemukan di Cloudflare Configuration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Mengembalikan token secara aman saat dipanggil oleh aplikasi HTML Anda
  return new Response(JSON.stringify({ token: token }), {
    headers: { "Content-Type": "application/json" }
  });
}
