import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import BabyCareTips from "./pages/BabyCareTips";
import AdminLogin from "./pages/AdminLogin";

// Component to protect admin routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/baby-care-tips" element={<BabyCareTips />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>

    </BrowserRouter>
  );
}

export default App;