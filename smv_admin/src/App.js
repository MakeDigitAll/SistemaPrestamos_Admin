import './App.css';
import { NextUIProvider } from '@nextui-org/react';

import Login from './Login/login.tsx';

function App() {
  return (
    <NextUIProvider>
      <Login/>
    </NextUIProvider>
  );
}

export default App;

