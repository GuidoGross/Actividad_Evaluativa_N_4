<svelte:head>
  <title>Passly | Inicio</title>
</svelte:head>

<MainBanner/>
<EventGrid
  title = "Más vendidos"
  events = {data.featured_events}
  viewAllLink = "/catalogo/ordenar=mas_vendidos"
/>
<EventGrid
  title = "Añadidos recientemente"
  events = {data.recent_events}
  viewAllLink = "/catalogo/ordenar=añadidos_recientemente"
/>
<ScrollToTopButton/>


<script lang="ts">
  import MainBanner from "#lib/components/main_banner.svelte";
  import EventGrid from "#lib/components/event_grid.svelte";
  import ScrollToTopButton from "#lib/components/scroll_to_top_button.svelte";
  
  let { data } = $props();
</script>