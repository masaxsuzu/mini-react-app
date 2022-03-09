import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";
import { createHashHistory, createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";

test("renders default page", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Hello React/i);
  expect(linkElement.innerHTML).toBe("Hello React");
});
