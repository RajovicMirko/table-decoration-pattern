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
            if (!apiData.length) return <div>Loading...</div>;

            return (
              apiData &&
              apiData.length && (
                <Table
                  title="Api table data"
                  headers={apiHeaders}
                  data={apiData}
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
