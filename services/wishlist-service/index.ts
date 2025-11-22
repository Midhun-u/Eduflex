import { app, port } from "./src/server";

console.log(`Server running on ${port}`);

Bun.serve({
  fetch: app.fetch,
  port: port,
});
