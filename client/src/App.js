import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Blog from "./Components/Blog";
import { ContextProvider } from "./Components/Context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
