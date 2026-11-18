<section class = "editor_panel" aria-labelledby = "editor_title">
  <header class = "editor_header">
    <div>
      <span
        class = "editor_eyebrow">{editor_mode === "create" ? "Nuevo registro" : "Evento seleccionado"}
      </span>
      <h2
        id = "editor_title">{editor_mode === "create" ? "Crear un nuevo evento" : event_item?.name}
      </h2>
      <p>
        {editor_mode === "create" ? "Complete la información, las funciones y las reglas de venta." : "Edite la información publicada y la configuración de venta."}
      </p>
    </div>
    {#if editor_mode === "edit"}
      <div class = "editor_actions">
        <button
          type = "button" class = "text_action danger_action" onclick = {on_cancel}>Cancelar evento
        </button>
        <button
          type = "button"
          class = "icon_action"
          aria-label = "Retirar evento de la venta"
          title = "Retirar de la venta"
          onclick = {on_archive}
        >
          <svg
            viewBox = "0 0 25 25"
            width = "20"
            height = "20"
            fill = "none"
            stroke = "currentColor"
            stroke-width = "2"
            stroke-linecap = "round"
            stroke-linejoin = "round"
          >
            <path d = "M3 6h18"></path>
            <path d = "M8 6V4h8v2"></path>
            <path d = "M6 6l1 14h10l1-14"></path>
          </svg>
        </button>
      </div>
    {/if}
  </header>
  <nav class = "editor_tabs" aria-label = "Secciones del editor">
    <button
      type = "button"
      class:active_tab = {active_section === "basic"}
      onclick = {() => on_section_change("basic")}
    >Información</button>
    <button
      type = "button"
      class:active_tab = {active_section === "functions"}
      onclick = {() => on_section_change("functions")}
    >Funciones y categorías</button>
    <button
      type = "button"
      class:active_tab = {active_section === "sales"}
      onclick = {() => on_section_change("sales")}
    >Venta y cola</button>
  </nav>
  <div class = "editor_content">
    {#if active_section === "basic"}
      <div class = "form_intro">
        <span class = "form_step">01</span>
        <div>
          <h3>Información del evento</h3>
          <p>Estos campos formarán la ficha pública que verán los compradores.</p>
        </div>
      </div>
      <div class = "form_grid">
        <label class = "form_group full_width">
          <span class = "form_label">Título del evento</span>
          <input
            class = "input_field"
            type = "text"
            bind:value={form_name}
            class:error = {form_errors.some(error => error.includes("nombre"))}
            aria-invalid = {form_errors.some(error => error.includes("nombre"))}
            placeholder = "Ejemplo: Festival de música al aire libre"
          />
          {#if form_errors.some(error => error.includes("nombre"))}
            <small class="field_error">{form_errors.find(error => error.includes("nombre"))}</small>
          {/if}
        </label>
        <label class = "form_group full_width">
          <span class = "form_label">Descripción</span>
          <textarea
            class = "input_field description_input"
            rows = "4"
            placeholder = "Cuente en qué consiste el evento, para quién es y qué incluye."
          bind:value={form_description}
            class:error = {form_errors.some(error => error.includes("descripción"))}
            aria-invalid = {form_errors.some(error => error.includes("descripción"))}
          ></textarea>
          {#if form_errors.some(error => error.includes("descripción"))}
            <small class="field_error">{form_errors.find(error => error.includes("descripción"))}</small>
          {/if}
        </label>
        <label class = "form_group">
          <span class = "form_label">Categoría</span>
          <select class = "input_field" bind:value={form_category}>
            <option>Conciertos</option>
            <option>Teatro</option>
            <option>Deportes</option>
            <option>Festivales</option>
            <option>Arte</option>
            <option>Otro</option>
          </select>
        </label>
        <label class = "form_group">
          <span class = "form_label">Lugar</span>
          <input
            class = "input_field"
            type = "text"
            bind:value={form_site}
            class:error = {form_errors.some(error => error.includes("lugar"))}
            aria-invalid = {form_errors.some(error => error.includes("lugar"))}
            placeholder = "Ejemplo: Estadio o sala"
          />
          {#if form_errors.some(error => error.includes("lugar"))}
            <small class="field_error">{form_errors.find(error => error.includes("lugar"))}</small>
          {/if}
        </label>
        <label class = "form_group">
          <span class = "form_label">Estado</span>
          <select class = "input_field" bind:value={form_status}>
            <option>Disponible</option>
            <option>Agotado</option>
            <option>Postergado</option>
            <option>Cancelado</option>
          </select>
        </label>
        <label class = "form_group">
          <span class = "form_label">Visibilidad</span>
          <select class = "input_field" bind:value={form_visibility}>
            <option>Público</option><option>Privado</option><option>Archivado</option>
          </select>
        </label>
      </div>
      <div class = "image_upload_area">
        {#if event_item?.image}
          <img src = {event_item.image} alt = "Vista previa del evento"/>
        {:else}
          <div class = "image_placeholder" aria-hidden = "true">▧</div>
        {/if}
        <div>
          <strong>Imagen de portada</strong>
          <p>Use una imagen horizontal, clara y representativa del evento.</p>
          <label class = "file_button">
            Reemplazar imagen
            <input type = "file" accept = "image/png,image/jpeg,image/webp"/>
          </label>
        </div>
      </div>
    {:else if active_section === "functions"}
      <div class = "form_intro">
        <span class = "form_step">02</span>
        <div>
          <h3>Funciones y categorías</h3>
          <p>Configure cada fecha disponible y el inventario de entradas que se venderá.</p>
        </div>
      </div>
      <section class = "management_section" aria-labelledby = "functions_title">
        <div class = "management_header">
          <div>
            <h4 id = "functions_title">Funciones</h4>
            <p>Fecha, horario, capacidad y estado por función.</p>
          </div>
          <button
            type = "button" class = "outline_button" onclick = {on_show_preview} disabled = {is_saving}>+ Agregar función
          </button>
        </div>
        <div class = "function_table" role = "region" aria-label = "Funciones configuradas">
          <div class = "function_table_header">
            <span>Fecha</span>
            <span>Horario</span>
            <span>Capacidad</span>
            <span>Disponibles</span>
            <span>Estado</span>
          </div>
          {#each display_functions as function_item}
            <div class = "function_table_row">
              <input
                class = "compact_input" value = {function_item.date} aria-label = "Fecha de función"
              />
              <input
                class = "compact_input" value = {function_item.time} aria-label = "Horario de función"
              />
              <input
                class = "compact_input"
                type = "number"
                value = {function_item.available_tickets}
                aria-label = "Capacidad máxima"
              />
              <span class = "availability_value">
                {function_item.available_tickets.toLocaleString("es-AR")}
              </span>
              <select
                class = "compact_input" value = {function_item.status} aria-label = "Estado de función"
              >
                <option>Disponible</option><option>Postergado</option><option>Cancelado</option>
              </select>
            </div>
          {/each}
        </div>
      </section>
      <section class = "management_section" aria-labelledby = "categories_title">
        <div class = "management_header">
          <div>
            <h4 id = "categories_title">Categorías de entrada</h4>
            <p>Defina precios, stock, límites y condiciones por categoría.</p>
          </div>
          <button type = "button" class = "outline_button" onclick = {on_show_preview} disabled = {is_saving}>
            + Agregar categoría
          </button>
        </div>
        <div class = "category_editor_grid">
          {#each display_categories as category_item}
            <article class = "category_editor_card">
              <div class = "category_editor_header">
                <strong>{category_item.name}</strong>
                <span>{category_item.available_tickets.toLocaleString("es-AR")} disponibles</span>
              </div>
              <div class = "category_fields">
                <label>
                  <span>Nombre</span><input class = "compact_input" value = {category_item.name}/>
                </label>
                <label>
                  <span>Precio</span>
                  <input class = "compact_input" type = "number" value = {category_item.price}/>
                </label>
                <label>
                  <span>Stock</span>
                  <input
                    class = "compact_input"
                    type = "number"
                    value = {category_item.available_tickets}
                  />
                </label>
                <label>
                  <span>Límite por compra</span>
                  <input class = "compact_input" type = "number" value = {category_item.purchase_limit}/>
                </label>
                <label class = "full_category_field">
                  <span>Restricciones del comprador</span>
                  <input
                    class = "compact_input"
                    value = {category_item.buyer_restrictions ?? "Sin restricciones adicionales"}
                  />
                </label>
              </div>
            </article>
          {/each}
        </div>
      </section>
    {:else}
      <div class = "form_intro">
        <span class = "form_step">03</span>
        <div>
          <h3>Venta, reserva y cola</h3>
          <p>Defina cuándo se puede comprar y cómo se protege el inventario ante alta demanda.</p>
        </div>
      </div>
      <div class = "sales_grid">
        <section class = "sales_card">
          <h4>Ventana de venta</h4>
          <p>Las entradas solo se podrán solicitar dentro de este período.</p>
          <label class = "form_group">
            <span class = "form_label">Inicio de venta</span>
            <input class = "input_field" type = "text" value = {sale_configuration.sale_start_date}/>
          </label>
          <label class = "form_group">
            <span class = "form_label">Fin de venta</span>
            <input class = "input_field" type = "text" value = {sale_configuration.sale_end_date}/>
          </label>
        </section>
        <section class = "sales_card">
          <h4>Límites y reservas</h4>
          <p>Reglas que el backend deberá validar para cada intento de compra.</p>
          <label class = "form_group">
            <span class = "form_label">Máximo de entradas por operación</span>
            <input class = "input_field" type = "number" value = {sale_configuration.purchase_limit}/>
          </label>
          <label class = "form_group">
            <span class = "form_label">Minutos de reserva temporal</span>
            <input
              class = "input_field" type = "number" value = {sale_configuration.reservation_minutes}
            />
          </label>
        </section>
        <section class = "sales_card queue_card">
          <div class = "queue_heading"><div>
            <h4>Cola virtual</h4>
            <p>Actívela para ordenar el acceso cuando haya alta concurrencia.</p>
          </div>
          <label class = "switch_control">
            <input type = "checkbox" checked = {sale_configuration.queue_enabled}/>
            <span></span>
          </label>
        </div>
          <div class = "queue_fields">
            <label class = "form_group">
              <span class = "form_label">Capacidad de la cola</span>
              <input class = "input_field" type = "number" value = {sale_configuration.queue_capacity}/>
            </label>
            <label class = "form_group">
              <span class = "form_label">Solicitudes simultáneas</span>
              <input
                class = "input_field" type = "number" value = {sale_configuration.concurrent_requests}
              />
            </label>
          </div>
        </section>
      </div>
    {/if}
  </div>
  <footer class = "editor_footer">
    <div>
      <button type = "button" class = "outline_button" onclick = {on_show_preview} disabled = {is_saving}>
        Guardar borrador
      </button>
      <button
        type = "button"
        class = "save_button"
        onclick = {handle_publish}
        disabled = {is_saving}
      >{#if is_saving}Guardando...{:else}{editor_mode === "create" ? "Crear y publicar" : "Guardar cambios"}{/if}</button>
    </div>
    {#if submit_error}
      <p class = "submit_error" role = "alert">{submit_error}</p>
    {/if}
  </footer>
</section>

<style>
  .editor_panel {
    min-width: 0;
    overflow: hidden;
    background: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 25px;
  }

  .editor_header {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.5rem 1.5rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .editor_eyebrow {
    display: block;
    color: var(--secondary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .editor_header h2 {
    margin-top: 0.25rem;
    font-size: 1.5rem;
  }

  .editor_header p {
    margin-top: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .editor_actions {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .text_action, .icon_action {
    color: var(--secondary-text-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    transition: all var(--fast-transition);
  }

  .text_action {
    display: inline-flex;
    align-items: center;
    height: 35px;
    padding: 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 750;
  }

  .icon_action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
  }

  .danger_action:hover,
  .icon_action:hover {
    color: var(--error-color);
    border-color: rgba(240, 70, 70, 0.5);
    background: rgba(240, 70, 70, 0.1);
  }

  .editor_tabs {
    display: flex;
    overflow-x: auto;
    padding: 0 1.75rem;
    border-bottom: 1px solid var(--border-color);
  }

  .editor_tabs button {
    position: relative;
    flex: none;
    padding: 1rem 1rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    font-weight: 750;
  }

  .editor_tabs button:first-child {padding-left: 0;}
  .editor_tabs button:hover,
  .editor_tabs .active_tab {color: var(--primary-text-color);}
  .editor_tabs .active_tab::after {
    content: "";
    position: absolute;
    right: 0.5rem;
    bottom: 0;
    left: 0.5rem;
    height: 2px;
    background: var(--accent-gradient);
  }

  .editor_tabs button:first-child.active_tab::after {left: 0;}
  .editor_content {padding: 1.75rem;}
  .form_intro {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .form_step {
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

  .form_intro h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .form_intro p {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .form_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 1rem;
  }

  .full_width {grid-column: 1 / -1;}
  .description_input {
    resize: vertical;
    min-height: 100px;
  }

  .image_upload_area {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-top: 0.25rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px dashed rgba(255, 255, 255, 0.25);
    border-radius: 15px;
  }

  .image_upload_area img,
  .image_placeholder {
    width: 100px;
    height: 75px;
    object-fit: cover;
    border-radius: 10px;
  }

  .image_placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
    background: rgba(255, 255, 255, 0.05);
    font-size: 1.5rem;
  }

  .image_upload_area div:not(.image_placeholder) {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.25rem;
  }

  .image_upload_area strong {font-size: 0.75rem;}
  .image_upload_area p {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .file_button,
  .outline_button,
  .save_button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 750;
    transition: all var(--fast-transition);
  }

  .file_button {
    padding: 0.5rem 0.75rem;
    margin-top: 0.25rem;
    color: var(--secondary-accent-color);
    background: rgba(60, 130, 245, 0.1);
    cursor: pointer;
  }

  .file_button:hover {
    background: rgba(60, 130, 245, 0.25);
    color: white;
  }

  .file_button input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .management_section + .management_section {margin-top: 2rem;}
  .management_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .management_header h4,
  .sales_card h4 {font-size: 1rem;}

  .management_header p,
  .sales_card > p {
    margin-top: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .outline_button {
    padding: 0.5rem 0.75rem;
    color: var(--secondary-text-color);
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--border-color);
    white-space: nowrap;
  }

  .outline_button:hover {
    color: var(--primary-text-color);
    border-color: rgba(140, 90, 245, 0.5);
    background: rgba(140, 90, 245, 0.1);
  }

  .function_table {
    overflow-x: auto;
    border: 1px solid var(--border-color);
    border-radius: 15px;
  }

  .function_table_header,
  .function_table_row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    min-width: 650px;
    gap: 0.75rem;
    align-items: center;
    padding: 0.75rem 0.75rem;
  }

  .function_table_header {
    color: var(--secondary-text-color);
    background: rgba(255, 255, 255, 0.025);
    border-bottom: 1px solid var(--border-color);
    font-size: 0.75rem;
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .function_table_row + .function_table_row {border-top: 1px solid rgba(255, 255, 255, 0.05);}
  .compact_input {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.5rem;
    color: var(--primary-text-color);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    font-family: var(--sans-font);
    font-size: 0.75rem;
    color-scheme: dark;
  }

  .compact_input:focus {
    outline: none;
    border-color: var(--primary-accent-color);
    box-shadow: 0 0 0 4px rgba(140, 90, 245, 0.25);
  }

  .availability_value {
    color: var(--secondary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
  }

  .category_editor_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .category_editor_card {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--border-color);
    border-radius: 15px;
  }

  .category_editor_header {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color);
  }

  .category_editor_header strong {font-size: 1rem;}
  .category_editor_header span {
    color: var(--success-color);
    font-size: 0.75rem;
  }

  .category_fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .category_fields label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .full_category_field {grid-column: 1 / -1;}
  .sales_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .sales_card {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--border-color);
    border-radius: 15px;
  }
  
  .sales_card > p {
    min-height: 2em;
    margin-bottom: 1rem;
  }

  .sales_card .form_group {margin-bottom: 1rem;}

  .sales_card .form_group:last-child {margin-bottom: 0;}

  .queue_card {grid-column: 1 / -1;}

  .queue_heading {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .queue_heading h4 {font-size: 1rem;}

  .queue_heading p {
    margin-top: 0.25rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .switch_control {
    position: relative;
    display: inline-block;
    flex: none;
    width: 40px;
    height: 20px;
    cursor: pointer;
  }

  .switch_control input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch_control span {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    transition: all var(--fast-transition);
  }

  .switch_control span::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 22px;
    background: white;
    border-radius: 50%;
    transition: all var(--fast-transition);
  }

  .switch_control input:checked + span {background: var(--primary-accent-color);}

  .switch_control input:checked + span::after {transform: translateX(18px);}

  .queue_fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .editor_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.75rem;
    border-top: 1px solid var(--border-color);
    background: rgba(0, 0, 0, 0.1);
  }

  .editor_footer > div {
    display: flex;
    flex: none;
    gap: 0.5rem;
  }

  .save_button {
    padding: 0.75rem 0.75rem;
    color: white;
    background: var(--accent-gradient);
    box-shadow: 0 4px 12px rgba(140, 90, 245, 0.25);
  }

  .save_button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(140, 90, 245, 0.5);
  }

  @media (max-width: 720px) {
    .editor_header,
    .editor_footer {
      align-items: flex-start;
      flex-direction: column;
    }

    .editor_actions {width: 100%;}

    .text_action {flex: 1;}

    .form_grid, .sales_grid, .queue_fields {grid-template-columns: 1fr;}

    .queue_card {grid-column: auto;}

    .editor_footer > div {width: 100%;}

    .editor_footer > div > button {flex: 1;}
  }
  @media (max-width: 480px) {
    .editor_header, .editor_content, .editor_footer {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .editor_tabs {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .image_upload_area {
      align-items: flex-start;
      flex-direction: column;
    }

    .category_fields {grid-template-columns: 1fr;}

    .full_category_field {grid-column: auto;}
  }
  .field_error {
    display: block;
    margin-top: 0.25rem;
    color: var(--error-color);
    font-size: 0.75rem;
  }

  .submit_error {
    margin-top: 0.75rem;
    color: var(--error-color);
    font-size: 0.75rem;
  }
</style>

<script lang="ts">
  import type {Event as PasslyEvent} from "#lib/data/events.ts";
  import {create_event, type EventoCreatePayload} from "#lib/api/passly_api.ts";

  type EditorSection = "basic" | "functions" | "sales";

  type EventFunction = {
    id: number;
    date: string;
    time: string;
    available_tickets: number;
    status: string;
  };

  type TicketCategory = {
    id: string;
    name: string;
    price: number;
    available_tickets: number;
    purchase_limit: number;
    description?: string;
    buyer_restrictions?: string;
  };

  type SaleConfiguration = {
    sale_start_date: string;
    sale_end_date: string;
    purchase_limit: number;
    reservation_minutes: number;
    queue_enabled: boolean;
    queue_capacity: number;
    concurrent_requests: number;
  };

  let {
    event_item = null,
    editor_mode,
    active_section,
    on_section_change,
    on_cancel,
    on_archive,
    on_show_preview,
    on_publish
  }: {
    event_item?: PasslyEvent | null;
    editor_mode: "create" | "edit";
    active_section: EditorSection;
    on_section_change: (section: EditorSection) => void;
    on_cancel: () => void;
    on_archive: () => void;
    on_show_preview: () => void;
    on_publish: (event_id: number) => void | Promise<void>;
  } = $props();

  let form_name = $state("");
  let form_description = $state("");
  let form_category = $state("Conciertos");
  let form_site = $state("");
  let form_status = $state("Disponible");
  let form_visibility = $state("Público");
  let form_errors = $state<string[]>([]);
  let submit_error = $state("");
  let is_saving = $state(false);

  $effect(() => {
    form_name = event_item?.name ?? "";
    form_description = event_item?.description ?? "";
    form_category = event_item?.category ?? "Conciertos";
    form_site = event_item?.site ?? "";
    form_status = event_item?.status ?? "Disponible";
    form_visibility = event_item?.visibility ?? "Público";
    form_errors = [];
    submit_error = "";
    is_saving = false;
  });

  let display_functions = $derived.by((): EventFunction[] => {
    if (event_item?.functions && event_item.functions.length > 0) return event_item.functions;
    if (event_item) {
      return [
        {
          id: event_item.id,
          date: event_item.date,
          time: event_item.time,
          available_tickets: event_item.tickets,
          status: event_item.status
        }
      ];
    }
    return [
      {
        id: 0,
        date: "DD/MM/AAAA",
        time: "HH:MM - HH:MM",
        available_tickets: 0,
        status: "Disponible"
      }
    ];
  });

  let display_categories = $derived.by((): TicketCategory[] => {
    if (event_item?.ticket_categories && event_item.ticket_categories.length > 0) {
      return event_item.ticket_categories;
    }
    if (event_item) {
      return [
        {
          id: "general",
          name: event_item.category,
          price: event_item.price,
          available_tickets: event_item.tickets,
          purchase_limit: 5,
          description: "Categoría general"
        }
      ];
    }
    return [
      {
        id: "general",
        name: "General",
        price: 0,
        available_tickets: 0,
        purchase_limit: 5,
        description: "Categoría inicial"
      }
    ];
  });

  let sale_configuration = $derived.by(
    (): SaleConfiguration =>
      event_item?.sale_configuration ?? {
        sale_start_date: "DD/MM/AAAA HH:MM",
        sale_end_date: "DD/MM/AAAA HH:MM",
        purchase_limit: 5,
        reservation_minutes: 10,
        queue_enabled: false,
        queue_capacity: 0,
        concurrent_requests: 25
      }
  );

  function validate_form() {
    form_errors = [];
    if (!form_name.trim()) form_errors.push("El nombre del evento es obligatorio.");
    if (!form_description.trim()) form_errors.push("La descripción del evento es obligatoria.");
    if (!form_site.trim()) form_errors.push("El lugar del evento es obligatorio.");
    return form_errors.length === 0;
  }

  async function handle_publish() {
    if (is_saving) return;
    submit_error = "";
    if (!validate_form()) return;
    if (editor_mode !== "create") {
      submit_error = "La edición de eventos todavía no está disponible en el backend.";
      return;
    }
    is_saving = true;
    const payload: EventoCreatePayload = {
      nombre: form_name,
      descripcion: form_description,
      lugar: form_site,
      capacidad_maxima: display_functions[0]?.available_tickets ?? 0,
      precio_base: display_categories[0]?.price ?? 0,
      moneda: "ARS",
      estado: form_status,
      imagen: event_item?.image ?? "",
    };
    const created_event = await create_event(payload);
    if (created_event === null) {
      submit_error = "No se pudo crear el evento. Verifique los datos y que el backend esté activo.";
    }
    is_saving = false;
    if (created_event !== null) await on_publish(created_event.id);
  }
</script>