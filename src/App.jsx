import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/product/:id" element={<ProductDetail /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;