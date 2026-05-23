import React, { useEffect, useMemo, useState } from "react";
import { findPatientByPhone, saveAdmission } from "../../api/reception";

const services = [
  "Médecine générale",
  "Cardiologie",
  "Pédiatrie",
  "Radiologie",
  "Laboratoire",
  "Urgences",
  "Chirurgie",
  "Neurologie"
];

const doctorsByService: Record<string, string[]> = {
  "Médecine générale": ["Dr Amani", "Dr Kalombo"],
  Cardiologie: ["Dr Mukendi", "Dr Mupenda"],
  Pédiatrie: ["Dr Okapi"],
  Radiologie: ["Dr Lens"],
  Laboratoire: ["Dr Lab"],
  Urgences: ["Dr Rapid"],
  Chirurgie: ["Dr Scalpel"],
  Neurologie: ["Dr Aubin"],
};

const knownPatients = [
  {
    name: "Elsa Nyembo",
    category: "S",
    company: "Kamoa",
    phone: "0812345678",
    email: "elsa@kamoa.com",
    address: "Boulevard Kamoa, Kinshasa",
    profession: "Directrice",
    nationality: "RD Congo",
    gender: "F",
    dob: "1985-08-12",
    dossierNumber: "D-000001",
    admissionType: "Consultation",
    arrival: new Date().toISOString().slice(0, 16),
    service: "Cardiologie",
    doctor: "Dr Mukendi",
    priority: "Normal",
    insurance: { company: "Kamoa", policy: "KM-3344", coverageType: "Entreprise", coveragePct: 80, photo: null, pdf: null },
    contacts: [{ name: "Jean Nyembo", relation: "Conjoint", phone: "0811111111", address: "Quartier Kamoa" }],
    allergies: ["Hypertension"],
  },
  {
    name: "Chrinovic Nyembo",
    category: "P",
    phone: "0818765432",
    email: "chrinovic@example.com",
    address: "Quartier Lakua, Kinshasa",
    profession: "Étudiant",
    nationality: "RD Congo",
    gender: "M",
    dob: "2000-05-20",
    dossierNumber: "D-000002",
    admissionType: "Urgence",
    arrival: new Date().toISOString().slice(0, 16),
    service: "Urgences",
    doctor: "Dr Rapid",
    priority: "Urgence",
    insurance: { company: "", policy: "", coverageType: "", coveragePct: 0, photo: null, pdf: null },
    contacts: [{ name: "Claire Nyembo", relation: "Mère", phone: "0812223333", address: "Quartier Lakua" }],
    allergies: ["Asthme"],
  },
];

type ModalStep =
  | null
  | "payment-question"
  | "payment-details"
  | "awaiting-payment"
  | "send-confirmation"
  | "waiting-list"
  | "success";

const Admission: React.FC = () => {
  const [form, setForm] = useState<any>({
    category: "P",
    name: "",
    gender: "F",
    dob: "",
    phone: "",
    email: "",
    address: "",
    profession: "",
    nationality: "",
    dossierNumber: `D-${Date.now().toString().slice(-6)}`,
    admissionType: "Consultation",
    arrival: new Date().toISOString().slice(0, 16),
    receptionist: "Recep. Deborah Tel",
    service: services[0],
    doctor: "",
    priority: "Normal",
    insurance: { company: "", policy: "", coverageType: "", coveragePct: 0, photo: null, pdf: null },
    contacts: [] as any[],
    allergies: [] as string[],
    documents: [] as any[],
  });
  const [existingPatient, setExistingPatient] = useState<any>(null);
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const age = useMemo(() => {
    if (!form.dob) return "";
    const diff = Date.now() - new Date(form.dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }, [form.dob]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const normalizedName = form.name.trim().toLowerCase();
      if (normalizedName.length >= 4) {
        const foundByName = knownPatients.find((patient) => patient.name.toLowerCase() === normalizedName);
        if (foundByName) {
          setExistingPatient(foundByName);
          return;
        }
      }

      if (form.phone && form.phone.length >= 6) {
        const found = await findPatientByPhone(form.phone);
        setExistingPatient(found || null);
      } else {
        setExistingPatient(null);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [form.name, form.phone]);

  useEffect(() => {
    if (!form.doctor) {
      setForm((f: any) => ({ ...f, doctor: doctorsByService[f.service]?.[0] || "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.service]);

  const toggleAllergy = (a: string) => {
    setForm((f: any) => ({ ...f, allergies: f.allergies.includes(a) ? f.allergies.filter((x: string) => x !== a) : [...f.allergies, a] }));
  };

  const addContact = () => {
    setForm((f: any) => ({ ...f, contacts: [...f.contacts, { name: "", relation: "", phone: "", address: "" }] }));
  };

  const updateContact = (i: number, key: string, value: any) => {
    setForm((f: any) => ({ ...f, contacts: f.contacts.map((c: any, idx: number) => (idx === i ? { ...c, [key]: value } : c)) }));
  };

  const resetForm = () => {
    setExistingPatient(null);
    setModalStep(null);
    setPaymentAmount("");
    setPaymentMethod("");
    setForm({
      category: "P",
      name: "",
      gender: "F",
      dob: "",
      phone: "",
      email: "",
      address: "",
      profession: "",
      nationality: "",
      dossierNumber: `D-${Date.now().toString().slice(-6)}`,
      admissionType: "Consultation",
      arrival: new Date().toISOString().slice(0, 16),
      receptionist: "Recep. Deborah Tel",
      service: services[0],
      doctor: doctorsByService[services[0]][0],
      priority: "Normal",
      insurance: { company: "", policy: "", coverageType: "", coveragePct: 0, photo: null, pdf: null },
      contacts: [],
      allergies: [],
      documents: [],
    });
  };

  const handleSaveClick = () => {
    if (existingPatient) {
      setModalStep("success");
      return;
    }

    if (form.category === "P") {
      setModalStep("payment-question");
    } else {
      setModalStep("success");
    }
  };

  const handlePaymentChoice = (paid: boolean) => {
    setModalStep(paid ? "payment-details" : "awaiting-payment");
  };

  const handleAwaitingDecision = (sendToInfirmier: boolean) => {
    setModalStep(sendToInfirmier ? "send-confirmation" : "waiting-list");
  };

  const handleConfirmPayment = async () => {
    await saveAdmission(form);
    setModalStep("success");
  };

  const renderPatientDetails = () => (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Patient déjà enregistré</h3>
      <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 dark:text-gray-300">
        <div><span className="font-medium">Nom:</span> {existingPatient.name}</div>
        <div><span className="font-medium">Catégorie:</span> {existingPatient.category === "S" ? "Abonné" : "Particulier"}</div>
        <div><span className="font-medium">Entreprise:</span> {existingPatient.company || "—"}</div>
        <div><span className="font-medium">Téléphone:</span> {existingPatient.phone}</div>
        <div><span className="font-medium">Email:</span> {existingPatient.email}</div>
        <div><span className="font-medium">Adresse:</span> {existingPatient.address}</div>
        <div><span className="font-medium">Service:</span> {existingPatient.service}</div>
        <div><span className="font-medium">Médecin:</span> {existingPatient.doctor}</div>
        <div><span className="font-medium">Priorité:</span> {existingPatient.priority}</div>
        <div><span className="font-medium">Allergies:</span> {existingPatient.allergies.join(", ") || "Aucune"}</div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button onClick={resetForm} className="w-full sm:w-auto rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 text-sm font-medium">Nouvelle admission</button>
        <button onClick={() => alert("Ouvrir dossier (simulation)")} className="w-full sm:w-auto rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium">Ouvrir dossier</button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-slate-950 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Nouvelle admission</h2>
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        <div className="col-span-12 lg:col-span-8">
          {existingPatient ? (
            renderPatientDetails()
          ) : (
            <>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">1. Informations personnelles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="S">Abonné</option>
                    <option value="P">Particulier</option>
                  </select>
                  <input placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="sm:col-span-2 lg:col-span-2 rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="F">Femme</option>
                    <option value="M">Homme</option>
                    <option value="O">Autre</option>
                  </select>
                  <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <div className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm">Âge: {age}</div>
                  <input placeholder="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Adresse" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="col-span-1 sm:col-span-2 lg:col-span-2 rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Profession" value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Nationalité" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {form.category === "S" ? (
                    <>
                      <input placeholder="Entreprise / Société" value={form.insurance.company} onChange={(e) => setForm({ ...form, insurance: { ...form.insurance, company: e.target.value } })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input placeholder="N° police" value={form.insurance.policy} onChange={(e) => setForm({ ...form, insurance: { ...form.insurance, policy: e.target.value } })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </>
                  ) : (
                    <div className="sm:col-span-2 lg:col-span-2 rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm">Particulier : aucune entreprise exigée.</div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">2. Informations administratives</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm">N° dossier: {form.dossierNumber}</div>
                  <select value={form.admissionType} onChange={(e) => setForm({ ...form, admissionType: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Consultation</option>
                    <option>Urgence</option>
                    <option>Hospitalisation</option>
                    <option>Contrôle</option>
                  </select>
                  <input type="datetime-local" value={form.arrival} onChange={(e) => setForm({ ...form, arrival: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Réceptionniste" value={form.receptionist} onChange={(e) => setForm({ ...form, receptionist: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">4. Orientation médicale</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="sm:col-span-2 lg:col-span-2 rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {services.map((s) => (<option key={s}>{s}</option>))}
                  </select>
                  <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {(doctorsByService as any)[form.service]?.map((d: string) => (<option key={d}>{d}</option>))}
                  </select>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">5. Niveau priorité</h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button onClick={() => setForm({ ...form, priority: "Normal" })} className={`px-3 py-1 rounded-full text-sm font-medium transition ${form.priority === "Normal" ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100" : "border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"}`}>🟢 Normal</button>
                  <button onClick={() => setForm({ ...form, priority: "Prioritaire" })} className={`px-3 py-1 rounded-full text-sm font-medium transition ${form.priority === "Prioritaire" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100" : "border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"}`}>🟡 Prioritaire</button>
                  <button onClick={() => setForm({ ...form, priority: "Urgence" })} className={`px-3 py-1 rounded-full text-sm font-medium transition ${form.priority === "Urgence" ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100" : "border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"}`}>🔴 Urgence critique</button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">7. Contacts famille / urgence</h3>
                {form.contacts.map((c: any, i: number) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                    <input placeholder="Nom" value={c.name} onChange={(e) => updateContact(i, "name", e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input placeholder="Relation" value={c.relation} onChange={(e) => updateContact(i, "relation", e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input placeholder="Téléphone" value={c.phone} onChange={(e) => updateContact(i, "phone", e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input placeholder="Adresse" value={c.address} onChange={(e) => updateContact(i, "address", e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
                <button onClick={addContact} className="px-3 py-1 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-700 text-sm font-medium">+ Ajouter contact</button>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">8. Allergies & alertes médicales</h3>
                <div className="flex gap-2 flex-wrap">
                  {['Allergies', 'Diabète', 'Hypertension', 'Asthme', 'Épilepsie'].map((a) => (
                    <button key={a} onClick={() => toggleAllergy(a)} className={`px-3 py-1 rounded text-sm font-medium transition ${form.allergies.includes(a) ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 border border-red-300 dark:border-red-700' : 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700">
            <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">Résumé admission</h3>
            <div className="mt-3 text-sm space-y-2">
              <div className="text-gray-700 dark:text-gray-300"><span className="font-medium">Patient:</span> {form.name || (existingPatient ? existingPatient.name : '—')}</div>
              <div className="text-gray-700 dark:text-gray-300"><span className="font-medium">Service:</span> {existingPatient ? existingPatient.service : form.service}</div>
              <div className="text-gray-700 dark:text-gray-300"><span className="font-medium">Médecin:</span> {existingPatient ? existingPatient.doctor : form.doctor}</div>
              <div className="text-gray-700 dark:text-gray-300"><span className="font-medium">Priorité:</span> {existingPatient ? existingPatient.priority : form.priority}</div>
              <div className="text-gray-700 dark:text-gray-300"><span className="font-medium">Assurance:</span> {existingPatient ? (existingPatient.insurance?.company ? '✅ Validée' : '—') : (form.insurance.company ? '✅ Validée' : '—')}</div>
            </div>

            <div className="mt-4 space-y-2">
              <button onClick={handleSaveClick} className="w-full rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition text-sm">Enregistrer & Envoyez</button>
              <button onClick={() => window.print()} className="w-full rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-3 py-2 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition text-sm">Imprimer fiche</button>
              <button onClick={resetForm} className="w-full rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-3 py-2 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition text-sm">Annuler</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-lg border border-gray-200 dark:border-slate-700 mt-4">
            <h3 className="font-medium mb-3 text-gray-900 dark:text-white text-sm sm:text-base">Détection auto</h3>
            {existingPatient ? (
              <div className="p-3 border border-gray-300 dark:border-slate-600 rounded bg-blue-50 dark:bg-slate-800">
                <div className="font-medium text-gray-900 dark:text-white">{existingPatient.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{existingPatient.phone}</div>
                <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">Patient trouvé. Tous les champs sont remplacés par ses détails.</div>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <button onClick={resetForm} className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-medium">Nouvelle admission</button>
                  <button onClick={() => alert("Nouvelle visite (simulation)")} className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-medium">Nouvelle visite</button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">Tapez le nom complet (casse non sensible) ou le téléphone pour détecter un patient existant.</div>
            )}
          </div>
        </aside>
      </div>

      {modalStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl border border-gray-200 dark:border-slate-700">
            {modalStep === "payment-question" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Le patient a-t-il déjà payé ?</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Pour un particulier, confirmez si le paiement a déjà été réalisé.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handlePaymentChoice(true)} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm">Oui</button>
                  <button onClick={() => handlePaymentChoice(false)} className="rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm">Non</button>
                </div>
              </>
            )}

            {modalStep === "payment-details" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Paiement reçu</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Enregistrez le montant et le moyen de paiement.</p>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <input type="number" placeholder="Montant payé" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Moyen de paiement" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-4 flex gap-3">
                  <button disabled={!paymentAmount || !paymentMethod} onClick={handleConfirmPayment} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm disabled:opacity-50">Enregistrer le paiement</button>
                  <button onClick={() => setModalStep(null)} className="rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm">Annuler</button>
                </div>
              </>
            )}

            {modalStep === "awaiting-payment" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{form.name || "Le patient"} est en attente de paiement</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Envoyez quand même la fiche à l'infirmier ?</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleAwaitingDecision(true)} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm">Oui</button>
                  <button onClick={() => handleAwaitingDecision(false)} className="rounded border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm">Non</button>
                </div>
              </>
            )}

            {modalStep === "send-confirmation" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fiche envoyée à l'infirmier</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">La fiche de {form.name || 'ce patient'} a été envoyée en simulation.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => { setModalStep(null); resetForm(); }} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm">Fermer</button>
                </div>
              </>
            )}

            {modalStep === "waiting-list" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fiche en attente</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Retrouvez la fiche de {form.name || 'ce patient'} dans l'historique des fiches en attente.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => { setModalStep(null); resetForm(); }} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm">Fermer</button>
                </div>
              </>
            )}

            {modalStep === "success" && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sauvegarde simulée</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">La fiche a été enregistrée en simulation.</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => { setModalStep(null); resetForm(); }} className="rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 text-sm">Fermer</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admission;
