import React, { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "../types/employee";

export default function DataTable() {
    const [data, setData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/shares")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("There was a problem loading the data.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Employees List
            </h2>

            {loading && (
                <p className="text-gray-600 text-center">
                    Loading...
                </p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-5 text-left border border-gray-300">
                                    Employee Id
                                </th>
                                <th className="py-3 px-5 text-left border border-gray-300">
                                    Employee Name
                                </th>
                                <th className="py-3 px-5 text-left border border-gray-300">
                                    Granted Shares
                                </th>
                                <th className="py-3 px-5 text-left border border-gray-300">
                                    Vested Shares
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0
                                ? (
                                    data.map((employee, index) => (
                                        <tr
                                            key={employee.employeeId}
                                            className={`border border-gray-300 text-gray-800 ${
                                                index % 2 === 0
                                                    ? "bg-gray-100"
                                                    : "bg-white"
                                            } hover:bg-gray-200 transition-all`}
                                        >
                                            <td className="py-3 px-5">
                                                {employee.employeeId}
                                            </td>
                                            <td className="py-3 px-5">
                                                {employee.employeeName}
                                            </td>
                                            <td className="py-3 px-5 text-green-600 font-semibold">
                                                {employee.grantedShares
                                                    .toLocaleString()} $
                                            </td>
                                            <td className="py-3 px-5 text-blue-500 font-semibold">
                                                {employee.vestedShares
                                                    .toLocaleString()} $
                                            </td>
                                        </tr>
                                    ))
                                )
                                : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-4 text-gray-500"
                                        >
                                            There is no Data
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
