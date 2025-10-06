export const API_BASE = "/api/v1";
export async function api<T>(p:string,i?:RequestInit){const r=await fetch(`${API_BASE}${p}`,{...i,headers:{"Content-Type":"application/json",...(i?.headers||{})}});if(!r.ok){const t=await r.text();let j;try{j=JSON.parse(t)}catch{};throw new Error(j?.error||j?.detail||t||"Request failed")}return r.json() as Promise<T>;}
