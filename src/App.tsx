import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <main className="container">
      <Sidebar />
      <Outlet />
    </main>
  );
}

export default App;
