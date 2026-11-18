<section class = "event_section container">
  <div class = "header_section">
    <h2 class = "title_section">{title}</h2>
    {#if viewAllLink}
      <a href = {viewAllLink} class = "view_all">
        Ver todos <span class = "arrow">→</span>
      </a>
    {/if}
  </div>
  {#if events.length > 0}
    <div class = "event_grid">
      {#each events as event, i}
        <div class = "card_wrapper" style = "--animation-order: {i}">
          <EventCard {...event}/>
        </div>
      {/each}
    </div>
  {:else}
    <div class = "empty_state">
      <p>No se encontraron eventos disponibles en este momento.</p>
    </div>
  {/if}
</section>

<style>
  .event_section {margin-bottom: 6rem;}

  .header_section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeUp 1s cubic-bezier(0.15, 1, 0.25, 1) forwards;
  }

  .title_section {
    font-size: 2rem;
    color: var(--primary-text-color);
  }

  .view_all {
    color: var(--secondary-accent-color);
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: color var(--fast-transition);
  }

  .view_all .arrow {transition: transform var(--fast-transition);}

  .view_all:hover {color: var(--primary-text-color);}

  .view_all:hover .arrow {transform: translateX(4px);}

  .event_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }

  .card_wrapper {
    opacity: 0;
    animation: fadeUp 1s cubic-bezier(0.15, 1, 0.25, 1) forwards calc(var(--animation-order) * 0.1s + 0.1s);
    height: 100%;
  }

  .empty_state {
    text-align: center;
    padding: 4rem;
    background: var(--card-background-color);
    border: 1px dashed var(--border-color);
    border-radius: 20px;
    color: var(--secondary-text-color);
  }

  @media (max-width: 600px) {
    .header_section {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .event_grid {grid-template-columns: 1fr;}
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>


<script lang="ts">
  import EventCard from "./event_card.svelte";
  import type {Event as PasslyEvent} from "#lib/data/events.ts";

  let {
    title = "Eventos destacados",
    events = [],
    viewAllLink = ""
  }: {
    title?: string;
    events?: PasslyEvent[];
    viewAllLink?: string;
  } = $props();
</script>