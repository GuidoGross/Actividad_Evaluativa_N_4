<div class = "app">
  <NavigationBar/>
    <main class = "main_content">
      {@render children()}
    </main>
  <PageFooter/>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main_content {
    flex: 1;
    padding-top: 85px;
  }
</style>

<script>
  import "../app.css";
  import NavigationBar from "#lib/components/navigation_bar.svelte";
  import PageFooter from "#lib/components/footer.svelte";
  
  let {children} = $props();
</script>