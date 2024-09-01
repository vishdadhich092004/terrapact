import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import FarmerSignIn from "./pages/Farmer/Auth/SignIn";
import CompanySignIn from "./pages/Company/Auth/SignIn";
import FarmerRegister from "./pages/Farmer/Auth/Register";
import CompanyRegister from "./pages/Company/Auth/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/farmer/login"
          element={
            <Layout>
              <FarmerSignIn />
            </Layout>
          }
        />
        <Route
          path="/company/login"
          element={
            <Layout>
              <CompanySignIn />
            </Layout>
          }
        />
        <Route
          path="/company/register"
          element={
            <Layout>
              <CompanyRegister />
            </Layout>
          }
        />
        <Route
          path="/farmer/register"
          element={
            <Layout>
              <FarmerRegister />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
