<svelte:head>
  <title>Passly | Registrarse</title>
</svelte:head>

<div class = "auth_container">
  <div class = "auth_card">
    <div class = "auth_header">
      <h1>Registrarse</h1>
      <p>Únase a Passly y compre sus entradas fácilmente</p>
    </div>
    <form onsubmit = {handle_register}>
      <div class = "form_group">
        <label for = "name" class = "form_label">Nombre completo</label>
        <input
          type = "text"
          id = "name"
          class = "input_field"
          placeholder = "Nombre completo"
          bind:value={name}
          required
        />
      </div>
      <div class = "form_group">
        <label for = "birth_date" class = "form_label">Fecha de nacimiento</label>
        <div class = "date_input_wrapper">
          <input
            type = "text"
            id = "birth_date"
            class = "input_field"
            placeholder = "DD/MM/AAAA"
            bind:this={date_input}
            bind:value={birth_date}
            oninput={handle_date_input}
            required
          />
          <button
            type = "button"
            class = "calendar_icon_btn"
            onclick = {open_calendar}
            aria-label = "Abrir calendario"
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
              <rect x = "3" y = "4" width = "18" height = "18" rx = "2" ry = "2"></rect>
              <line x1 = "16" y1 = "2" x2 = "16" y2 = "6"></line>
              <line x1 = "8" y1 = "2" x2 = "8" y2 = "6"></line>
              <line x1 = "3" y1 = "10" x2 = "21" y2 = "10"></line>
            </svg>
          </button>
        </div>
      </div>
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
          <button type = "button" class = "toggle_icon_btn" onclick = {() => show_password = !show_password} aria-label = {show_password ? "Ocultar contraseña" : "Ver contraseña"}>
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
      <div class = "form_group">
        <label for = "confirm_password" class = "form_label">Confirmar contraseña</label>
        <div class="icon_input_wrapper">
          <input
            type={show_confirm_password ? "text" : "password"}
            id="confirm_password"
            class="input_field"
            placeholder="••••••••"
            bind:value={confirm_password}
            required
          />
          <button
            type = "button"
            class = "toggle_icon_btn"
            onclick = {() => show_confirm_password = !show_confirm_password}
            aria-label = {show_confirm_password ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {#if show_confirm_password}
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
        {is_loading ? "Registrando..." : "Registrarse"}
      </button>
      {#if error_message}
        <p class="error_text">{error_message}</p>
      {/if}
    </form>
    <div class = "auth_footer">
      ¿Ya tiene una cuenta? <a href = "/iniciar_sesion">Inicie sesión aquí</a>
    </div>
  </div>
</div>

<script lang="ts">
  import flatpickr from "flatpickr";
  import {Spanish} from "flatpickr/dist/l10n/es.js";
  import {onMount} from "svelte";
  import {apply_date_mask} from "#lib/utils/date_mask.ts";
  import {goto} from "$app/navigation";
  import {auth} from "#lib/state/auth.svelte.ts";

  let date_input: HTMLInputElement;
  let fp_instance: any;

  let name = $state("");
  let email = $state("");
  let password = $state("");
  let confirm_password = $state("");
  let show_password = $state(false);
  let show_confirm_password = $state(false);
  let birth_date = $state("");
  let is_loading = $state(false);
  let error_message = $state("");

  function handle_date_input(event: any) {
    const target = event.target as HTMLInputElement;
    const input_event = event as InputEvent;
    const is_deleting = input_event.inputType === "deleteContentBackward";
    
    let raw_val = target.value.replace(/\D/g, "");
    target.value = apply_date_mask(raw_val, is_deleting);
    birth_date = target.value;
  }

  onMount(() => {
    fp_instance = flatpickr(date_input, {
      locale: Spanish,
      dateFormat: "d/m/Y",
      formatDate: (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const yearStr = date.getFullYear().toString();
        const year = yearStr.length === 4 ? yearStr[0] + "." + yearStr.substring(1) : yearStr;
        return `${day}/${month}/${year}`;
      },
      allowInput: true,
      parseDate: (datestr: string, format: string) => {
        const raw = datestr.replace(/\D/g, "");
        if (raw.length === 8) {
          const d = parseInt(raw.substring(0, 2), 10);
          const m = parseInt(raw.substring(2, 4), 10);
          const y = parseInt(raw.substring(4, 8), 10);
          return new Date(y, m - 1, d);
        }
        return new Date(NaN);
      },
      disableMobile: true,
      clickOpens: false,
      onReady: function(selectedDates, dateStr, instance) {
        const yearWrapper = instance.calendarContainer.querySelector(".numInputWrapper");
        if (!yearWrapper) return;
        (yearWrapper as HTMLElement).style.display = "none";
        const yearSelect = document.createElement("select");
        yearSelect.className = "flatpickr-monthDropdown-months flatpickr-year-select";
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1920; y--) {
          const option = document.createElement("option");
          option.value = y.toString();
          const yearStr = y.toString();
          option.text = yearStr.length === 4 ? yearStr[0] + "." + yearStr.substring(1) : yearStr;
          yearSelect.appendChild(option);
        }
        yearSelect.value = instance.currentYear.toString();
        yearSelect.addEventListener("change", (e) => {
          const target = e.target as HTMLSelectElement;
          instance.changeYear(Number(target.value));
        });
        yearWrapper.parentNode?.insertBefore(yearSelect, yearWrapper.nextSibling);
        (instance as any).customYearSelect = yearSelect;
      },
      onYearChange: function(selectedDates, dateStr, instance) {
        if ((instance as any).customYearSelect) {
          (instance as any).customYearSelect.value = instance.currentYear.toString();
        }
      }
    });
  });

  function open_calendar(event: Event) {
    event.stopPropagation();
    if (fp_instance) {fp_instance.open();}
  }

  async function handle_register(event: Event) {
    event.preventDefault();
    error_message = "";
    if (password !== confirm_password) {
      error_message = "Las contraseñas no coinciden.";
      return;
    }
    const raw_date = birth_date.replace(/\D/g, "");
    if (raw_date.length !== 8) {
      error_message = "La fecha de nacimiento no es válida.";
      return;
    }
    is_loading = true;
    try {
      const day = raw_date.substring(0, 2);
      const month = raw_date.substring(2, 4);
      const year = raw_date.substring(4, 8);
      const formatted_date = `${day}-${month}-${year}`;
      
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          birth_date: formatted_date
        })
      });
      if (!response.ok) {
        const error_data = await response.json();
        let error_msg = "Error al registrarse. Compruebe los datos.";
        if (typeof error_data.detail === "string") {
          error_msg = error_data.detail;
        } else if (Array.isArray(error_data.detail)) {
          error_msg = error_data.detail.map((err: any) => err.msg).join(", ");
        }
        throw new Error(error_msg);
      }
      const user_data = await response.json();
      auth.set_user(user_data);
      goto("/");
    } catch (error: any) {error_message = error.message;}
    finally {is_loading = false;}
  }
</script>