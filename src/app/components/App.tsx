import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as styles from "./App.scss";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "/"
    : "/mini-react-app";

console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
console.log(`ROUTER_BASENAME=${ROUTER_BASENAME}`);

export const App = () => {
  return (
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Routes>
        <Route
          key="0"
          path="/"
          element={<h1 className={styles.title}>Hello React</h1>}
        />
        <Route key="1" path="/*" element={<Navigate to="/404"></Navigate>} />
        <Route
          key="404"
          path="/404"
          element={<h1 className={styles.e}>404 Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};
