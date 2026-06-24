export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Menangkap route /api/database secara dinamis di level Edge Network
    if (url.pathname === "/api/database") {
      const GITHUB_API_URL = "https://api.github.com/repos/kayunastudio/database-invoice-kayuna/contents/data.json";
      const token = env.GITHUB_TOKEN;

      if (!token) {
        return new Response(JSON.stringify({ error: "Environment variable GITHUB_TOKEN tidak ditemukan!" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Handler untuk MEMBACA database (GET)
      if (request.method === "GET") {
        const res = await fetch(GITHUB_API_URL, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "Cloudflare-Pages-Worker-Proxy",
            "Accept": "application/vnd.github.v3+json"
          }
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: res.status,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Handler untuk MENYIMPAN database (PUT)
      if (request.method === "PUT") {
        const body = await request.json();
        const res = await fetch(GITHUB_API_URL, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "Cloudflare-Pages-Worker-Proxy",
            "Accept": "application/vnd.github.v3+json"
          },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: res.status,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Jika bukan memanggil API, teruskan permintaan untuk membuka file index.html statis
    return env.ASSETS.fetch(request);
  },
};
