import { shareProcessor } from "../utils/shareProcessor.ts";
import { assertEquals } from "jsr:@std/assert";

const shareGrants = [
  {
    employeeId: 1,
    employeeName: "Anna",
    grantedShares: 800,
    vestedShares: 500,
  },
  {
    employeeId: 2,
    employeeName: "Jon",
    grantedShares: 500,
    vestedShares: 500,
  },
  {
    employeeId: 1,
    employeeName: "Anna",
    grantedShares: 500,
    vestedShares: 250,
  },
  {
    employeeId: 3,
    employeeName: "Charlie",
    grantedShares: 600,
    vestedShares: 500,
  },
  {
    employeeId: 2,
    employeeName: "Jon",
    grantedShares: 1000,
    vestedShares: 500,
  },
  {
    employeeId: 2,
    employeeName: "Jon",
    grantedShares: 1500,
    vestedShares: 500,
  },
  {
    employeeId: 4,
    employeeName: "Sarah",
    grantedShares: 500,
    vestedShares: 250,
  },
  {
    employeeId: 4,
    employeeName: "Sarah",
    grantedShares: 1000,
    vestedShares: 500,
  },
];

const updatedShareGrants = [
  {
    employeeId: 1,
    employeeName: "Anna",
    grantedShares: 1300,
    vestedShares: 750,
  },
  {
    employeeId: 2,
    employeeName: "Jon",
    grantedShares: 3000,
    vestedShares: 1500,
  },
  {
    employeeId: 3,
    employeeName: "Charlie",
    grantedShares: 600,
    vestedShares: 500,
  },
  {
    employeeId: 4,
    employeeName: "Sarah",
    grantedShares: 1500,
    vestedShares: 750,
  },
];

Deno.test("test processShareData", () => {
  const res = shareProcessor(shareGrants);
  assertEquals(res, updatedShareGrants);
});
