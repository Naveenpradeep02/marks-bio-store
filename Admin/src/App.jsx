import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import CustomerProfile from "./pages/CustomerProfile";
import ProductAnalytics from "./pages/ProductAnalytics";
import ProductAnalyticsDetail from "./pages/ProductAnalyticsDetail";
import MarketingAnalytics from "./pages/MarketingAnalytics";
import Offers from "./pages/Offers";
import OfferForm from "./pages/OfferForm";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analytics/products" element={<ProductAnalytics />} />
            <Route
              path="analytics/products/:id"
              element={<ProductAnalyticsDetail />}
            />
            <Route
              path="analytics/marketing"
              element={<MarketingAnalytics />}
            />
            <Route path="offers" element={<Offers />} />
            <Route path="offers/new" element={<OfferForm />} />
            <Route path="offers/:id/edit" element={<OfferForm />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="brands" element={<Brands />} />
            <Route path="categories" element={<Categories />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/:id" element={<CustomerProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
