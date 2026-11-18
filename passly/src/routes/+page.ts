import { featured_events, recent_events } from "#lib/data/events.ts";
import type { Event as PasslyEvent } from "#lib/data/events.ts";

export async function load({ fetch }) {
  try {
    const response = await fetch("/api/eventos/");
    if (response.ok) {
      const backend_data = await response.json();
      const mapped_events: PasslyEvent[] = backend_data.map((evento: any) => ({
        id: evento.id,
        name: evento.nombre,
        description: evento.descripcion,
        image: evento.imagen,
        date: evento.fecha,
        time: evento.horario,
        site: evento.lugar,
        category: evento.categoria,
        price: evento.precio_base,
        tickets: evento.entradasdisponibles,
        status: evento.estado === "Activo" ? "Disponible" : evento.estado,
        date_added: evento.fecha
      }));
      return {
        featured_events: mapped_events.slice(0, 4),
        recent_events: mapped_events.slice(-4)
      };
    } else {
      console.warn(`Error del servidor: ${response.status}. Usando datos de prueba.`);
      throw new Error("Backend devolvió error");
    }
  } catch (error) {
    console.log("No se pudo conectar al backend, usando eventos de prueba.");
    return {
      featured_events,
      recent_events
    };
  }
}