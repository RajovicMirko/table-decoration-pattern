import "./App.css";
import React, { lazy, Suspense } from "react";
import { data } from "./data";

const Fetcher = lazy(() => import("./components/Fetcher"));
const Table = lazy(() => import("./components/Table"));

const headers = {
  id: "Id",
  fullName: "Full name",
  email: "Email",
  phone: "Phone number",
};

const apiHeaders = {
  id: "Id",
  name: "Full name",
  email: "Email",
  address: "Address",
};

function App() {
  return (
    <div className="App" style={{ padding: "0.5rem 1rem" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Fetcher
          path="/users"
          render={(apiData) => {
            if (!apiData) return <div>Loading...</div>;

            const result = apiData.map((row) => ({
              id: row.id,
              name: row.name,
              email: row.email,
              address: `${row.address.street} ${row.address.suite}`,
            }));

            return (
              apiData &&
              apiData.length && (
                <Table
                  title="Api table data"
                  headers={apiHeaders}
                  data={result}
                />
              )
            );
          }}
        ></Fetcher>
        <Table {...{ title: "Fixed table data", headers, data }} />
      </Suspense>
    </div>
  );
}

export default App;
