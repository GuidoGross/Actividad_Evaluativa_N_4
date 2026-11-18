<section class = "main_banner">
  <div class = "banner_overlay"></div>
  <div class = "container banner_content">
    <h1 class = "title">
      Viva la <span class = "text_gradient">experiencia</span><br/>
      que estaba esperando
    </h1>
    <p class = "subtitle">
      Descubra los mejores conciertos, obras de teatro y eventos deportivos. Compre sus entradas de forma segura y sin filas.
    </p>
    <div class = "banner_actions">
      <button class = "button primary_button" onclick = {() => window.location.href = "/catalogo"}>
        Ver catálogo
      </button>
    </div>
  </div>
</section>

<style>
  .main_banner {
    position: relative;
    margin-top: -85px;
    padding: calc(8rem + 85px) 0 8rem 0;
    min-height: 75vh;
    display: flex;
    align-items: center;
    background-image: url("/main_banner_background.jpg");
    background-size: cover;
    background-position: center;
  }

  .banner_overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(to bottom, transparent 50%, var(--primary-background-color) 100%),
      linear-gradient(to right, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.5) 100%);
    z-index: 1;
  }

  .banner_content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    animation: fadeUp 1s cubic-bezier(0.15, 1, 0.25, 1) forwards;
  }

  .title {
    font-size: clamp(3rem, 5vw, 4.5rem);
    margin-bottom: 1.5rem;
    color: white;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--secondary-text-color);
    margin-bottom: 2.5rem;
    max-width: 600px;
  }

  .banner_actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border-radius: 100px;
    font-weight: 600;
    font-size: 1rem;
    transition: all var(--fast-transition);
  }

  .primary_button {
    background: var(--accent-gradient);
    color: white;
    box-shadow: 0 3px 12px rgba(140, 90, 245, 0.5);
  }

  .primary_button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(140, 90, 245, 0.75);
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

  @media (max-width: 768px) {
    .main_banner {
      padding: 6rem 0;
      min-height: 60vh;
    }

    .banner_overlay {
      background: 
        linear-gradient(to bottom, transparent 50%, var(--primary-background-color) 100%),
        linear-gradient(to bottom, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.5) 100%);
    }

    .title {font-size: 2.5rem;}
  }
</style>