import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";
import next from "next";

const port     = parseInt(process.env.PORT || "3000", 10);
const dev      = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app    = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const MIME = {
  ".webp": "image/webp",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".gif":  "image/gif",
};

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    // ── Serve uploaded media files ────────────────────────────
    if (req.url?.startsWith("/media/")) {
      const filename = req.url.slice(7).split("?")[0]; // strip query string
      const mediaDir = process.env.MEDIA_DIR ?? join(process.cwd(), "media");
      const filepath = join(mediaDir, filename);
      try {
        const data = await readFile(filepath);
        const ext  = extname(filename).toLowerCase();
        res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.end(data);
      } catch {
        res.statusCode = 404;
        res.end("Not found");
      }
      return;
    }

    handle(req, res).catch((err) => {
      console.error("Request handler error:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(
      `> Server ready at http://${hostname}:${port} [${dev ? "development" : "production"}]`
    );
  });
}).catch((err) => {
  console.error("Failed to prepare Next.js app:", err);
  process.exit(1);
});
