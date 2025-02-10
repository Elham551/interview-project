import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import route from "./routes/routes.ts";

const app = new Hono();

// Middleware to handle errors
app.use(async (c, next) => {
  try {
    await next();
  } catch (err) {
    c.status(500);
    c.json({ error: "Internal server error" });
  }
});

app.route("/", route);

Deno.serve(app.fetch);
