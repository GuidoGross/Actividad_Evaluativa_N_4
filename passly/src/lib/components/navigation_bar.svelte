<nav class = "navigation_bar">
  <div class = "container navigation_content">
    <a href = "/" class = "logo">
      <span class = "text_gradient">Pass</span>ly
    </a>
    <div class = "search_bar" class:has_text={search_query.length > 0}>
      <input type = "text"
        placeholder = "Buscar eventos o lugares..."
        bind:value={search_query}
        onkeydown = {(event) => {if (event.key === "Enter") search();}}
      />
      <button 
        type = "button"
        class = "clear_button" 
        aria-label = "Borrar búsqueda" 
        onmousedown = {(e) => { e.preventDefault(); search_query = ""; }}
      >
        <svg
          xmlns = "http://www.w3.org/2000/svg" 
          width = "20" height = "20" viewBox = "0 0 24 24" 
          fill = "none" stroke = "currentColor" 
          stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round"
        >
          <line x1 = "18" y1 = "6" x2 = "6" y2 = "18"></line>
          <line x1 = "6" y1 = "6" x2 = "18" y2 = "18"></line>
        </svg>
      </button>
      <button class = "search_button" aria-label = "Buscar" onclick = {search}>
        <svg
          xmlns = "http://www.w3.org/2000/svg"
          width = "20"
          height = "20"
          viewBox = "0 0 24 24"
          fill = "none"
          stroke = "currentColor"
          stroke-width = "2"
          stroke-linecap = "round"
          stroke-linejoin = "round"
        >
          <circle cx = "10" cy = "10" r = "8"></circle>
          <line x1 = "25" y1 = "25" x2 = "16" y2 = "16"></line>
        </svg>
      </button>
    </div>
    <div class = "navigation_links">
      <a href = "/catalogo/categoria=Conciertos" class = "navigation_link">Conciertos</a>
      <a href = "/catalogo/categoria=Teatro" class = "navigation_link">Teatro</a>
      <a href = "/catalogo/categoria=Deportes" class = "navigation_link">Deportes</a>
      <a href = "/catalogo/categoria=Festivales" class = "navigation_link">Festivales</a>
      <div class = "divider"></div>
      {#if auth.is_authenticated}
        {#if auth.user?.role === "administrador"}
          <a href = "/admin" class = "navigation_link admin_link">Administración</a>
        {/if}
        <div class = "user_profile">
          <div class = "avatar">{auth.user?.name.charAt(0).toUpperCase()}</div>
          <span class = "user_name">{auth.user?.name.split(" ")[0]}</span>
          <button
            class = "logout_button"
            aria-label = "Cerrar sesión"
            title = "Cerrar sesión"
            onclick = {handle_logout}
          >
            <svg
              xmlns = "http://www.w3.org/2000/svg"
              width = "18"
              height = "18"
              viewBox = "0 0 24 24"
              fill = "none"
              stroke = "currentColor"
              stroke-width = "2"
              stroke-linecap = "round"
              stroke-linejoin = "round"
            >
              <path d = "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points = "16 17 21 12 16 7"></polyline>
              <line x1 = "21" y1 = "12" x2 = "9" y2 = "12"></line>
            </svg>
          </button>
        </div>
      {:else}
        <button class = "log_in_button" onclick = {log_in}>Iniciar sesión</button>
        <button class = "sign_up_button" onclick = {sign_up}>Registrarse</button>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navigation_bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 85px;
    background: var(--transparent-background);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--transparent-border);
    z-index: 100;
    display: flex;
    align-items: center;
  }

  .navigation_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .logo {
    font-family: var(--display-font);
    font-size: 2rem;
    font-weight: 750;
    letter-spacing: -0.5px;
  }

  .search_bar {
    flex: 1;
    max-width: 400px;
    display: flex;
    align-items: center;
    background: var(--transparent-background);
    border: 1px solid var(--transparent-border);
    border-radius: 100px;
    padding: 0.5rem 1rem;
    transition: all var(--normal-transition);
  }

  .search_bar:hover {
    border-color: var(--border-color);
    background: rgba(255, 255, 255, 0.05);
  }

  .search_bar:focus-within {
    border-color: var(--primary-accent-color);
    box-shadow: 0 0 0 3px rgba(140, 90, 245, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }

  .search_bar input {
    flex: 1;
    background: none;
    border: none;
    color: var(--primary-text-color);
    font-size: 0.875rem;
    outline: none;
    padding-right: 0.5rem;
  }

  .search_bar input::placeholder {color: var(--secondary-text-color);}

  .clear_button {
    display: none;
    color: var(--secondary-text-color);
    padding: 0 0.25rem 0 0;
    margin-right: 0.25rem;
    align-items: center;
    justify-content: center;
    transition: color var(--fast-transition);
  }

  .clear_button:hover {color: var(--primary-accent-color);}

  .search_bar.has_text:focus-within .clear_button {display: flex;}

  .search_button {
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--fast-transition);
  }

  .search_button:hover {color: var(--primary-accent-color);}

  .navigation_links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .navigation_link {
    color: var(--secondary-text-color);
    font-weight: 500;
    font-size: 0.875rem;
  }

  .navigation_link:hover {color: var(--primary-text-color);}

  .admin_link {
    color: var(--secondary-accent-color);
    font-weight: 750;
  }

  .admin_link:hover {color: var(--primary-text-color);}

  .divider {
    width: 1px;
    height: 1.75rem;
    background: var(--border-color);
    margin: 0 0.5rem;
  }

  .log_in_button {
    color: var(--primary-text-color);
    font-weight: 750;
    font-size: 0.875rem;
  }

  .log_in_button:hover {color: var(--primary-accent-color);}

  .sign_up_button {
    background: var(--primary-text-color);
    color: var(--primary-background-color);
    padding: 0.75rem 1.5rem;
    border-radius: 100px;
    font-weight: 750;
    font-size: 0.875rem;
    transition: all var(--fast-transition);
  }

  .sign_up_button:hover {
    background: var(--primary-accent-color);
    color: white;
    box-shadow: 0 3px 12px rgba(140, 90, 245, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    .navigation_links,
    .navigation_link,
    .divider {display: none;}

    .navigation_links,
    .admin_link {display: block;}

    .search_bar {max-width: 250px;}
  }

  @media (max-width: 600px) {
    .search_bar {display: none;}
  }

  .user_profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--transparent-border);
    border-radius: 100px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-gradient);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 750;
    font-size: 1rem;
    box-shadow: 0 0 10px rgba(140, 90, 245, 0.5);
  }

  .user_name {
    font-weight: 500;
    color: var(--primary-text-color);
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }

  .logout_button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--secondary-text-color);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all var(--fast-transition);
  }

  .logout_button:hover {
    background: rgba(255, 107, 107, 0.25);
    color: #ff6b6b;
  }

  @media (max-width: 900px) {
    .search_bar {display: none;}
  }
</style>

<script lang="ts">
  import {page} from "$app/state";
  import {goto, afterNavigate} from "$app/navigation";
  import {auth} from "#lib/state/auth.svelte.ts";

  let search_query = $state("");

  afterNavigate(() => {
    if (page.url.pathname.startsWith("/catalogo/busqueda=")) {
      const parts = page.url.pathname.split("/catalogo/busqueda=");
      if (parts.length > 1 && parts[1]) {search_query = decodeURIComponent(parts[1]).replace(/_/g, " ");}
    }
  });

  function search() {
    if (!search_query.trim()) return;
    const formatted_search_query = search_query.trim().replace(/\s+/g, "_");
    goto(`/catalogo/busqueda=${encodeURIComponent(formatted_search_query)}`);
  }

  function log_in() {goto("/iniciar_sesion");}

  function sign_up() {goto("/registrarse");}

  async function handle_logout() {
    if (auth.token) {
      await fetch("/api/users/logout", {
        method: "POST",
        headers: auth.auth_headers
      }).catch(() => {});
    }
    auth.logout();
    goto("/");
  }
</script>