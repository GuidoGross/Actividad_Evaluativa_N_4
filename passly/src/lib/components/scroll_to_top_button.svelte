<svelte:window bind:scrollY={scroll_y} bind:innerHeight={inner_height}/>

{#if inner_height > 0 && scroll_y > inner_height * 0.5}
  <button class = "scroll_to_top_button" onclick = {scroll_to_top} aria-label = "Volver hacia arriba">
    <svg
      xmlns = "http://www.w3.org/2000/svg"
      width = "25"
      height = "25"
      viewBox = "0 0 25 25"
      fill = "none"
      stroke = "currentColor"
      stroke-width = "2"
      stroke-linecap = "round"
      stroke-linejoin = "round"
    >
      <path d = "m18 15-6-6-6 6"/>
    </svg>
  </button>
{/if}

<style>
  .scroll_to_top_button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent-gradient);
    color: white;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(140, 90, 245, 0.5);
    z-index: 100;
    transition: all var(--fast-transition);
    border: none;
    cursor: pointer;
    animation: fadeIn 0.25s cubic-bezier(0.1, 1, 0.25, 1) forwards;
  }

  .scroll_to_top_button:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(140, 90, 245, 0.5);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(25px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<script lang="ts">
  let scroll_y = $state(0);
  let inner_height = $state(0);

  function scroll_to_top() {window.scrollTo({top: 0, behavior: "smooth"});}
</script>