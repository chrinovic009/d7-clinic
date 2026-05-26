import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import Blank from "./pages/Blank";
import DossierMedical from "./pages/Patient/DossierMedical";
import Hospitalisation from "./pages/Hospitalisation";
import SuiviQuotidien from "./pages/Patient/SuiviQuotidien";
import Messages from "./pages/Patient/Messages";
import MesTraitements from "./pages/Patient/MesTraitements";
import HistoriqueMedical from "./pages/Patient/HistoriqueMedical";
import ReceptionDashboard from "./pages/Reception/Dashboard";
import ReceptionPatients from "./pages/Reception/Patients";
import ReceptionAdmission from "./pages/Reception/Admission";
import ReceptionProfile from "./pages/Reception/ProfileReception";
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
import DashboardCaissier from "./pages/Caissier/DashboardCaissier";
import MessagesCaissier from "./pages/Caissier/MessagesCaissier";
import FacturationCaissier from "./pages/Caissier/FacturationCaissier";
import HistoriqueCaissier from "./pages/Caissier/HistoriqueCaissier";
import ProfileCaissier from "./pages/Caissier/ProfileCaissier";
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

            {/* Page d'erreur */}
            <Route path="/blank" element={<Blank />} /> 

            {/* Page Patient */}
            <Route index path="/" element={<HomeRedirect />} />
            <Route path="/profile" element={<RoleGuard allowedRoles={["PATIENT"]}><UserProfiles /></RoleGuard>} />
            <Route path="/dossier-medical" element={<RoleGuard allowedRoles={["PATIENT"]}><DossierMedical /></RoleGuard>} />
            <Route path="/traitements" element={<RoleGuard allowedRoles={["PATIENT"]}><MesTraitements /></RoleGuard>} />
            <Route path="/rendez-vous" element={<RoleGuard allowedRoles={["PATIENT"]}><Calendar /></RoleGuard>} />
            <Route path="/examens-resultats" element={<RoleGuard allowedRoles={["PATIENT"]}><BasicTables /></RoleGuard>} />
            <Route path="/hospitalisation" element={<RoleGuard allowedRoles={["PATIENT"]}><Hospitalisation /></RoleGuard>} />
            <Route path="/suivi-quotidien" element={<RoleGuard allowedRoles={["PATIENT"]}><SuiviQuotidien /></RoleGuard>} />
            <Route path="/messages" element={<RoleGuard allowedRoles={["PATIENT"]}><Messages /></RoleGuard>} />
            <Route path="/historique-medical" element={<RoleGuard allowedRoles={["PATIENT"]}><HistoriqueMedical /></RoleGuard>} />
            <Route path="/profil-securite" element={<RoleGuard allowedRoles={["PATIENT"]}><UserProfiles /></RoleGuard>} />
            
            {/* Page Receptioniste */}
            <Route path="/reception" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionDashboard /></RoleGuard>} />
            <Route path="/reception/patients" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionPatients /></RoleGuard>} />
            <Route path="/reception/admission" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionAdmission /></RoleGuard>} />
            <Route path="/reception/rendez-vous" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><RendezVousRecpetion /></RoleGuard>} />
            <Route path="/reception/hospitalisations" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><HospitalisationReception /></RoleGuard>} />
            <Route path="/reception/messages" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionMessages /></RoleGuard>} />
            <Route path="/reception/historique" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><HistoriqueReception /></RoleGuard>} />
            <Route path="/reception/profile" element={<RoleGuard allowedRoles={["RECEPTIONIST"]}><ReceptionProfile /></RoleGuard>} />

            {/* Page Infirmier */}
            <Route path="/nurse" element={<RoleGuard allowedRoles={["NURSE"]}><DashboardInfirmier /></RoleGuard>} />
            <Route path="/nurse/patients" element={<RoleGuard allowedRoles={["NURSE"]}><PatientAssignes /></RoleGuard>} />
            <Route path="/nurse/rounds" element={<RoleGuard allowedRoles={["NURSE"]}><RoundsInfirmier /></RoleGuard>} />
            <Route path="/nurse/hospitalized" element={<RoleGuard allowedRoles={["NURSE"]}><HospitalisationInfirmier /></RoleGuard>} />
            <Route path="/nurse/messages" element={<RoleGuard allowedRoles={["NURSE"]}><MessagesInfirmier /></RoleGuard>} />
            <Route path="/nurse/profile" element={<RoleGuard allowedRoles={["NURSE"]}><ProfileInfirmier /></RoleGuard>} />

            {/* Page Médecin */}
            <Route path="/doctor/" element={<RoleGuard allowedRoles={["PHYSICIAN"]}><DashboardMedecin /></RoleGuard>} />

            {/* Page Caissier */}
            <Route path="/caissier" element={<RoleGuard allowedRoles={["CASHIER"]}><DashboardCaissier /></RoleGuard>} />
            <Route path="/caissier/messages" element={<RoleGuard allowedRoles={["CASHIER"]}><MessagesCaissier /></RoleGuard>} />
            <Route path="/caissier/facturation" element={<RoleGuard allowedRoles={["CASHIER"]}><FacturationCaissier /></RoleGuard>} />
            <Route path="/caissier/historique" element={<RoleGuard allowedRoles={["CASHIER"]}><HistoriqueCaissier /></RoleGuard>} />
            <Route path="/caissier/profile" element={<RoleGuard allowedRoles={["CASHIER"]}><ProfileCaissier /></RoleGuard>} />

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
