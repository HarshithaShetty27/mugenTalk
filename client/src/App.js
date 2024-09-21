import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';    //Importing 'Outlet' for nested routing
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster/>      {/* Toaster component to display toast notifications globally */}
      <main>
        <Outlet />    {/* Placeholder for rendering child components based on the current route */}
      </main>
    </>
  );
}

export default App;
