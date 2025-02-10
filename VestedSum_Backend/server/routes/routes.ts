import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { getShares, processShares } from "../controllers/shareController.ts";

const route = new Hono();

route.get("/api/shares", getShares);
route.post("/api/shares", processShares);

export default route;
