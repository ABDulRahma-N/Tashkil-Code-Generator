import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
