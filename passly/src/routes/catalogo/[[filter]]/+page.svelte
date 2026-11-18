<svelte:head>
  <title>Passly | Catálogo</title>
</svelte:head>

<div class = "catalog_container container">
  <div class = "catalog_header">
    <h1 class = "catalog_title">Catálogo de eventos</h1>
    {#if search_query}
      <p class = "search_results_text">Resultados para: <strong>{search_query}</strong></p>
    {/if}
  </div>
  <div class = "catalog_layout">
    <aside class = "filters_sidebar">
      <div class = "filter_group">
        <h3>Categoría</h3>
        <select bind:value={selected_category} class = "filter_select">
          {#each categories as cat}
            <option value = {cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div class = "filter_group">
        <h3>Lugar</h3>
        <select bind:value={selected_site} class = "filter_select">
          {#each sites as site}
            <option value = {site}>{site}</option>
          {/each}
        </select>
      </div>
      <div class = "filter_group">
        <h3>Estado</h3>
        <select bind:value={selected_status} class = "filter_select">
          {#each statuses as status}
            <option value = {status}>{status}</option>
          {/each}
        </select>
      </div>
      <div class = "filter_group">
        <h3>Rango de precios</h3>
        <div class = "range_inputs">
          <input
            type = "text"
            value={format_price(minimum_price)}
            oninput={(event) => handle_price_input(event, true)}
            placeholder = "Desde"
            class = "filter_number"
          />
          <input
            type = "text"
            value={format_price(maximum_price)}
            oninput={(event) => handle_price_input(event, false)}
            placeholder = "Hasta"
            class = "filter_number"
          />
        </div>
      </div>
      <div class = "filter_group">
        <h3>Rango de fechas</h3>
        <div class = "range_inputs">
          <div class = "date_input_wrapper" style = "flex: 1;">
            <input
              type = "text" bind:this = {minimum_date_input}
              oninput = {handle_date_input}
              placeholder = "Desde"
              class = "filter_date"
            >
            <button
              type = "button"
              class = "calendar_icon_btn"
              aria-label = "Abrir calendario"
              onclick = {open_minimum_calendar}>
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
                <rect x = "3" y = "4" width = "18" height = "18" rx = "2" ry = "2"></rect>
                <line x1 = "16" y1 = "2" x2 = "16" y2 = "6"></line>
                <line x1 = "8" y1 = "2" x2 = "8" y2 = "6"></line>
                <line x1 = "3" y1 = "10" x2 = "21" y2 = "10"></line>
              </svg>
            </button>
          </div>
          <div class = "date_input_wrapper" style="flex: 1;">
            <input
              type = "text"
              bind:this = {maximum_date_input}
              oninput={handle_date_input}
              placeholder = "Hasta"
              class = "filter_date"
            />
            <button
              type = "button"
              class = "calendar_icon_btn"
              aria-label = "Abrir calendario"
              onclick = {open_maximum_calendar}>
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
                <rect x = "3" y = "4" width = "18" height = "18" rx = "2" ry = "2"></rect>
                <line x1 = "16" y1 = "2" x2 = "16" y2 = "6"></line>
                <line x1 = "8" y1 = "2" x2 = "8" y2 = "6"></line>
                <line x1 = "3" y1 = "10" x2 = "21" y2 = "10"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class = "filter_group">
        <h3>Rango de Horarios</h3>
        <div class = "range_inputs">
          <input
            type = "text"
            value = {minimum_time}
            oninput = {(event) => handle_time_input(event, true)}
            placeholder = "Desde"
            class = "filter_time"
          />
          <input
            type = "text"
            value = {maximum_time}
            oninput = {(event) => handle_time_input(event, false)}
            placeholder = "Hasta"
            class = "filter_time"
          />
        </div>
      </div>
      <div class = "filter_group">
        <h3>Ordenar por</h3>
        <div class = "sort_controls">
          <select bind:value={sort_by} class = "filter_select">
            <option value = "nombre">Nombre</option>
            <option value = "fecha">Fecha</option>
            <option value = "precio">Precio</option>
            <option value = "recientes">Últimos añadidos</option>
            <option value = "ventas">Más vendidos</option>
          </select>
          <button
            class = "sort_button"
            onclick = {toggle_sort}
            aria-label = "Invertir orden"
            title = "Invertir orden"
          >
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
              {#if sort_descending}
                <path d = "M12 5v14M19 12l-7 7-7-7"/>
              {:else}
                <path d = "M12 19V5M5 12l7-7 7 7"/>
              {/if}
            </svg>
          </button>
        </div>
      </div>
    </aside>
    <main class = "catalog_results">
      <EventGrid title = "Resultados ({filtered_events.length})" events = {filtered_events}/>
    </main>
  </div>
</div>

<ScrollToTopButton/>

<style>
  .catalog_container {
    padding-top: 120px;
    padding-bottom: 4rem;
    min-height: 100vh;
  }

  .catalog_header {margin-bottom: 1.5rem;}

  .catalog_title {
    font-size: 2.5rem;
    color: var(--primary-text-color);
  }

  .search_results_text {
    color: var(--secondary-text-color);
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }
  
  .search_results_text strong {color: var(--secondary-accent-color);}

  .catalog_layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
  }

  .filters_sidebar {
    background: var(--secondary-background-color);
    border: 1px solid var(--transparent-border);
    border-radius: 15px;
    padding: 1.5rem;
    height: fit-content;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }
  
  .filters_sidebar::-webkit-scrollbar {width: 6px;}

  .filters_sidebar::-webkit-scrollbar-thumb {
    background: var(--transparent-border);
    border-radius: 10px;
  }
  .filters_sidebar::-webkit-scrollbar-thumb:hover {background: var(--primary-accent-color);}

  .filter_group {margin-bottom: 1.5rem;}

  .filter_group:last-child {margin-bottom: 0;}

  .filter_group h3 {
    font-size: 0.9rem;
    color: var(--primary-text-color);
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .filter_select, .filter_number, .filter_date, .filter_time {
    width: 100%;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--transparent-border);
    border-radius: 8px;
    color: var(--primary-text-color);
    outline: none;
    transition: all var(--fast-transition);
  }
  
  .filter_date {padding-right: 2.5rem !important;}

  .filter_select:focus,
  .filter_number:focus,
  .filter_date:focus,
  .filter_time:focus {border-color: var(--primary-accent-color);}
  
  .filter_select option {
    background: var(--primary-background-color);
    color: var(--primary-text-color);
  }

  .range_inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter_number {
    flex: 1;
    min-width: 0;
  }
  
  .calendar_icon_btn {
    border-radius: 8px;
  }

  .sort_controls {
    display: flex;
    gap: 0.5rem;
  }

  .sort_button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--transparent-border);
    border-radius: 8px;
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;
    cursor: pointer;
    transition: all var(--fast-transition);
  }

  .sort_button:hover {
    background: var(--primary-accent-color);
    border-color: var(--primary-accent-color);
    color: white;
  }

  @media (max-width: 900px) {
    .catalog_layout {grid-template-columns: 1fr;}
    
    .filters_sidebar {
      position: static;
      max-height: none;
    }
  }
</style>

<script lang="ts">
  import {page} from "$app/state";
  import {all_events, type Event as PasslyEvent} from "#lib/data/events.ts";
  import {fetch_events} from "#lib/api/passly_api.ts";
  import EventGrid from "#lib/components/event_grid.svelte";
  import ScrollToTopButton from "#lib/components/scroll_to_top_button.svelte";
  import {onMount} from "svelte";
  import flatpickr from "flatpickr";
  import {Spanish} from "flatpickr/dist/l10n/es.js";
  import {apply_date_mask} from "#lib/utils/date_mask.ts";

  let search_query = $state("");
  let selected_category = $state("Todas");
  let minimum_price = $state<number | null>(null);
  let maximum_price = $state<number | null>(null);
  let minimum_date = $state("");
  let maximum_date = $state("");
  let minimum_time = $state("");
  let maximum_time = $state("");
  let minimum_date_input: HTMLInputElement;
  let maximum_date_input: HTMLInputElement;
  let flatpickr_minimum: any = null;
  let flatpickr_maximum: any = null;
  let selected_site = $state("Todos");
  let selected_status = $state("Todos");
  let sort_by = $state("nombre");
  let sort_descending = $state(false);
  let events_source = $state<PasslyEvent[]>(all_events);
  let events_loading = $state(false);

  $effect(() => {
    const filter = page.params.filter;
    if (filter) {
      if (filter.startsWith("busqueda=")) {
        search_query = decodeURIComponent(filter.slice(9)).replace(/_/g, " ");
        selected_category = "Todas";
      } else if (filter.startsWith("categoria=")) {
        selected_category = decodeURIComponent(filter.slice(10));
        search_query = "";
      } else if (filter.startsWith("sort=")) {
        const sort_string = decodeURIComponent(filter.slice(5));
        if (sort_string === "mas_vendidos") {
          sort_by = "mas_vendidos";
          sort_descending = true;
        } else if (sort_string === "añadidos_recientemente") {
          sort_by = "añadidos_recientemente";
          sort_descending = true;
        }
      }
    } else {
      search_query = "";
      selected_category = "Todas";
    }
  });

  onMount(async () => {
    events_loading = true;
    const backend_events = await fetch_events();
    if (backend_events !== null) events_source = backend_events;
    events_loading = false;
    const common_options: any = {
      locale: Spanish,
      disableMobile: true,
      clickOpens: false,
      onReady: function(selected_dates: any, date_string: string, instance: any) {
        const year_wrapper = instance.calendarContainer.querySelector(".numInputWrapper");
        if (!year_wrapper) return;
        (year_wrapper as HTMLElement).style.display = "none";
        const year_select = document.createElement("select");
        year_select.className = "flatpickr-monthDropdown-months flatpickr-year-select";
        const current_year = new Date().getFullYear();
        for (let year_idx = current_year + 5; year_idx >= 2020; year_idx--) {
          const option = document.createElement("option");
          option.value = year_idx.toString();
          const year_string = year_idx.toString();
          option.text = year_string.length === 4 ? year_string[0] + "." + year_string.substring(1) : year_string;
          year_select.appendChild(option);
        }
        year_select.value = instance.currentYear.toString();
        year_select.addEventListener("change", (event_item) => {
          const target = event_item.target as HTMLSelectElement;
          instance.changeYear(Number(target.value));
        });
        year_wrapper.parentNode?.insertBefore(year_select, year_wrapper.nextSibling);
        instance.customYearSelect = year_select;
      },
      onYearChange: function(selected_dates: any, date_string: string, instance: any) {
        if (instance.customYearSelect) {
          instance.customYearSelect.value = instance.currentYear.toString();
        }
      },
      formatDate: (date: Date, format: string) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year_string = date.getFullYear().toString();
        if (format === "Y-m-d") {return `${year_string}-${month}-${day}`;}
        const year = year_string.length === 4 ? year_string[0] + "." + year_string.substring(1) : year_string;
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
      }
    };
    flatpickr_minimum = flatpickr(minimum_date_input, {
      ...common_options,
      dateFormat: "d/m/Y",
      onChange: (selected_dates: any) => {
        if (selected_dates[0]) {
          const d = selected_dates[0];
          minimum_date = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`;
        } else {
          minimum_date = "";
        }
      }
    });
    flatpickr_maximum = flatpickr(maximum_date_input, {
      ...common_options,
      dateFormat: "d/m/Y",
      onChange: (selected_dates: any) => {
        if (selected_dates[0]) {
          const d = selected_dates[0];
          maximum_date = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")}`;
        } else {
          maximum_date = "";
        }
      }
    });
  });

  function handle_date_input(event: any) {
    const target = event.target as HTMLInputElement;
    const input_event = event as InputEvent;
    const is_deleting = input_event.inputType === "deleteContentBackward";
    let raw_val = target.value.replace(/\D/g, "");
    target.value = apply_date_mask(raw_val, is_deleting);
  }

  function format_price(val: number | null): string {
    if (val === null || val === undefined) return "";
    return "$ " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handle_price_input(event: any, is_minimum: boolean) {
    const target = event.target as HTMLInputElement;
    let raw_val = target.value.replace(/\D/g, "");
    let numeric_val = raw_val === "" ? null : parseInt(raw_val, 10);
    
    if (is_minimum) {
      minimum_price = numeric_val;
    } else {
      maximum_price = numeric_val;
    }
    target.value = format_price(numeric_val);
  }

  function handle_time_input(event: any, is_minimum: boolean) {
    const target = event.target as HTMLInputElement;
    const input_event = event as InputEvent;
    const is_deleting = input_event.inputType === "deleteContentBackward";
    let input_value = target.value.replace(/\D/g, "");
    if (input_value.length > 4) input_value = input_value.substring(0, 4);
    let formatted_time = "";
    if (input_value.length > 0) {
      let hours = parseInt(input_value.substring(0, 2));
      if (input_value.length >= 2) {
        if (hours > 23) hours = 23;
        formatted_time = hours.toString().padStart(2, "0");
        if (!is_deleting && input_value.length === 2) {formatted_time += ":";
        } else if (input_value.length > 2) {formatted_time += ":";}
      } else {formatted_time = input_value;}
    }
    if (input_value.length > 2) {
      let minutes = parseInt(input_value.substring(2, 4));
      if (input_value.length === 4) {
        if (minutes > 59) minutes = 59;
        formatted_time += minutes.toString().padStart(2, "0");
      } else {formatted_time += input_value.substring(2);}
    }
    target.value = formatted_time;
    if (is_minimum) {minimum_time = formatted_time;}
    else {maximum_time = formatted_time;}
  }

  function open_minimum_calendar(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (flatpickr_minimum) {
      if (Array.isArray(flatpickr_minimum)) flatpickr_minimum[0].open();
      else flatpickr_minimum.open();
    }
  }

  function open_maximum_calendar(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (flatpickr_maximum) {
      if (Array.isArray(flatpickr_maximum)) flatpickr_maximum[0].open();
      else flatpickr_maximum.open();
    }
  }

  let categories = $derived(["Todas", ...new Set(events_source.map(event_item => event_item.category))]);
  let sites = $derived(["Todos", ...new Set(events_source.map(event_item => event_item.site))]);
  let statuses = $derived(["Todos", ...new Set(events_source.map(event_item => event_item.status))]);
  let filtered_events = $derived.by(() => {
    let results = events_source.filter(event => {
      const search_query_lower = search_query.toLowerCase();
      const match_search = event.name.toLowerCase().includes(search_query_lower) || event.category.toLowerCase().includes(search_query_lower) ||event.site.toLowerCase().includes(search_query_lower);
      const match_category = selected_category === "Todas" || event.category === selected_category;
      const match_minimum_price = minimum_price === null || minimum_price === undefined || event.price >= minimum_price;
      const match_maximum_price = maximum_price === null || maximum_price === undefined || event.price <= maximum_price;
      const match_site = selected_site === "Todos" || event.site === selected_site;
      const match_status = selected_status === "Todos" || event.status === selected_status;
      let match_date = true;
      const [day_str, month_str, year_str] = event.date.split("/").map(s => Number(s.replace(".", "")));
      const event_date = new Date(Number(year_str), Number(month_str) - 1, Number(day_str)).getTime();
      if (minimum_date) {
        const [minimum_year, minimum_month, minimum_day] = minimum_date.split("-").map(Number);
        if (event_date < new Date(minimum_year, minimum_month - 1, minimum_day).getTime()) {
          match_date = false;
        }
      }
      if (maximum_date) {
        const [maximum_year, maximum_month, maximum_day] = maximum_date.split("-").map(Number);
        if (event_date > new Date(maximum_year, maximum_month - 1, maximum_day).getTime()) {
          match_date = false;
        }
      }
      let match_time = true;
      const start_time = event.time.split(" - ")[0];
      if (minimum_time.length === 5 && start_time < minimum_time) match_time = false;
      if (maximum_time.length === 5 && start_time > maximum_time) match_time = false;
      return match_search && match_category && match_minimum_price && match_maximum_price && match_site && match_status && match_date && match_time;
    });
    results.sort((a, b) => {
      let comparison = 0;
      if (sort_by === "nombre") {comparison = a.name.localeCompare(b.name);}
      else if (sort_by === "fecha") {
        const [dayA, monthA, yearA] = a.date.split("/").map(s => Number(s.replace(".", "")));
        const [dayB, monthB, yearB] = b.date.split("/").map(s => Number(s.replace(".", "")));
        const dateA = new Date(yearA, monthA - 1, dayA).getTime();
        const dateB = new Date(yearB, monthB - 1, dayB).getTime();
        comparison = dateA - dateB;
      } else if (sort_by === "precio") {comparison = a.price - b.price;}
      else if (sort_by === "recientes") {
        const timeA = new Date(a.date_added).getTime();
        const timeB = new Date(b.date_added).getTime();
        comparison = timeA - timeB;
      } else if (sort_by === "ventas") {comparison = 0;}
      return sort_descending ? -comparison : comparison;
    });
    return results;
  });

  function toggle_sort() {sort_descending = !sort_descending;}
</script>