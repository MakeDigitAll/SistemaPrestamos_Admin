import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import Login from './Login/login.tsx';

const container = document.getElementById("root");
const root = createRoot(container);


function App() {
  return (
    <NextUIProvider>
        <Login />
    </NextUIProvider>

  );
}

export default App;

