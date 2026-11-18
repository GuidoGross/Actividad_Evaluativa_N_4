export interface EventFunction {
  id: number;
  date: string;
  time: string;
  available_tickets: number;
  status: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  price: number;
  available_tickets: number;
  purchase_limit: number;
  description?: string;
  buyer_restrictions?: string;
}

export interface SaleConfiguration {
  sale_start_date: string;
  sale_end_date: string;
  purchase_limit: number;
  reservation_minutes: number;
  queue_enabled: boolean;
  queue_capacity: number;
  concurrent_requests: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  date: string;
  time: string;
  site: string;
  price: number;
  tickets: number;
  status: string;
  date_added: string;
  functions?: EventFunction[];
  ticket_categories?: TicketCategory[];
  sale_configuration?: SaleConfiguration;
  visibility?: "Público" | "Privado" | "Archivado";
}

export const featured_events: Event[] = [
  {
    id: 0,
    name: "Festival Lollapalooza 2.026",
    description: "El festival de música más grande vuelve con un line-up increíble durante tres días consecutivos.",
    image: "/events/lollapalooza.jpg",
    category: "Festivales",
    date: "15/03/2.026",
    time: "18:00 - 00:00",
    site: "Hipódromo de San Isidro",
    price: 120000,
    tickets: 2500,
    status: "Disponible",
    date_added: "2026-08-01T10:00:00Z",
    functions: [
      {
        id: 101,
        date: "15/03/2.026",
        time: "18:00 - 00:00",
        available_tickets: 2500,
        status: "Disponible"
      },
      {
        id: 102,
        date: "16/03/2.026",
        time: "18:00 - 00:00",
        available_tickets: 1800,
        status: "Disponible"
      },
      {
        id: 103,
        date: "17/03/2.026",
        time: "18:00 - 00:00",
        available_tickets: 1260,
        status: "Disponible"
      }
    ],
    ticket_categories: [
      {
        id: "general",
        name: "General",
        price: 120000,
        available_tickets: 2100,
        purchase_limit: 5,
        description: "Acceso al predio y escenarios generales"
      },
      {
        id: "vip",
        name: "VIP",
        price: 210000,
        available_tickets: 400,
        purchase_limit: 4,
        description: "Acceso preferencial y sectores exclusivos"
      }
    ],
    sale_configuration: {
      sale_start_date: "01/09/2.026 10:00",
      sale_end_date: "17/03/2.026 16:00",
      purchase_limit: 5,
      reservation_minutes: 10,
      queue_enabled: true,
      queue_capacity: 3500,
      concurrent_requests: 75
    },
    visibility: "Público"
  },
  {
    id: 1,
    name: "Coldplay - Music of the Spheres",
    description: "La banda británica regresa con su gira mundial llena de luces, colores y sus grandes éxitos.",
    image: "/events/coldplay.jpg",
    category: "Conciertos",
    date: "12/04/2.026",
    time: "21:00 - 23:30",
    site: "Estadio River Plate",
    price: 85000,
    tickets: 0,
    status: "Agotado",
    date_added: "2026-07-15T14:30:00Z",
    ticket_categories: [
      {
        id: "platea",
        name: "Platea",
        price: 85000,
        available_tickets: 0,
        purchase_limit: 4,
        description: "Ubicación numerada"
      }
    ],
    visibility: "Público"
  },
  {
    id: 2,
    name: "El Fantasma de la Ópera",
    description: "El clásico musical llega al Teatro Colón con una puesta en escena nunca antes vista.",
    image: "/events/phantom.jpg",
    category: "Teatro",
    date: "20/05/2.026",
    time: "20:30 - 23:00",
    site: "Teatro Colón",
    price: 45000,
    tickets: 3000,
    status: "Postergado",
    date_added: "2026-06-20T09:15:00Z",
    functions: [
      {
        id: 201,
        date: "20/05/2.026",
        time: "20:30 - 23:00",
        available_tickets: 3000,
        status: "Postergado"
      },
      {
        id: 202,
        date: "21/05/2.026",
        time: "20:30 - 23:00",
        available_tickets: 3000,
        status: "Postergado"
      }
    ],
    ticket_categories: [
      {
        id: "platea",
        name: "Platea",
        price: 45000,
        available_tickets: 2400,
        purchase_limit: 4,
        description: "Butacas numeradas de platea"
      },
      {
        id: "palco",
        name: "Palco",
        price: 68000,
        available_tickets: 600,
        purchase_limit: 4,
        description: "Ubicación preferencial"
      }
    ],
    visibility: "Público"
  },
  {
    id: 3,
    name: "Final de la Copa Libertadores",
    description: "El partido más esperado del año. Viva la pasión del fútbol en su máxima expresión.",
    image: "/events/libertadores.jpg",
    category: "Deportes",
    date: "30/11/2.026",
    time: "17:00 - 19:00",
    site: "Estadio Monumental",
    price: 200000,
    tickets: 2000,
    status: "Cancelado",
    date_added: "2026-08-10T16:45:00Z",
    ticket_categories: [
      {
        id: "popular",
        name: "Popular",
        price: 200000,
        available_tickets: 1500,
        purchase_limit: 4,
        description: "Acceso a tribuna popular"
      },
      {
        id: "platea",
        name: "Platea",
        price: 340000,
        available_tickets: 500,
        purchase_limit: 4,
        description: "Butaca numerada"
      }
    ],
    visibility: "Archivado"
  }
];

export const recent_events: Event[] = [
  {
    id: 4,
    name: "Stand Up: Risas sin filtro",
    description: "Una noche a pura carcajada con los mejores comediantes del país.",
    image: "/events/standup.jpg",
    category: "Teatro",
    date: "05/05/2.026",
    time: "22:00 - 00:30",
    site: "Paseo La Plaza",
    price: 15000,
    tickets: 1000,
    status: "Disponible",
    date_added: "2026-09-01T11:00:00Z",
    functions: [
      {
        id: 301,
        date: "05/05/2.026",
        time: "20:00 - 21:30",
        available_tickets: 430,
        status: "Disponible"
      },
      {
        id: 302,
        date: "05/05/2.026",
        time: "22:00 - 00:30",
        available_tickets: 570,
        status: "Disponible"
      }
    ],
    ticket_categories: [
      {
        id: "general",
        name: "General",
        price: 15000,
        available_tickets: 1000,
        purchase_limit: 6,
        description: "Acceso general sin numeración"
      }
    ],
    sale_configuration: {
      sale_start_date: "01/04/2.026 10:00",
      sale_end_date: "05/05/2.026 18:00",
      purchase_limit: 6,
      reservation_minutes: 8,
      queue_enabled: false,
      queue_capacity: 0,
      concurrent_requests: 25
    },
    visibility: "Público"
  },
  {
    id: 5,
    name: "Exposición de Arte Inmersivo",
    description: "Adéntrese en las obras de Van Gogh como si estuviera dentro de ellas.",
    image: "/events/immersive_art.jpg",
    category: "Arte",
    date: "01/06/2.026",
    time: "10:00 - 20:00",
    site: "La Rural",
    price: 12000,
    tickets: 2000,
    status: "Agotado",
    date_added: "2026-09-02T08:30:00Z",
    ticket_categories: [
      {
        id: "general",
        name: "General",
        price: 12000,
        available_tickets: 0,
        purchase_limit: 6,
        description: "Acceso por franja horaria"
      }
    ],
    visibility: "Público"
  }
];

export const all_events: Event[] = [...featured_events, ...recent_events];