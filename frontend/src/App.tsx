import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FarmerSignIn from "./pages/Farmer/Auth/SignIn";
import CompanySignIn from "./pages/Company/Auth/SignIn";
import FarmerRegister from "./pages/Farmer/Auth/Register";
import CompanyRegister from "./pages/Company/Auth/Register";
import NewCropDemand from "./pages/Company/CropDemand/NewCropDemand";
import FarmerLayout from "./layouts/FarmerLayout";
import CompanyLayout from "./layouts/CompanyLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/farmer/login"
          element={
            <FarmerLayout>
              <FarmerSignIn />
            </FarmerLayout>
          }
        />
        <Route
          path="/company/login"
          element={
            <CompanyLayout>
              <CompanySignIn />
            </CompanyLayout>
          }
        />
        <Route
          path="/company/register"
          element={
            <CompanyLayout>
              <CompanyRegister />
            </CompanyLayout>
          }
        />
        <Route
          path="/farmer/register"
          element={
            <FarmerLayout>
              <FarmerRegister />
            </FarmerLayout>
          }
        />
        <Route
          path="/crop-demands/new"
          element={
            <CompanyLayout>
              <NewCropDemand />
            </CompanyLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
