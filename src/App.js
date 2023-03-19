import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Signup/SignUp";
import useBearStore from "./state/state";

function App() {
  const isUserValid = useBearStore((state) => state.isUserValid);

  return <div>{isUserValid ? <Outlet /> : <Navigate to={"login"} />}</div>;
}

export default App;
