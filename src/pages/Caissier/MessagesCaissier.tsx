import React, { useEffect, useState } from "react";
import { getPaymentRequests, createPayment, createInvoice, removePaymentRequest, deferPaymentRequest } from "../../api/finance";

const MessagesCaissier: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("cash");
  const [reference, setReference] = useState("");

  const load = () => setRequests(getPaymentRequests());
  useEffect(()=>{ load(); }, []);

  const pick = (r:any) => { setSelected(r); setAmount(r.amount); setReference(''); setMethod('cash'); };

  const doPayment = () => {
    if(!selected) return;
    const pay = createPayment({ requestId: selected.id, patientId: selected.patientId, patientName: selected.patientName, amount, method: method as any, reference, cashier: 'Caissière' });
    createInvoice({ requestId: selected.id, patientId: selected.patientId, patientName: selected.patientName, amount, paymentId: pay.id });
    removePaymentRequest(selected.id);
    setSelected(null);
    load();
  };

  const doDefer = () => {
    if(!selected) return;
    deferPaymentRequest(selected.id);
    setSelected(null);
    load();
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="col-span-1 lg:col-span-1 bg-white rounded shadow p-2">
        <h2 className="font-medium mb-2">Demandes</h2>
        <div className="space-y-2">
          {requests.map(r=> (
            <button key={r.id} onClick={()=>pick(r)} className={`w-full text-left p-2 rounded border ${r.priority==='urgent'? 'bg-red-50':''}`}>
              <div className="font-medium">{r.patientName}</div>
              <div className="text-xs text-gray-500">{r.act} • {r.service}</div>
              <div className="text-sm">{r.amount} • <span className="text-xs">{new Date(r.createdAt).toLocaleTimeString()}</span></div>
            </button>
          ))}
          {requests.length===0 && <div className="text-sm text-gray-600">Aucune demande</div>}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 bg-white rounded shadow p-4">
        <h2 className="font-medium mb-2">Détail demande</h2>
        {selected ? (
          <div>
            <div className="mb-2"><strong>Patient:</strong> {selected.patientName} <span className="text-sm text-gray-500">{selected.dossierNumber||''}</span></div>
            <div className="mb-2"><strong>Service:</strong> {selected.service}</div>
            <div className="mb-2"><strong>Acte:</strong> {selected.act}</div>
            <div className="mb-2 text-sm text-gray-600">Demande créée: {new Date(selected.createdAt).toLocaleString()}</div>
            <div className="mt-4">
              <label className="block text-sm">Montant</label>
              <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="mt-1 px-2 py-1 border rounded w-48" />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Mode paiement</label>
              <select value={method} onChange={(e)=>setMethod(e.target.value)} className="mt-1 px-2 py-1 border rounded w-48">
                <option value="cash">Cash</option>
                <option value="airtel">Airtel Money</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm">Référence (si applicable)</label>
              <input value={reference} onChange={(e)=>setReference(e.target.value)} className="mt-1 px-2 py-1 border rounded w-72" />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={doPayment} className="px-3 py-1 bg-slate-900 text-white rounded">Effectuer le paiement</button>
              <button onClick={doDefer} className="px-3 py-1 border rounded">Reporter</button>
              <button onClick={()=>{ setSelected(null); }} className="px-3 py-1 border rounded">Fermer</button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Sélectionnez une demande pour voir les détails.</div>
        )}
      </div>

      <div className="col-span-1 lg:col-span-1 bg-white rounded shadow p-2">
        <h2 className="font-medium mb-2">Raccourcis</h2>
        <div className="text-sm text-gray-600">Actions rapides pour la caissière.</div>
      </div>
    </div>
  );
};

export default MessagesCaissier;
