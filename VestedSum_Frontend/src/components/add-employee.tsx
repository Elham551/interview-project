import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee(
    { onUserAdded }: { onUserAdded: () => void },
) {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        grantedShares: "",
        vestedShares: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:8000/api/shares", {
                employeeId: Number(formData.employeeId),
                employeeName: formData.employeeName,
                grantedShares: Number(formData.grantedShares),
                vestedShares: Number(formData.vestedShares),
            });

            setFormData({
                employeeId: "",
                employeeName: "",
                grantedShares: "",
                vestedShares: "",
            });
            onUserAdded(); // برای به‌روزرسانی لیست جدول
        } catch (error) {
            setError("Problem adding user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg max-w-4xl mx-auto">
            {error && <p className="text-red-500 text-center mb-2">{error}</p>}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-2"
            >
                <div className="grid grid-cols-4 gap-4 w-full">
                    <div className="flex flex-col">
                        <label className="text-gray-700">Employee Id:</label>
                        <input
                            type="number"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700">Employee Name:</label>
                        <input
                            type="text"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700">Granted Shares:</label>
                        <input
                            type="number"
                            name="grantedShares"
                            value={formData.grantedShares}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700">Vested Shares:</label>
                        <input
                            type="number"
                            name="vestedShares"
                            value={formData.vestedShares}
                            onChange={handleChange}
                            required
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white font-semibold py-2 rounded transition ${
                                loading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Add Employee"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
