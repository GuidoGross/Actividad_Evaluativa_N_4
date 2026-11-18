<article class = "event_card">
  <div class = "card_image_wrapper">
    <img src = {image} alt = {name} class = "card_image"/>
    <div class = "card_badges">
      <span class = "badge category">{category}</span>
      <span class = "badge status {get_status_class(status)}">{status}</span>
    </div>
  </div>
  <div class = "card_content">
    <div class = "card_header">
      <div class = "date_time_site">
        <div class = "date_time_container">
          <span class = "date">{date}</span>
          <span class = "time">{time}</span>
        </div>
        <div class = "divider"></div>
        <div class = "site_container">
          <span class = "site">{site}</span>
        </div>
      </div>
      <h3 class = "title">{name}</h3>
    </div>
    <p class = "description">{description}</p>
    <div class = "card_footer">
      <div class = "price_container">
        <span class = "price_label">Desde</span>
        <span class = "price">${price.toLocaleString("es-ES")}</span>
      </div>
      <button class = "buy_button" disabled = {!is_available} onclick={buy_ticket}>
        {#if status === "Disponible" && tickets > 0}
          Comprar <span class = "arrow">→</span>
        {:else if status === "Agotado"}
          Agotado
        {:else if status === "Postergado"}
          Postergado
        {:else}
          Cancelado
        {/if}
      </button>
    </div>
  </div>
</article>
{#if is_purchase_modal_open}
  <PurchaseModal
    event_item = {
      {
        id,
        name,
        description,
        image,
        date,
        time,
        site,
        category,
        price,
        tickets,
        status,
        date_added,
        functions,
        ticket_categories,
        sale_configuration,
        visibility
      }
    }
    onclose = {() => is_purchase_modal_open = false}
  />
{/if}

<style>
  .event_card {
    background: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
    transition: all var(--normal-transition);
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .event_card:hover {
    transform: translateY(-8px);
    border-color: rgba(140, 90, 245, 0.5);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(140, 90, 245, 0.25);
  }

  .card_image_wrapper {
    position: relative;
    height: 225px;
    overflow: hidden;
  }

  .card_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .event_card:hover .card_image {transform: scale(1.1);}

  .card_badges {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .badge {
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 750;
    backdrop-filter: blur(0.75rem);
  }

  .category {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  .status.available {
    background: rgba(15, 185, 130, 0.25);
    color: var(--success-color);
    border: 1px solid rgba(15, 185, 130, 0.25);
  }
  
  .status.sold_out {
    background: rgba(240, 70, 70, 0.25);
    color: var(--error-color);
    border: 1px solid rgba(240, 70, 70, 0.25);
  }

  .status.postponed {
    background: rgba(250, 170, 30, 0.25);
    color: #faaa1e;
    border: 1px solid rgba(250, 170, 30, 0.25);
  }

  .status.cancelled {
    background: rgba(100, 100, 100, 0.25);
    color: #a0a0a0;
    border: 1px solid rgba(100, 100, 100, 0.25);
  }

  .card_content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card_header {margin-bottom: 1rem;}

  .date_time_site {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 0.75rem;
    gap: 0.75rem;
  }

  .date_time_container, .site_container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .date_time_container {gap: 0.25rem;}

  .site_container {
    text-align: right;
    align-items: flex-end;
  }

  .divider {
    width: 1px;
    background: var(--border-color);
  }

  .date {
    color: var(--secondary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
  }

  .time {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .site {
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .title {
    font-size: 1.25rem;
    color: var(--primary-text-color);
    margin: 0;
    line-height: 1.25;
  }

  .description {
    color: var(--secondary-text-color);
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .price_container {
    display: flex;
    flex-direction: column;
  }

  .price_label {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  .price {
    font-size: 1.25rem;
    font-weight: 750;
    color: var(--primary-text-color);
    font-family: var(--display-font);
  }

  .buy_button {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 750;
    font-size: 0.875rem;
    transition: all var(--fast-transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .buy_button .arrow {transition: transform var(--fast-transition);}

  .buy_button:not(:disabled):hover {
    background: var(--accent-gradient);
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(140, 90, 245, 0.5);
  }

  .buy_button:not(:disabled):hover .arrow {transform: translateX(4px);}

  .buy_button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.25);
  }
</style>

<script lang="ts">
  import type {Event as PasslyEvent} from "#lib/data/events.ts";
  import PurchaseModal from "#lib/components/purchase_modal.svelte";

  let {
    id,
    name,
    description,
    image,
    date,
    time,
    site,
    category,
    price,
    tickets,
    status,
    date_added,
    functions,
    ticket_categories,
    sale_configuration,
    visibility
  }: PasslyEvent = $props();
  let is_available = $derived(status === "Disponible" && tickets > 0);
  let is_purchase_modal_open = $state(false);

  function get_status_class(state: string) {
    switch (state) {
      case "Disponible": return "available";
      case "Agotado": return "sold_out";
      case "Cancelado": return "cancelled";
      case "Postergado": return "postponed";
      default: return "";
    }
  }

  function buy_ticket(event: Event) {
    event.stopPropagation();
    if (!is_available) return;
    is_purchase_modal_open = true;
    // La integración real de la compra se documenta en purchase_modal.svelte.
  }
</script>