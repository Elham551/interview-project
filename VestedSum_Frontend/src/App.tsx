import React, { useState } from "react";
import "./App.css";
// import AddUserForm from "./components/add-user.tsx";
import DataTable from "./components/data-table.tsx";
export default function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl">
        <DataTable key={reload ? "reload1" : "reload2"} />
        <div className="mt-6">
          {/* <AddUserForm onUserAdded={() => setReload(!reload)} /> */}
        </div>
      </div>
    </div>
  );
}
