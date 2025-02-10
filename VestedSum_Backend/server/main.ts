import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import route from "./routes/routes.ts";
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware/cors/index.ts";

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

app.use(
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.route("/", route);

Deno.serve(app.fetch);
