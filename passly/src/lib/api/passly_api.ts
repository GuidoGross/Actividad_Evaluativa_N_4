import type { Event } from "#lib/data/events.ts";
import { auth } from "#lib/state/auth.svelte.ts";

const BASE = "/api";

export function map_backend_event(raw: any): Event {
  return {
    id: raw.id,
    name: raw.nombre ?? "",
    description: raw.descripcion ?? "",
    image: raw.imagen ?? "",
    category: raw.categoria ?? "",
    date: raw.fecha ?? "",
    time: raw.horario ?? "",
    site: raw.lugar ?? "",
    price: raw.precio_base ?? raw.precio ?? 0,
    tickets: raw.capacidad_maxima ?? raw.entradasdisponibles ?? 0,
    status: raw.estado ?? "Disponible",
    date_added: raw.fecha_creacion ?? "",
    visibility: raw.visibilidad ?? "Público",
    functions: raw.funciones ?? undefined,
    ticket_categories: raw.categorias_entradas ?? undefined,
    sale_configuration: raw.configuracion_venta ?? undefined,
  };
}

function auth_headers(): HeadersInit { return auth.auth_headers; }

function json_headers(): HeadersInit {
  return { "Content-Type": "application/json", ...auth.auth_headers };
}

export async function fetch_events(): Promise<Event[] | null> {
  try {
    const response = await fetch(`${BASE}/eventos/`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.map(map_backend_event);
  } catch { return null; }
}

export async function fetch_event(id: number): Promise<Event | null> {
  try {
    const response = await fetch(`${BASE}/eventos/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.error) return null;
    return map_backend_event(data);
  } catch { return null; }
}

export interface EventoCreatePayload {
  nombre: string;
  descripcion: string;
  capacidad_maxima: number;
  lugar: string;
  precio_base: number;
  moneda?: "ARS" | "USD" | "EUR";
  estado: string;
  imagen: string;
}

export async function create_event(payload: EventoCreatePayload): Promise<any | null> {
  try {
    const response = await fetch(`${BASE}/eventos/`, {
      method: "POST",
      headers: json_headers(),
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch { return null; }
}

export async function delete_event(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE}/eventos/${id}`, {
      method: "DELETE",
      headers: auth_headers(),
    });
    return response.ok;
  } catch { return false; }
}

export interface PurchasePayload {
  ticket_id: number;
  usuario_id: number;
  fecha: string;
  moneda?: "ARS" | "USD" | "EUR";
}

export interface PurchaseResult {
  id: number;
  fecha: string;
  monto: number;
  moneda: string;
  ticket_id: number;
  usuario_id: number;
}

/*
 * TODO (AE2): resolver el ticket real antes de crear la compra. El modal actualmente
 * deriva ticket_id desde el ID de categoría o evento; consultar GET /tickets/ y elegir
 * el registro que corresponda a la función y categoría antes de enviar un ID válido.
 */
export async function process_purchase(payload: PurchasePayload): Promise<PurchaseResult | string> {
  try {
    const response = await fetch(`${BASE}/compras/`, {
      method: "POST",
      headers: json_headers(),
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) return data.detail ?? data.error ?? "Error al procesar la compra.";
    return data as PurchaseResult;
  } catch { return "No se pudo conectar con el servidor. Intente nuevamente."; }
}

export async function cancel_purchase(compra_id: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE}/compras/${compra_id}/cancelar`, {
      method: "PUT",
      headers: auth_headers(),
    });
    return response.ok;
  } catch { return false; }
}

export async function fetch_purchase_history(usuario_id: number): Promise<PurchaseResult[] | null> {
  try {
    const response = await fetch(`${BASE}/compras/usuario/${usuario_id}`, {
      headers: auth_headers(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch { return null; }
}