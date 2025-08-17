"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function Home() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(0.12);
  const [termMonths, setTermMonths] = useState(24);
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const token = "demo-token";

  async function calc() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ demo: true, principal, rate, term_months: termMonths }),
      });
      const data = await r.json();
      setResp(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{padding:24, fontFamily:"system-ui, Arial"}}>
      <h1>IPA Calculator</h1>
      <p style={{opacity:.7}}>API: {API}</p>
      <div style={{display:"grid", gap:12, maxWidth:480}}>
        <label>Principal <input type="number" value={principal} onChange={e=>setPrincipal(Number(e.target.value))}/></label>
        <label>Rate (decimal) <input type="number" step="0.0001" value={rate} onChange={e=>setRate(Number(e.target.value))}/></label>
        <label>Term (months) <input type="number" value={termMonths} onChange={e=>setTermMonths(Number(e.target.value))}/></label>
        <button onClick={calc} disabled={loading}>{loading? "Calculating..." : "Calculate"}</button>
      </div>
      {resp && (
        <pre style={{marginTop:16, background:"#f6f6f6", padding:12, borderRadius:8, overflow:"auto"}}>
{JSON.stringify(resp, null, 2)}
        </pre>
      )}
    </main>
  );
}
