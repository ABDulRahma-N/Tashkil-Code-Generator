import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { CodeGeneratorPage } from "./Pages/CodeGeneratorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/CodeGenerator" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/CodeGenerator" element={<CodeGeneratorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
