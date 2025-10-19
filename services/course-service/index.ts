import {app, port} from "./src/server";

Bun.serve({
    fetch : app.fetch,
    port : port
})

console.log(`Server running on ${port} port`)