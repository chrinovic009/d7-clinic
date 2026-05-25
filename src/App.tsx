import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import DossierMedical from "./pages/Patient/DossierMedical";
import Guide from "./pages/Guide";
import Hospitalisation from "./pages/Hospitalisation";
import SuiviQuotidien from "./pages/Patient/SuiviQuotidien";
import Messages from "./pages/Patient/Messages";
import MesTraitements from "./pages/Patient/MesTraitements";
import HistoriqueMedical from "./pages/Patient/HistoriqueMedical";
import ReceptionDashboard from "./pages/Reception/Dashboard";
import ReceptionPatients from "./pages/Reception/Patients";
import ReceptionAdmission from "./pages/Reception/Admission";
import ReceptionProfile from "./pages/Reception/ProfileReception";
import ReceptionPage from "./pages/Reception/ReceptionPage";
import RendezVousRecpetion from "./pages/Reception/RendezVousRecpetion";
import ReceptionMessages from "./pages/Reception/MessagesReception";
import HospitalisationReception from "./pages/Reception/HospitalisationReception";
import HistoriqueReception from "./pages/Reception/HistoriqueReception";
import DashboardInfirmier from "./pages/Infirmier/DashboardInfirmier";
import PatientAssignes from "./pages/Infirmier/PatientAssignes";
import MessagesInfirmier from "./pages/Infirmier/MessagesInfirmier";
import ProfileInfirmier from "./pages/Infirmier/ProfileInfirmier";
import RoundsInfirmier from "./pages/Infirmier/Rounds";
import HospitalisationInfirmier from "./pages/Infirmier/HospitalisationsSuivi";
import DashboardMedecin from "./pages/Medecin/DashboardMedecin";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { RequireAuth, RoleGuard, HomeRedirect } from "./components/auth/RequireAuth";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
            <Route index path="/" element={<HomeRedirect />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/dossier-medical" element={<DossierMedical />} />
            <Route path="/traitements" element={<MesTraitements />} />
            <Route path="/rendez-vous" element={<Calendar />} />
            <Route path="/examens-resultats" element={<BasicTables />} />
            <Route path="/hospitalisation" element={<Hospitalisation />} />
            <Route path="/suivi-quotidien" element={<SuiviQuotidien />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/historique-medical" element={<HistoriqueMedical />} />
            <Route path="/reception" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionDashboard /></RoleGuard>} />
            <Route path="/reception/patients" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPatients /></RoleGuard>} />
            <Route path="/reception/admission" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionAdmission /></RoleGuard>} />
            <Route path="/reception/rendez-vous" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><RendezVousRecpetion /></RoleGuard>} />
            <Route path="/reception/file-attente" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPage /></RoleGuard>} />
            <Route path="/reception/hospitalisations" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><HospitalisationReception /></RoleGuard>} />
            <Route path="/reception/dossiers" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPage /></RoleGuard>} />
            <Route path="/reception/messages" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionMessages /></RoleGuard>} />
            <Route path="/reception/paiements" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPage /></RoleGuard>} />
            <Route path="/reception/urgences" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPage /></RoleGuard>} />
            <Route path="/reception/historique" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><HistoriqueReception /></RoleGuard>} />
            <Route path="/reception/profile" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionProfile /></RoleGuard>} />
            <Route path="/nurse" element={<RoleGuard allowedRoles={["NURSE"]}><DashboardInfirmier /></RoleGuard>} />
            <Route path="/nurse/patients" element={<RoleGuard allowedRoles={["NURSE"]}><PatientAssignes /></RoleGuard>} />
            <Route path="/nurse/rounds" element={<RoleGuard allowedRoles={["NURSE"]}><RoundsInfirmier /></RoleGuard>} />
            <Route path="/nurse/hospitalized" element={<RoleGuard allowedRoles={["NURSE"]}><HospitalisationInfirmier /></RoleGuard>} />
            <Route path="/nurse/messages" element={<RoleGuard allowedRoles={["NURSE"]}><MessagesInfirmier /></RoleGuard>} />
            <Route path="/nurse/profile" element={<RoleGuard allowedRoles={["NURSE"]}><ProfileInfirmier /></RoleGuard>} />
            <Route path="/doctor/" element={<RoleGuard allowedRoles={["PHYSICIAN"]}><DashboardMedecin /></RoleGuard>} />
            <Route path="/paiements" element={<FormElements />} />
            <Route path="/profil-securite" element={<UserProfiles />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/guide" element={<Guide />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
