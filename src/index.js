const FEED_URL = "https://raw.githubusercontent.com/OceaniaVPN/Proxy_sait/main/proxies.txt";

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { "Allow": "GET, HEAD", "X-Content-Type-Options": "nosniff" }
      });
    }

    if (url.pathname === "/proxies.txt") {
      try {
        const upstream = await fetch(FEED_URL, {
          headers: { "Accept": "text/plain" },
          cf: { cacheTtl: 60, cacheEverything: true }
        });

        if (upstream.ok) {
          const headers = new Headers(upstream.headers);
          headers.set("Content-Type", "text/plain; charset=utf-8");
          headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
          headers.set("X-Content-Type-Options", "nosniff");
          headers.set("Referrer-Policy", "no-referrer");
          return new Response(request.method === "HEAD" ? null : upstream.body, {
            status: upstream.status,
            headers
          });
        }
      } catch (error) {
        // If the upstream feed is unavailable, serve the bundled fallback below.
      }
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  }
};
