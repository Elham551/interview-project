import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { getShares } from "../controllers/shareController.ts";

const route = new Hono();

route.get("/api/shares", getShares);

export default route;
