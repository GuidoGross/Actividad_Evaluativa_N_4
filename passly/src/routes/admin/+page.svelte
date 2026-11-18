<svelte:head>
  <title>Passly | Panel de administración</title>
</svelte:head>

<svelte:window onkeydown = {handle_keydown}/>

<section class = "admin_page">
  <div class = "container">
    <header class = "admin_page_header">
      <div>
        <span class = "page_eyebrow">Espacio privado</span>
        <h1>Gestión de eventos</h1>
        <p>Crea, edita, cancela y retira de la venta los eventos de Passly desde un único lugar.</p>
      </div>
      <button type = "button" class = "create_event_button" onclick = {open_create_event}>
        <span aria-hidden = "true">+</span>
        Crear evento
      </button>
    </header>
    <div class = "admin_workspace">
      <aside class = "event_sidebar" aria-labelledby = "event_list_title">
        <div class = "sidebar_header">
          <div>
            <span class = "page_eyebrow">Catálogo</span>
            <h2 id = "event_list_title">Eventos</h2>
          </div>
          <span class = "event_count">{all_events.length}</span>
        </div>
        <p class = "sidebar_description">Seleccione un evento para revisar su configuración.</p>
        <div class = "event_list">
          {#if is_loading_events}
            <p class = "sidebar_description" role = "status">Cargando eventos...</p>
          {:else if events_error}
            <p class = "sidebar_description" role = "alert">{events_error}</p>
          {:else if all_events.length === 0}
            <p class = "sidebar_description">No hay eventos registrados.</p>
          {:else}
          {#each all_events as event_item}
            <button
              type = "button"
              class:selected_event = {selected_event?.id === event_item.id && editor_mode === "edit"}
              class = "event_list_item"
              aria-pressed = {selected_event?.id === event_item.id && editor_mode === "edit"}
              onclick = {() => select_event(event_item)}
            >
              <img src = {event_item.image} alt = ""/>
              <span class = "event_list_content">
                <span class = "event_list_top">
                  <strong>{event_item.name}</strong>
                  <span class = "status_badge {get_status_class(event_item.status)}">
                    {event_item.status}
                  </span>
                </span>
                <span class = "event_list_details">{event_item.date} · {event_item.site}</span>
                <span class = "event_list_stock">
                  {event_item.tickets.toLocaleString("es-AR")} entradas registradas
                </span>
              </span>
            </button>
          {/each}
          {/if}
        </div>
        <div class = "sidebar_legend">
          <span><i class = "available_dot"></i> Disponible</span>
          <span><i class = "sold_out_dot"></i> Agotado</span>
          <span><i class = "postponed_dot"></i> Postergado</span>
          <span><i class = "cancelled_dot"></i> Cancelado</span>
        </div>
      </aside>
      <AdminEventEditor
        event_item = {selected_event}
        {editor_mode}
        active_section = {active_editor_section}
        on_section_change = {change_editor_section}
        on_cancel = {() => request_action("cancel")}
        on_archive = {() => request_action("archive")}
        on_show_preview = {show_preview_action}
        on_publish = {handle_created_event}
      />
    </div>
  </div>
</section>
{#if pending_action}
  <div class = "confirmation_overlay" role = "presentation" onclick = {handle_overlay_click} use:portal>
    <dialog
      open class = "confirmation_dialog" aria-modal = "true" aria-labelledby = "confirmation_title"
    >
      <span class = "confirmation_icon" aria-hidden = "true">!</span>
      <h2 id = "confirmation_title">
        {pending_action === "cancel" ? "¿Cancelar este evento?" : "¿Retirar este evento de la venta?"}
      </h2>
      <p>
        {pending_action === "cancel" ? "La cancelación debe conservar el registro y activar el proceso de aviso o reembolso que defina el backend." : "El retiro lógico ocultará el evento del catálogo sin borrar su información ni el historial asociado."}
      </p>
      <div class = "confirmation_actions">
        <button type = "button" class = "outline_button" onclick = {() => pending_action = null}>
          Volver
        </button>
        <button type = "button" class = "confirm_danger_button" onclick = {confirm_preview_action}>
          {pending_action === "cancel" ? "Confirmar cancelación" : "Retirar de la venta"}
        </button>
      </div>
    </dialog>
  </div>
{/if}

<style>
  .admin_page {padding: 4rem 0 0;}

  .admin_page_header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .page_eyebrow {
    display: block;
    color: var(--secondary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .admin_page_header h1 {
    margin-top: 0.5rem;
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .admin_page_header p {
    max-width: 650px;
    margin-top: 0.75rem;
    color: var(--secondary-text-color);
  }

  .create_event_button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    gap: 0.5rem;
    padding: 1rem 1rem;
    color: white;
    background: var(--accent-gradient);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(140, 90, 245, 0.25);
    font-size: 0.75rem;
    font-weight: 750;
    transition: all var(--fast-transition);
  }

  .create_event_button span {
    font-size: 1.25rem;
    line-height: 0.75;
  }

  .create_event_button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(140, 90, 245, 0.5);
  }

  .admin_notice {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1rem;
    margin-bottom: 1.5rem;
    border-radius: 15px;
    font-size: 1rem;
    line-height: 1.5;
  }

  .admin_notice {
    color: var(--secondary-text-color);
    background: rgba(60, 130, 245, 0.1);
    border: 1px solid rgba(60, 130, 245, 0.25);
  }

  .notice_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 20px;
    height: 20px;
    color: white;
    border-radius: 50%;
    font-family: var(--display-font);
    font-size: 0.75rem;
    font-weight: 750;
  }
  
  .notice_icon {background: var(--secondary-accent-color);}

  .admin_workspace {
    display: grid;
    grid-template-columns: minmax(250px, 350px) minmax(0, 1fr);
    align-items: start;
    gap: 1.5rem;
  }

  .event_sidebar {
    overflow: hidden;
    background: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 25px;
  }

  .sidebar_header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.25rem 0.5rem;
  }

  .sidebar_header h2 {
    margin-top: 0.25rem;
    font-size: 1.25rem;
  }
  
  .event_count {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 30px;
    color: var(--secondary-accent-color);
    background: rgba(60, 130, 245, 0.1);
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 750;
  }
  .sidebar_description {
    padding: 0 1.25rem 1.15rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
  
  .event_list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border-color);
  }
  
  .event_list_item {
    display: grid;
    grid-template-columns: 5rem minmax(0, 1fr);
    gap: 0.75rem;
    width: 100%;
    padding: 1rem 1rem;
    color: var(--primary-text-color);
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all var(--fast-transition);
  }
  
  .event_list_item:hover {background: rgba(255, 255, 255, 0.05);}
  
  .event_list_item.selected_event {
    background: linear-gradient(90deg, rgba(140, 90, 245, 0.1), rgba(60, 130, 245, 0.05));
    box-shadow: inset 4px 0 0 var(--primary-accent-color);
  }
  
  .event_list_item img {
    width: 5rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .event_list_content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .event_list_top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .event_list_top strong {
    display: -webkit-box;
    overflow: hidden;
    font-size: 0.75rem;
    line-height: 1.25;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .status_badge {
    flex: none;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.5rem;
    font-weight: 750;
    white-space: nowrap;
  }

  .status_badge.available {
    color: var(--success-color);
    background: rgba(15, 185, 130, 0.1);
  }

  .status_badge.sold_out {
    color: var(--error-color);
    background: rgba(240, 70, 70, 0.1);
  }

  .status_badge.postponed {
    color: #faaa1e;
    background: rgba(250, 170, 30, 0.1);
  }

  .status_badge.cancelled {
    color: #a0a0a0;
    background: rgba(160, 160, 170, 0.1);
  }

  .event_list_details,
  .event_list_stock {
    overflow: hidden;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .event_list_stock {color: var(--secondary-accent-color);}

  .sidebar_legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
    padding: 1rem 1.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
  
  .sidebar_legend span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .sidebar_legend i {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .available_dot {background: var(--success-color);}

  .sold_out_dot {background: var(--error-color);}

  .postponed_dot {background: #faaa1e;}

  .cancelled_dot {background: #a0a0a0;}

  .confirmation_overlay {
    position: fixed;
    z-index: 300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(4, 4, 8, 0.75);
    backdrop-filter: blur(8px);
  }

  .confirmation_dialog {
    position: relative;
    width: min(400px, 100%);
    padding: 1.75rem;
    margin: 0;
    color: var(--primary-text-color);
    background: var(--secondary-background-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  .confirmation_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    color: white;
    background: rgba(240, 70, 70, 0.25);
    border: 1px solid rgba(240, 70, 70, 0.5);
    border-radius: 50%;
    font-family: var(--display-font);
    font-size: 1.5rem;
    font-weight: 750;
  }

  .confirmation_dialog h2 {font-size: 1.25rem;}

  .confirmation_dialog p {
    margin-top: 0.75rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .confirmation_actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .outline_button,
  .confirm_danger_button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0.75rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 750;
    transition: all var(--fast-transition);
  }

  .outline_button {
    color: var(--secondary-text-color);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
  }

  .outline_button:hover {
    color: var(--primary-text-color);
    background: rgba(255, 255, 255, 0.1);
  }

  .confirm_danger_button {
    color: white;
    background: var(--error-color);
    box-shadow: 0 4px 12px rgba(240, 70, 70, 0.25);
  }

  .confirm_danger_button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(240, 70, 70, 0.5);
  }
  
  @media (max-width: 900px) {
    .admin_workspace {grid-template-columns: 1fr;}

    .event_list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .event_list_item:nth-last-child(-n + 2) {border-bottom: none;}

    .sidebar_legend {border-top: 1px solid var(--border-color);}
  }

  @media (max-width: 600px) {
    .admin_page {padding-top: 2.5rem;}

    .admin_page_header {
      align-items: flex-start;
      flex-direction: column;
    }

    .create_event_button {width: 100%;}

    .event_list {grid-template-columns: 1fr;}

    .event_list_item:last-child {border-bottom: none;}

    .confirmation_actions {grid-template-columns: 1fr;}
  }
</style>

<script lang="ts">
  import {browser} from "$app/env";
  import {goto} from "$app/navigation";
  import {onMount} from "svelte";
  import AdminEventEditor from "#lib/components/admin_event_editor.svelte";
  import {fetch_events} from "#lib/api/passly_api.ts";
  import type {Event as PasslyEvent} from "#lib/data/events.ts";
  import {auth} from "#lib/state/auth.svelte.ts";

  type EditorSection = "basic" | "functions" | "sales";
  type PendingAction = "cancel" | "archive";

  let all_events = $state<PasslyEvent[]>([]);
  let selected_event = $state<PasslyEvent | null>(null);
  let editor_mode = $state<"create" | "edit">("edit");
  let active_editor_section = $state<EditorSection>("basic");
  let pending_action = $state<PendingAction | null>(null);
  let is_loading_events = $state(true);
  let events_error = $state("");

  onMount(() => {void load_events();});

  async function load_events(select_id?: number) {
    is_loading_events = true;
    const backend_events = await fetch_events();
    is_loading_events = false;
    if (backend_events === null) {
      events_error = "No se pudieron cargar los eventos del servidor.";
      return;
    }

    all_events = backend_events;
    events_error = "";
    if (select_id !== undefined) {
      selected_event = backend_events.find(event_item => event_item.id === select_id) ?? null;
      editor_mode = "edit";
    } else if (!selected_event || !backend_events.some(event_item => event_item.id === selected_event?.id)) {
      selected_event = backend_events[0] ?? null;
      if (backend_events.length === 0) editor_mode = "create";
    }
  }

  /*
    TODO (integración backend):
    Mover la protección visual de esta ruta al servidor (por ejemplo, +page.server.ts o hooks.server.ts).
    Este $effect solo mejora la navegación; no reemplaza la autorización de los endpoints del backend.
  */
  $effect(() => {
    if (!browser) return;
    if (!auth.is_authenticated) {
      goto("/iniciar_secion");
      return;
    }
    if (auth.user?.role !== "administrador") goto("/");
  });

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      }
    };
  }

  function select_event(event_item: PasslyEvent) {
    selected_event = event_item;
    editor_mode = "edit";
    active_editor_section = "basic";
  }

  function open_create_event() {
    selected_event = null;
    editor_mode = "create";
    active_editor_section = "basic";
  }

  function change_editor_section(section: EditorSection) {active_editor_section = section;}

  function request_action(action: PendingAction) {pending_action = action;}

  function confirm_preview_action() {pending_action = null;}

  function show_preview_action() {}

  async function handle_created_event(event_id: number) {await load_events(event_id);}

  function handle_overlay_click(event: MouseEvent) {
    if (event.target === event.currentTarget) pending_action = null;
  }

  function handle_keydown(event: KeyboardEvent) {
    if (event.key === "Escape" && pending_action) pending_action = null;
  }

  function get_status_class(status: string) {
    switch (status) {
      case "Disponible": return "available";
      case "Agotado": return "sold_out";
      case "Postergado": return "postponed";
      case "Cancelado": return "cancelled";
      default: return "";
    }
  }
</script>