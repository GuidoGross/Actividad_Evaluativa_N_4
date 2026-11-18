<svelte:window onkeydown = {handle_keydown}/>

<div class = "purchase_modal_overlay" role = "presentation" use:portal>
  <dialog
    open
    class = "purchase_modal"
    aria-modal = "true"
    aria-labelledby = "purchase_modal_title"
    tabindex="-1"
  >
    <header class = "modal_header">
      <div>
        <span class = "eyebrow">Compra de entradas</span>
        <h2 id = "purchase_modal_title">
          {current_step === "receipt" ? "Vista previa del comprobante" : event_item.name}
        </h2>
      </div>
      <button type = "button" class = "close_button" aria-label = "Cerrar compra" onclick = {onclose}>
        <svg
          viewBox = "0 0 24 24"
          width = "25"
          height = "25"
          fill = "none"
          stroke = "currentColor"
          stroke-width = "2"
          stroke-linecap = "round"
        >
          <path d = "m6 6 12 12M18 6 6 18"></path>
        </svg>
      </button>
    </header>
    {#if current_step !== "receipt"}
      <div class = "purchase_steps" aria-label = "Progreso de compra">
        <span
          class:active_step = {current_step === "selection"}
          class:completed_step = {current_step !== "selection"}
        >
          1. Selección
        </span>
        <span class:active_step = {current_step === "payment"}>2. Pago</span>
        <span>3. Comprobante</span>
      </div>
    {/if}
    {#if current_step === "selection"}
      <div class = "purchase_content">
        <div class = "selection_content">
          <article class = "event_overview">
            <img src = {event_item.image} alt = {event_item.name}/>
            <div class = "event_overview_content">
              <div class = "event_badges">
                <span>{event_item.category}</span>
                <span class = "available_badge">Disponible</span>
              </div>
              <p>{event_item.description}</p>
              <div class = "event_details">
                <span>{event_item.site}</span>
                <span>{selected_function.date} · {selected_function.time}</span>
              </div>
            </div>
          </article>
          {#if event_functions.length > 1}
            <section class = "selection_section" aria-labelledby = "function_selection_title">
              <div class = "section_heading">
                <span class = "section_number">01</span>
                <div>
                  <h3 id = "function_selection_title">Elija la función</h3>
                  <p>Seleccione la fecha y el horario que más le convengan.</p>
                </div>
              </div>
              <div class = "function_options">
                {#each event_functions as function_item}
                  <button
                    type = "button"
                    class:option_selected = {selected_function_id === function_item.id}
                    class = "function_option"
                    onclick = {() => selected_function_id = function_item.id}
                  >
                    <strong>{function_item.date}</strong>
                    <span>{function_item.time}</span>
                    <small>
                      {function_item.available_tickets.toLocaleString("es-AR")} entradas disponibles
                    </small>
                  </button>
                {/each}
              </div>
            </section>
          {/if}
          <section class = "selection_section" aria-labelledby = "category_selection_title">
            <div class = "section_heading">
              <span class = "section_number">{event_functions.length > 1 ? "02" : "01"}</span>
              <div>
                <h3 id = "category_selection_title">Elija su categoría</h3>
                <p>El precio y la disponibilidad dependen de la categoría seleccionada.</p>
              </div>
            </div>
            <div class = "ticket_categories">
              {#each ticket_categories as category_item}
                <button
                  type = "button"
                  class:option_selected = {selected_category_id === category_item.id}
                  class = "ticket_category"
                  onclick = {() => select_ticket_category(category_item.id)}
                >
                  <span class = "category_check" aria-hidden = "true">
                    {#if selected_category_id === category_item.id}✓{/if}
                  </span>
                  <span class = "ticket_category_content">
                    <strong>{category_item.name}</strong>
                    {#if category_item.description}
                      <small>{category_item.description}</small>
                    {/if}
                    <small>
                      {
                        category_item.available_tickets.toLocaleString("es-AR")
                      } entradas disponibles · Máximo {category_item.purchase_limit}
                    </small>
                  </span>
                  <strong
                    class = "category_price">${category_item.price.toLocaleString("es-AR")}
                  </strong>
                </button>
              {/each}
            </div>
          </section>
          <section
            class = "selection_section quantity_section" aria-labelledby = "quantity_selection_title"
          >
            <div class = "section_heading">
              <span class = "section_number">{event_functions.length > 1 ? "03" : "02"}</span>
              <div>
                <h3 id = "quantity_selection_title">Indique la cantidad</h3>
                <p>
                  Puede comprar hasta {selected_category.purchase_limit} entradas en esta operación.
                </p>
              </div>
            </div>
            <div class = "quantity_control">
              <button
                type = "button" aria-label = "Quitar una entrada" onclick = {decrease_ticket_quantity}
              >-</button>
              <input
                class = "input_field"
                type = "number"
                min = "1"
                max = {selected_category.purchase_limit}
                bind:value={ticket_quantity}
                aria-label = "Cantidad de entradas"
              />
              <button
                type = "button" aria-label = "Agregar una entrada" onclick = {increase_ticket_quantity}
              >+</button>
            </div>
          </section>
        </div>
        <aside class = "purchase_summary" aria-label = "Resumen de compra">
          <span class = "summary_eyebrow">Resumen</span>
          <h3>{event_item.name}</h3>
          <dl>
            <div><dt>Función</dt><dd>{selected_function.date} · {selected_function.time}</dd></div>
            <div><dt>Categoría</dt><dd>{selected_category.name}</dd></div>
            <div>
              <dt>Cantidad</dt>
              <dd>{ticket_quantity} {ticket_quantity === 1 ? "entrada" : "entradas"}</dd>
            </div>
          </dl>
          <div class = "summary_total">
            <span>Total estimado</span><strong>${total_price.toLocaleString("es-AR")}</strong>
          </div>
          <button type = "button" class = "primary_action" onclick = {() => current_step = "payment"}>
            Continuar al pago
            <span aria-hidden = "true">→</span>
          </button>
        </aside>
      </div>
    {:else if current_step === "payment"}
      <div class = "payment_content">
        <div class = "payment_form_column">
          <div class = "payment_intro">
            <span class = "section_number">02</span>
            <div>
              <h3>Datos de pago</h3>
              <p>Ingrese su información de pago.</p>
            </div>
          </div>
          <div class = "payment_method">
            <span class = "payment_method_icon" aria-hidden = "true">▣</span>
            <div><strong>Tarjeta de débito o crédito</strong><span>Pago seguro</span></div>
            <span class = "payment_selected">Seleccionado</span>
          </div>
          <div class = "payment_form">
            <label class = "form_group">
              <span class = "form_label">Titular de la tarjeta</span>
              <input
                class = "input_field"
                type = "text"
                placeholder = "Como figura en la tarjeta"
                autocomplete = "cc-name"
                bind:value={card_holder}
              />
            </label>
            <label class = "form_group">
              <span class = "form_label">Número de tarjeta</span>
              <input
                class = "input_field"
                type = "text"
                inputmode = "numeric"
                placeholder = "0000 0000 0000 0000"
                autocomplete = "cc-number"
                bind:value={card_number}
              />
            </label>
            <div class = "payment_row">
              <label class = "form_group">
                <span class = "form_label">Vencimiento</span>
                <input
                  class = "input_field"
                  type = "text"
                  inputmode = "numeric"
                  placeholder = "MM/AA"
                  autocomplete = "cc-exp"
                  maxlength = "5"
                  bind:value={card_expiry}
                  oninput = {handle_expiry_input}
                  onblur = {handle_expiry_blur}
                />
              </label>
              <label class = "form_group">
                <span class = "form_label">Código de seguridad</span>
                <input
                  class = "input_field"
                  type = "password"
                  inputmode = "numeric"
                  placeholder = "CVV"
                  autocomplete = "cc-csc"
                  bind:value={card_cvv}
                />
              </label>
            </div>
          </div>
        </div>
        <aside class = "purchase_summary payment_summary" aria-label = "Resumen de pago">
          <span class = "summary_eyebrow">Total a abonar</span>
          <strong class = "payment_total">${total_price.toLocaleString("es-AR")}</strong>
          <p>
            {ticket_quantity}
            {ticket_quantity === 1 ? "entrada" : "entradas"}
            de {selected_category.name}
          </p>
          {#if payment_error}
            <p class = "payment_error" role = "alert">{payment_error}</p>
          {/if}
          <button
            type = "button"
            class = "primary_action"
            onclick = {confirm_payment}
            disabled = {is_processing_payment}
          >
            {is_processing_payment ? "Procesando..." : "Confirmar pago"}
            <span aria-hidden = "true">→</span>
          </button>
          <button
            type = "button"
            class = "secondary_action"
            onclick = {() => current_step = "selection"}
          >
            Volver a la selección
          </button>
        </aside>
      </div>
    {:else}
      <div class = "receipt_content" aria-live = "polite">
        <div class = "receipt_success_icon" aria-hidden = "true">✓</div>
        <span class = "eyebrow">Vista previa</span>
        <h3>Su comprobante estará listo al confirmar la compra</h3>
        <div class = "receipt_card">
          <div class = "receipt_header">
            <span>Comprobante de compra</span>
            <strong>PREVIEW-{event_item.id.toString().padStart(4, "0")}</strong>
          </div>
          <div class = "receipt_body">
            <div>
              <span>Evento</span>
              <strong>{event_item.name}</strong>
            </div>
            <div>
              <span>Función</span>
              <strong>{selected_function.date} · {selected_function.time}</strong>
            </div>
            <div>
              <span>Entradas</span>
              <strong>{ticket_quantity} · {selected_category.name}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>${total_price.toLocaleString("es-AR")}</strong>
            </div>
          </div>
          <div
            class = "qr_placeholder"
            aria-label = "Espacio reservado para el código QR generado por el backend"
          >
            {#each Array(49) as _, index}
              <span class:filled_cell = {
                [
                  0, 1, 2, 7, 8, 9, 14, 15, 16, 30, 31, 32, 35, 36, 37, 42, 43, 44, 45, 46, 47
                ].includes(index)}>
              </span>
            {/each}
          </div>
        </div>
        <button
          type = "button" class = "primary_action receipt_close_button" onclick = {onclose}
        >Cerrar vista previa</button>
      </div>
    {/if}
  </dialog>
</div>

<style>
  .purchase_modal_overlay {
    position: fixed;
    z-index: 300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow-y: auto;
    background: rgba(4, 4, 8, 0.75);
    backdrop-filter: blur(10px);
    animation: fade_in var(--normal-transition) forwards;
  }

  .purchase_modal {
    position: relative;
    padding: 0;
    color: var(--primary-text-color);
    margin: 0;
    width: min(1080px, 100%);
    max-height: min(880px, calc(100vh - 3rem));
    overflow-y: auto;
    background: linear-gradient(135deg, rgba(31, 31, 47, 1), rgba(15, 15, 23, 1));
    border: 1px solid var(--border-color);
    border-radius: 25px;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.75), 0 0 40px rgba(140, 90, 245, 0.1);
    animation: modal_up var(--normal-transition) forwards;
  }

  .modal_header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 2rem 2rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
  }

  .eyebrow, .summary_eyebrow {
    display: block;
    color: var(--secondary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .modal_header h2 {
    max-width: 720px;
    margin-top: 0.25rem;
    font-size: clamp(1.25rem, 3vw, 2rem);
  }

  .close_button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 40px;
    height: 40px;
    color: var(--secondary-text-color);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    transition: all var(--fast-transition);
  }

  .close_button:hover {color: var(--primary-text-color); background: rgba(255, 255, 255, 0.1);}

  .purchase_steps {
    display: flex;
    gap: 1.5rem;
    padding: 1rem 2rem;
    color: var(--secondary-text-color);
    border-bottom: 1px solid var(--border-color);
    font-size: 0.75rem;
    font-weight: 750;
  }

  .purchase_steps span {position: relative;}

  .purchase_steps .active_step, .purchase_steps .completed_step {color: var(--primary-text-color);}

  .purchase_steps .active_step::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -1rem;
    left: 0;
    height: 2px;
    background: var(--accent-gradient);
  }

  .purchase_content, .payment_content {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 20rem;
    gap: 2rem;
    padding: 2rem;
  }

  .selection_content, .payment_form_column {min-width: 0;}

  .event_overview {
    display: grid;
    grid-template-columns: 10rem minmax(0, 1fr);
    gap: 1.25rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
  }

  .event_overview img {
    width: 10rem;
    height: 7.5rem;
    object-fit: cover;
    border-radius: 16px;
  }

  .event_overview_content {display: flex; flex-direction: column; gap: 0.75rem;}

  .event_badges {display: flex; flex-wrap: wrap; gap: 0.5rem;}

  .event_badges span {
    padding: 0.25rem 0.5rem;
    color: var(--secondary-text-color);
    border: 1px solid var(--border-color);
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 750;
  }

  .event_badges .available_badge {
    color: var(--success-color);
    border-color: rgba(15, 185, 130, 0.25);
    background: rgba(15, 185, 130, 0.1);
  }

  .event_overview p {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .event_details {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
    color: var(--primary-text-color);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .selection_section {padding-top: 2rem;}

  .section_heading, .payment_intro {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .section_number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 30px;
    height: 30px;
    color: white;
    background: var(--accent-gradient);
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 750;
  }

  .section_heading h3, .payment_intro h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .section_heading p, .payment_intro p {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .function_options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }

  .function_option, .ticket_category {
    color: var(--primary-text-color);
    text-align: left;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--border-color);
    transition: all var(--fast-transition);
  }

  .function_option {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    border-radius: 15px;
  }

  .function_option strong {font-size: 0.75rem;}

  .function_option span, .function_option small, .ticket_category small {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .function_option:hover, .ticket_category:hover {
    background: rgba(255, 255, 255, 0.075);
    border-color: rgba(140, 90, 245, 0.5);
  }

  .function_option.option_selected,
  .ticket_category.option_selected {
    background: rgba(140, 90, 245, 0.1);
    border-color: var(--primary-accent-color);
    box-shadow: inset 0 0 0 1px rgba(140, 90, 245, 0.25);
  }

  .ticket_categories {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ticket_category {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem;
    border-radius: 15px;
  }

  .category_check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: white;
    border: 1px solid var(--secondary-text-color);
    border-radius: 50%;
    font-size: 0.7rem;
  }

  .option_selected .category_check {
    background: var(--primary-accent-color);
    border-color: var(--primary-accent-color);
  }

  .ticket_category_content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ticket_category_content strong {font-size: 1rem;}

  .category_price {
    font-family: var(--display-font);
    font-size: 1rem;
    white-space: nowrap;
  }

  .quantity_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.25rem;
  }

  .quantity_section .section_heading {margin: 0;}

  .quantity_control {
    display: grid;
    grid-template-columns: 40px 60px 40px;
    align-items: center;
  }

  .quantity_control button {
    width: 40px;
    height: 40px;
    color: var(--primary-text-color);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    font-size: 1rem;
    transition: all var(--fast-transition);
  }

  .quantity_control button:first-child {border-radius: 10px 0 0 10px;}

  .quantity_control button:last-child {border-radius: 0 10px 10px 0;}

  .quantity_control button:hover {
    background: rgba(140, 90, 245, 0.25);
    color: white;
  }

  .quantity_control input {
    height: 40px;
    padding: 0.5rem;
    border-right: none;
    border-left: none;
    border-radius: 0;
    text-align: center;
  }

  .purchase_summary {
    align-self: start;
    position: sticky;
    top: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--border-color);
    border-radius: 25px;
  }

  .purchase_summary h3 {
    margin: 0.5rem 0 1.25rem;
    font-size: 1.25rem;
  }

  .purchase_summary dl {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .purchase_summary dl div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .purchase_summary dt {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .purchase_summary dd {
    margin: 0;
    color: var(--primary-text-color);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .summary_total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .summary_total span {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .summary_total strong,
  .payment_total {
    font-family: var(--display-font);
    font-size: 1.5rem;
  }

  .primary_action, .secondary_action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 750;
    transition: all var(--fast-transition);
  }

  .primary_action {
    color: white; 
    background: var(--accent-gradient); 
    box-shadow: 0 4px 12px rgba(140, 90, 245, 0.25);
  }

  .primary_action:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(140, 90, 245, 0.5);
  }

  .secondary_action {
    color: var(--secondary-text-color);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
  }

  .secondary_action:hover {
    color: var(--primary-text-color);
    background: rgba(255, 255, 255, 0.1);
  }

  .payment_content {min-height: 480px;}

  .payment_method {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(140, 90, 245, 0.5);
    border-radius: 17px;
  }

  .payment_method_icon {
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 40px; 
    height: 40px; 
    color: white; 
    background: var(--accent-gradient); 
    border-radius: 10px;
  }

  .payment_method div {
    display: flex; 
    flex: 1; 
    flex-direction: column; 
    gap: 0.1rem;
  }
  
  .payment_method strong {font-size: 1rem;}

  .payment_method div span, .payment_selected {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .payment_selected {
    color: var(--success-color);
    font-weight: 750;
  }

  .payment_row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .payment_form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .payment_form .form_group {margin-bottom: 0;}

  .payment_summary {text-align: left;}

  .payment_summary > p {
    margin-top: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .payment_summary .secondary_action {margin-top: 0.75rem;}

  .receipt_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 720px;
    padding: 2rem 2rem;
    margin: 0 auto;
    text-align: center;
  }

  .receipt_success_icon {
    display: flex;
    align-items: center; 
    justify-content: center; 
    width: 60px; 
    height: 60px;
    margin-bottom: 1.25rem;
    color: white;
    background: rgba(15, 185, 130, 0.25);
    border: 1px solid rgba(15, 185, 130, 0.5);
    border-radius: 50%;
    font-size: 1.75rem;
  }

  .receipt_content h3 {
    margin: 0.5rem 0 0.75rem;
    font-size: clamp(1.5rem, 3vw, 1.5rem);
  }

  .receipt_card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 125px; 
    width: 100%;
    margin-top: 2rem;
    overflow: hidden; 
    text-align: left; 
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 25px;
  }

  .receipt_header {
    grid-column: 1 / -1; display: flex;
    justify-content: space-between; gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid var(--border-color);
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
    
  .receipt_header strong {color: var(--secondary-accent-color);}

  .receipt_body {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .receipt_body div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .receipt_body span {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }
  
  .receipt_body strong {
    font-size: 0.75rem;
    line-height: 1.25;
  }

  .qr_placeholder {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.1rem;
    align-self: center;
    width: 5rem;
    aspect-ratio: 1;
    margin: 1rem 1rem 1rem 1rem;
    padding: 0.75rem;
    background: white;
  }
  
  .qr_placeholder span {background: white;}
  
  .qr_placeholder .filled_cell {background: var(--primary-background-color);}

  .receipt_close_button {max-width: 250px;}

  .payment_error {
    margin-top: 1rem;
    padding: 1rem 1rem;
    color: var(--error-color);
    background: rgba(240, 70, 70, 0.1);
    border: 1px solid rgba(240, 70, 70, 0.25);
    border-radius: 10px;
    font-size: 0.75rem;
  }

  @media (max-width: 720px) {
    .purchase_content, .payment_content {grid-template-columns: 1fr;}

    .purchase_summary {
      position: static;
      order: -1;
    }

    .payment_summary {order: 0;}
  }

  @media (max-width: 600px) {
    .purchase_modal_overlay {
      align-items: flex-start;
      padding: 0;
    }

    .purchase_modal {
      min-height: 100%;
      max-height: none;
      border-radius: 0;
    }

    .modal_header,
    .purchase_content,
    .payment_content {
      padding-right: 1.25rem;
      padding-left: 1.25rem;}

    .purchase_steps {
      gap: 0.8rem;
      padding-right: 1.25rem;
      padding-left: 1.25rem;
      font-size: 0.75rem;
    }

    .event_overview {
      grid-template-columns: 100px minmax(0, 1fr);}

    .event_overview img {
      width: 120px;
      height: 90px;
    }

    .quantity_section {
      align-items: flex-start;
      flex-direction: column;
    }

    .receipt_card {grid-template-columns: 1fr;}
    
    .qr_placeholder {margin: 0 1.25rem 1.25rem;}
  }

  @keyframes fade_in {from {opacity: 0;} to {opacity: 1;}}

  @keyframes modal_up {
    from {
      opacity: 0;
      transform: translateY(16px) scale(1);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>

<script lang="ts">
  import type {Event as PasslyEvent, EventFunction, TicketCategory} from "#lib/data/events.ts";
  import {apply_expiry_mask, complete_expiry_on_blur} from "#lib/utils/date_mask.ts";
  import {process_purchase} from "#lib/api/passly_api.ts";
  import type {PurchaseResult} from "#lib/api/passly_api.ts";
  import {auth} from "#lib/state/auth.svelte.ts";
  import {goto} from "$app/navigation";
  import {onMount} from "svelte";

  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      }
    };
  }

  let {event_item, onclose}: {
    event_item: PasslyEvent;
    onclose: () => void;
  } = $props();

  type PurchaseStep = "selection" | "payment" | "receipt";

  let current_step = $state<PurchaseStep>("selection");
  let selected_function_id = $state<number | null>(null);
  let selected_category_id = $state<string | null>(null);
  let ticket_quantity = $state(1);
  let card_holder = $state("");
  let card_number = $state("");
  let card_expiry = $state("");
  let card_cvv = $state("");
  let payment_error = $state("");
  let is_processing_payment = $state(false);
  let purchase_result = $state<PurchaseResult | null>(null);
  let previous_focus: HTMLElement | null = null;

  onMount(() => {
    previous_focus = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    if (!auth.is_authenticated) {
      onclose();
      goto("/login");
      return;
    }
    const modal = document.querySelector(".purchase_modal") as HTMLElement;
    if (modal)  modal.focus();
    return () => {
      document.body.style.overflow = "";
      if (previous_focus) previous_focus.focus();
    };
  });

  let event_functions = $derived.by((): EventFunction[] => {
    if (event_item.functions && event_item.functions.length > 0) return event_item.functions;
    return [{
      id: event_item.id,
      date: event_item.date,
      time: event_item.time,
      available_tickets: event_item.tickets,
      status: event_item.status
    }];
  });

  let ticket_categories = $derived.by((): TicketCategory[] => {
    if (event_item.ticket_categories && event_item.ticket_categories.length > 0) {
      return event_item.ticket_categories;
    }
    return [{
      id: "general",
      name: event_item.category,
      price: event_item.price,
      available_tickets: event_item.tickets,
      purchase_limit: 5,
      description: "Categoría general"
    }];
  });
  let selected_function = $derived(
    event_functions.find(
      (function_item) => function_item.id === selected_function_id
    ) ?? event_functions[0]
  );
  let selected_category = $derived(
    ticket_categories.find(
      (category_item) => category_item.id === selected_category_id
    ) ?? ticket_categories[0]
  );
  let total_price = $derived(selected_category.price * ticket_quantity);

  $effect(() => {
    if (selected_function_id === null) selected_function_id = event_item.functions?.[0]?.id ?? event_item.id;
    if (selected_category_id === null) selected_category_id = event_item.ticket_categories?.[0]?.id ?? "general";
  });

  function select_ticket_category(category_id: string) {
    selected_category_id = category_id;
    const category_item = ticket_categories.find((item) => item.id === category_id);
    if (category_item && ticket_quantity > category_item.purchase_limit) ticket_quantity = category_item.purchase_limit;
  }

  function decrease_ticket_quantity() {
    if (ticket_quantity > 1) ticket_quantity -= 1;
  }

  function increase_ticket_quantity() {
    if (ticket_quantity < selected_category.purchase_limit) ticket_quantity += 1;
  }

  function handle_expiry_blur() {card_expiry = complete_expiry_on_blur(card_expiry);}

  function handle_expiry_input(event: Event) {
    const target = event.target as HTMLInputElement;
    const input_event = event as InputEvent;
    const is_deleting = input_event.inputType === "deleteContentBackward";
    const raw_value = target.value.replace(/\D/g, "");
    const masked_value = apply_expiry_mask(raw_value, is_deleting);
    target.value = masked_value;
    card_expiry = masked_value;
  }

  async function confirm_payment() {
    payment_error = "";
    if (!card_holder.trim()) {
      payment_error = "Ingrese el nombre del titular de la tarjeta.";
      return;
    }
    const normalized_card_number = card_number.replace(/\s/g, "");
    if (!/^\d{16}$/.test(normalized_card_number)) {
      payment_error = "Ingrese un número de tarjeta válido.";
      return;
    }
    if (!/^\d{3,4}$/.test(card_cvv)) {
      payment_error = "Ingrese un código de seguridad válido.";
      return;
    }
    if (!auth.user) {
      payment_error = "Debés iniciar sesión para comprar entradas.";
      return;
    }
    is_processing_payment = true;
    const result = await process_purchase({
      ticket_id: selected_category.id ? Number(selected_category.id) : event_item.id,
      usuario_id: auth.user.id,
      fecha: new Date().toISOString().split("T")[0],
    });
    is_processing_payment = false;
    if (typeof result === "string") payment_error = result;
    else {
      purchase_result = result;
      current_step = "receipt";
    }
  }

  function handle_keydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onclose();
      return;
    }
    if (event.key === "Tab") {
      const modal = document.querySelector(".purchase_modal_overlay") as HTMLElement;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      }
    }
  }

  function handle_overlay_click(event: MouseEvent) {if (event.target === event.currentTarget) onclose();}

  /*
    TODO (integración TypeScript y backend AE2):
    1. Al abrir, solicitar el detalle vigente del evento y sus funciones/categorías con GET /eventos/{id}; no confiar en el stock renderizado en la tarjeta.
    2. Antes de mostrar el pago, iniciar una reserva temporal o la cola del evento. El backend aún no expone este endpoint; cuando exista, debe devolver posición/tiempo de espera, expiración de la reserva y stock válido.
    3. Agregar un idempotency_key por sesión a POST /compras/ para evitar duplicados ante reintentos.
    4. Los errores del backend (stock insuficiente, límite por comprador, etc.) ya se muestran en payment_error. Pendiente: manejar timeout y reserva vencida.
    5. El comprobante aún muestra datos de maqueta. Usar purchase_result (ya disponible) para mostrar compra_id, total_abonado y la URL del QR devuelta por el backend.
    6. El chequeo de sesión actual es solo frontend: el backend debe validar identidad y rol de forma independiente, sin confiar en el estado del cliente.
  */
</script>