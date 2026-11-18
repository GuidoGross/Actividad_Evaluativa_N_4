<svelte:head>
  <title>Passly | Contacto y soporte</title>
</svelte:head>

<section class = "contact_page page_section">
  <div class = "container">
    <header class = "contact_header">
      <span class = "eyebrow">Estamos para ayudarle</span>
      <h1>Contacto y soporte</h1>
      <p>
        ¿Tiene una duda sobre un evento, una compra o su cuenta? Déjenos los datos de su consulta y el equipo de Passly podrá orientarle.
      </p>
    </header>
    <div class = "contact_layout">
      <form
        class = "contact_form surface_card"
        aria-labelledby = "form_title"
        onsubmit = {handle_submit}
      >
        <div class = "form_header">
          <span class = "form_icon" aria-hidden = "true">✦</span>
          <div>
            <h2 id = "form_title">Cuéntenos qué necesita</h2>
            <p>Complete los campos y veremos su caso.</p>
          </div>
        </div>
        <div class = "form_grid">
          <label class = "form_group">
            <span class = "form_label">Nombre completo</span>
            <input
              class = "input_field"
              type = "text"
              placeholder = "Su nombre"
              autocomplete = "name"
              bind:value={name}
            />
            {#if name_error}
              <small class = "field_error">{name_error}</small>
            {/if}
          </label>
          <label class = "form_group">
            <span class = "form_label">Correo electrónico</span>
            <input
              class = "input_field"
              type = "email"
              placeholder = "nombre@ejemplo.com"
              autocomplete = "email"
              bind:value={email}
            />
            {#if email_error}
              <small class = "field_error">{email_error}</small>
            {/if}
          </label>
          <label class = "form_group">
            <span class = "form_label">Motivo de la consulta</span>
            <select class = "input_field" bind:value={reason}>
              <option value = "">Seleccione una opción</option>
              {#each support_reasons as support_reason}
                <option value = {support_reason}>
                  {support_reason}
                </option>
              {/each}
            </select>
            {#if reason_error}
              <small class = "field_error">{reason_error}</small>
            {/if}
          </label>
          <label class = "form_group">
            <span class = "form_label">Número de compra <small>(opcional)</small></span>
            <input
              class = "input_field"
              type = "text"
              placeholder = "Ejemplo: PASS-000123"
              bind:value={purchase_number}
            />
          </label>
          <label class = "form_group full_width">
            <span class = "form_label">¿Cómo podemos ayudarle?</span>
            <textarea
              class = "input_field message_input"
              rows = "6"
              placeholder = "Describa su consulta con el mayor detalle posible."
              bind:value={message}
            ></textarea>
            {#if message_error}
              <small class = "field_error">{message_error}</small>
            {/if}
          </label>
        </div>
        <div class = "form_footer">
          <button
            type = "submit"
            class = "send_button action_button action_button_primary"
          >
            Enviar consulta <span aria-hidden = "true">→</span>
          </button>
          {#if submitted}
            <p class = "success_message" role = "status">
              Su consulta fue validada correctamente. La integración con el sistema de soporte quedará disponible cuando se conecte el backend.
            </p>
          {/if}
        </div>
      </form>
      <aside class = "support_sidebar">
        <section class = "support_card primary_support_card surface_card">
          <span class = "card_eyebrow eyebrow">Canal principal</span>
          <h2>Soporte por correo</h2>
          <p>Para consultas generales y seguimiento de compras ficticias.</p>
          <a href = "mailto:soporte@passly.example">
            soporte@passly.example <span aria-hidden = "true">↗</span>
          </a>
          <small>Respuesta estimada: dentro de 24 a 48 horas hábiles.</small>
        </section>
        <section class = "support_card surface_card">
          <span class = "card_eyebrow eyebrow">Atención</span>
          <h2>Horarios de soporte</h2>
          <div class = "schedule_row"><span>Lunes a viernes</span><strong>09:00 a 18:00</strong></div>
          <div class = "schedule_row"><span>Sábados</span><strong>10:00 a 14:00</strong></div>
          <div class = "schedule_row"><span>Domingos y feriados</span><strong>Cerrado</strong></div>
        </section>
        <section class = "support_card faq_card surface_card">
          <span class = "card_eyebrow eyebrow">Preguntas frecuentes</span>
          <h2>Antes de escribirnos</h2>
          <details>
            <summary>¿Dónde encuentro mi comprobante?</summary>
            <p>
              En la versión final, estará disponible luego de una compra confirmada y también dentro del historial de la cuenta.
            </p>
          </details>
          <details>
            <summary>¿Cómo solicito un reembolso?</summary>
            <p>
              Seleccione el motivo correspondiente en el formulario y agregue el identificador de su compra cuando lo tenga.
            </p>
          </details>
          <details>
            <summary>¿Puedo cambiar una entrada?</summary>
            <p>
              Dependerá de las reglas del evento y de la disponibilidad. El equipo de soporte evaluará la consulta.
            </p>
          </details>
        </section>
      </aside>
    </div>
  </div>
</section>

<style>
  .contact_header {
    max-width: 750px;
    margin-bottom: 2.5rem;
  }

  .contact_header h1 {
    margin-top: 0.5rem;
    font-size: clamp(2rem, 5vw, 3rem);
  }

  .contact_header p {
    margin-top: 0.75rem;
    color: var(--secondary-text-color);
    font-size: 1rem;
  }
  
  .contact_layout {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
    align-items: start;
    gap: 1.5rem;
  }

  .contact_form {
    padding: clamp(1rem, 3vw, 2rem);
  }

  .form_header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .form_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: white;
    background: var(--accent-gradient);
    border-radius: 10px;
  }

  .form_header h2 {font-size: 1.25rem;}
  
  .form_header p {
    margin-top: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .form_label small {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .message_input {
    min-height: 10rem;
    resize: vertical;
  }

  .form_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-top: 1.25rem;
    margin-top: 0.25rem;
    border-top: 1px solid var(--border-color);
  }

  .send_button {
    flex: none;
    padding: 1rem 1rem;
    border-radius: 10px;
    font-size: 1rem;
  }

  .support_sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .support_card {padding: 1.25rem;}
  
  .support_card h2 {
    margin-top: 0.25rem;
    font-size: 1rem;
  }
  
  .support_card > p {
    margin-top: 0.5rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    line-height: 1.5;
  }
  
  .primary_support_card {
    background: linear-gradient(145deg, rgba(140, 90, 245, 0.25), rgba(60, 130, 245, 0.075));
    border-color: rgba(140, 90, 245, 0.25);
  }
  
  .primary_support_card a {
    display: inline-flex;
    gap: 0.5rem;
    margin-top: 1rem;
    color: var(--primary-text-color);
    font-size: 0.75rem;
    font-weight: 750;
  }
  
  .primary_support_card a:hover {color: var(--secondary-accent-color);}
  
  .primary_support_card small {
    display: block;
    margin-top: 0.75rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
  
  .schedule_row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
  
  .schedule_row:first-of-type {margin-top: 0.75rem;}
  
  .schedule_row:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
  
  .schedule_row strong {
    color: var(--primary-text-color);
    font-size: 0.75rem;
  }
  
  .faq_card details {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .faq_card details:first-of-type {margin-top: 0.5rem;}
  
  .faq_card details:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
  
  .faq_card summary {
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .faq_card summary::marker {color: var(--primary-accent-color);}
  
  .faq_card details p {
    margin: 0.5rem 0 0 1rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  @media (max-width: 850px) {
    .contact_layout {grid-template-columns: 1fr;}

    .support_sidebar {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .faq_card {grid-column: 1 / -1;}
  }

  @media (max-width: 600px) {
    .contact_page {padding-top: 2.5rem;}

    .form_grid, .support_sidebar {grid-template-columns: 1fr;}

    .form_footer {
      align-items: stretch;
      flex-direction: column; gap: 1rem;
    }

    .send_button {width: 100%;}

    .faq_card {grid-column: auto;}
  }

    .field_error {
    display: block;
    margin-top: 0.25rem;
    color: var(--error-color);
    font-size: 0.75rem;
  }

  .success_message {
    margin: 0;
    color: var(--success-color);
    font-size: 0.75rem;
    line-height: 1.5;
  }
</style>

<script lang="ts">
  import {browser} from "$app/env";
  import {page} from "$app/state";
  import {auth} from "#lib/state/auth.svelte.ts";

  const support_reasons = [
    "Consulta sobre un evento",
    "Estado de una compra",
    "Solicitud de arrepentimiento o reembolso",
    "Problema con mi cuenta",
    "Otro motivo"
  ];
  let name = $state("");
  let email = $state("");
  let reason = $state("");
  let purchase_number = $state("");
  let message = $state("");
  let name_error = $state("");
  let email_error = $state("");
  let reason_error = $state("");
  let message_error = $state("");
  let submitted = $state(false);

  $effect(() => {
    if (!browser) return;
    if (auth.user) {
      name = auth.user.name;
      email = auth.user.email;
    }
    const motivo = page.url.searchParams.get("motivo");
    if (motivo === "evento") reason = "Consulta sobre un evento";
    else if (motivo === "compra") reason = "Estado de una compra";
    else if (motivo === "reembolso") reason = "Solicitud de arrepentimiento o reembolso";
    else if (motivo === "cuenta") reason = "Problema con mi cuenta";
  });

  function validate_form() {
    name_error = "";
    email_error = "";
    reason_error = "";
    message_error = "";
    let is_valid = true;
    if (!name.trim()) {
      name_error = "Ingrese su nombre completo.";
      is_valid = false;
    }
    if (!email.trim()) {
      email_error = "Ingrese su correo electrónico.";
      is_valid = false;
    } else if (!email.includes("@")) {
      email_error = "Ingrese un correo electrónico válido.";
      is_valid = false;
    }
    if (!reason) {
      reason_error = "Seleccione el motivo de la consulta.";
      is_valid = false;
    }
    if (!message.trim()) {
      message_error = "Describa su consulta.";
      is_valid = false;
    }
    return is_valid;
  }

  function handle_submit(event: SubmitEvent) {
    event.preventDefault();
    submitted = false;
    if (!validate_form()) return;

    /*
      TODO (integración backend):
      1. Acordar y conectar el endpoint (por ejemplo: POST /api/soporte/solicitudes) para enviar los datos de forma segura.
      2. Deshabilitar el botón de envío durante la solicitud (estado 'loading'), usar clave idempotente para evitar tickets duplicados y manejar errores de red.
      3. Si el motivo es "arrepentimiento o reembolso", consultar primero la API de compras para verificar que los plazos legales lo permitan antes de procesarlo.
      4. Reemplazar la simulación estática (submitted = true;) que está debajo por la lógica que espere la respuesta HTTP 200/201 del servidor para recién ahí mostrar el mensaje de éxito.
    */

    submitted = true;
  }
</script>