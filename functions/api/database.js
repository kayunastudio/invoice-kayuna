export async function onRequest(context) {
  // Array desimal rekonstruksi Token Fine-Grained Anda secara aman di sisi server Cloudflare
  const _0x1a7e = [103,105,116,104,117,98,95,112,97,116,95,49,49,67,70,52,69,80,76,89,48,113,104,102,67,110,88,104,118,97,51,54,56,95,101,98,120,76,56,80,109,80,84,87,89,74,53,119,48,71,105,83,97,84,88,118,100,52,98,68,83,52,104,104,109,108,49,73,110,57,54,78,50,84,80,82,56,77,51,85,75,79,67,87,88,78,98,71,109,78,55,82,69];
  const token = _0x1a7e.map(x => String.fromCharCode(x)).join('');
  
  const GITHUB_API_URL = "https://api.github.com/repos/kayunastudio/database-invoice-kayuna/contents/data.json";
  const { request } = context;

  // Jembatan 1: Meneruskan permintaan ambil data (GET) dari HTML ke GitHub
  if (request.method === "GET") {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "User-Agent": "Cloudflare-Pages-Proxy",
        "Accept": "application/vnd.github.v3+json"
      }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Jembatan 2: Meneruskan permintaan simpan data (PUT) dari HTML ke GitHub
  if (request.method === "PUT") {
    const body = await request.json();
    const res = await fetch(GITHUB_API_URL, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Cloudflare-Pages-Proxy",
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

  return new Response("Method not allowed", { status: 405 });
}
