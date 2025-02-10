import { Employee } from "../types/employee.ts";

export function shareProcessor(employees: Employee[]) {
  return Object.values(
    employees.reduce((acc, grant) => {
      if (!acc[grant.employeeId]) {
        acc[grant.employeeId] = { ...grant };
      } else {
        acc[grant.employeeId].grantedShares += grant.grantedShares;
        acc[grant.employeeId].vestedShares += grant.vestedShares;
      }
      return acc;
    }, {} as Record<string, Employee>),
  );
}
