
import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import EarthboundLanding from "./components/EarthboundLanding/EarthboundLanding";
import OurFields from "./components/OurFields/OurFields";
import VisitFarm from "./components/VisitFarm/VisitFarm";
import JoinCoop from "./components/JoinCoop/JoinCoop";
import Harvest from "./components/Harvest/Harvest";
import Practices from "./components/Practices/Practices";
import SignUp from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import UserDashboard from "./components/UserDashboard/Userdashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import NotFound from "./components/NotFound/NotFound";
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<EarthboundLanding />} />
          <Route path="/fields" element={<OurFields />} />
        <Route path="/harvest" element={<Harvest />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/visit" element={<VisitFarm />} />
        <Route path="/join" element={<JoinCoop />} />
          
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </HashRouter>
  );
}

export default App;