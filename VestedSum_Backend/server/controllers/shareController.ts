import { Context } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { shareProcessor } from "../utils/shareProcessor.ts";

//Sample Data
const shareGrants = [
  {
    employeeId: 1,
    employeeName: "Alice",
    grantedShares: 1000,
    vestedShares: 500,
  },
  {
    employeeId: 2,
    employeeName: "Bob",
    grantedShares: 500,
    vestedShares: 500,
  },
  {
    employeeId: 1,
    employeeName: "Alice",
    grantedShares: 500,
    vestedShares: 250,
  },
  {
    employeeId: 3,
    employeeName: "Charlie",
    grantedShares: 2000,
    vestedShares: 1000,
  },
];

// get all shares
export const getShares = (c: Context) => {
  return c.json(shareProcessor(shareGrants));
};

// add shares
export const processShares = async (ctx: Context) => {
  const body = await ctx.req.json();

  // Validate the request body
  if (
    !body.employeeId || !body.employeeName || !body.grantedShares ||
    !body.vestedShares
  ) {
    ctx.status(500);
    ctx.json({ error: "all fields are required" });
    return;
  }

  const newEmployee = {
    employeeId: body.employeeId,
    employeeName: body.employeeName,
    grantedShares: body.grantedShares,
    vestedShares: body.vestedShares,
  };
  shareGrants.push(newEmployee);
  console.log(shareGrants);

  return ctx.json({
    message: "Employee added successfully",
    share: shareGrants,
  });
};
