import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login/LoginForm.tsx";

function App() {
  return (
    <NextUIProvider>
      <Login />
    </NextUIProvider>
  );
}

export default App;
