<svelte:head>
  <title>Passly | Iniciar Sesión</title>
</svelte:head>

<div class = "auth_container">
  <div class = "auth_card">
    <div class = "auth_header">
      <h1>Iniciar sesión</h1>
      <p>Ingrese sus datos para acceder a su cuenta</p>
    </div>
    <form onsubmit = {handle_login}>
      <div class = "form_group">
        <label for = "email" class = "form_label">Correo electrónico</label>
        <input
          type = "email"
          id = "email"
          class = "input_field"
          placeholder = "su_correo_electronico@dominio.com"
          bind:value={email}
          required
        />
      </div>
      <div class = "form_group">
        <label for = "password" class = "form_label">Contraseña</label>
        <div class="icon_input_wrapper">
          <input
            type={show_password ? "text" : "password"}
            id="password"
            class="input_field"
            placeholder="••••••••"
            bind:value={password}
            required
          />
          <button
            type = "button"
            class = "toggle_icon_btn"
            onclick = {() => show_password = !show_password}
            aria-label = {show_password ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {#if show_password}
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
                <path
                  d = "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                ></path>
                <line x1 = "1" y1 = "1" x2 = "23" y2 = "23"></line>
              </svg>
            {:else}
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
                <path d = "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx = "12" cy = "12" r = "3"></circle>
              </svg>
            {/if}
          </button>
        </div>
      </div>
      <button type = "submit" class = "submit_button" disabled = {is_loading}>
        {is_loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
      {#if error_message}
        <p class="error_text">{error_message}</p>
      {/if}
    </form>
    <div class = "auth_footer">
      ¿No tiene una cuenta? <a href = "/registrarse">Regístrese aquí</a>
    </div>
  </div>
</div>

<script lang="ts">
  import {goto} from "$app/navigation";
  import {auth} from "#lib/state/auth.svelte.ts";

  let email = $state("");
  let password = $state("");
  let show_password = $state(false);
  let is_loading = $state(false);
  let error_message = $state("");

  async function handle_login(event: Event) {
    event.preventDefault();
    error_message = "";
    is_loading = true;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciales inválidas. Compruebe su correo y contraseña.");
        }
        const error_data = await response.json();
        let error_msg = "Error al iniciar sesión.";
        if (typeof error_data.detail === "string") error_msg = error_data.detail;
        else if (Array.isArray(error_data.detail)) error_msg = error_data.detail.map((err: any) => err.msg).join(", ");
        throw new Error(error_msg);
      }
      const token_data = await response.json();
      auth.set_token(token_data.access_token);
      const me_response = await fetch("/api/users/me", {
        headers: {Authorization: `Bearer ${token_data.access_token}`}
      });
      if (!me_response.ok) throw new Error("No se pudo obtener el perfil del usuario.");
      const user_data = await me_response.json();
      auth.set_user(user_data);
      goto("/");
    } catch (error: any) {error_message = error.message;}
    finally {is_loading = false;}
  }
</script>