<footer class = "footer">
  <div class = "container">
    <div class = "footer_content">
      <div class = "footer_section">
        <a href = "/" class = "logo">
          <span class = "text_gradient">Pass</span>ly
        </a>
        <p class = "description">
          La mejor plataforma para descubrir y comprar entradas para los eventos más increíbles.
          Su próxima experiencia comienza aquí.
        </p>
      </div>
      <div class = "footer_section">
        <h3>Explorar</h3>
        <ul>
          <li><a href = "/catalogo/categoria=Conciertos">Conciertos</a></li>
          <li><a href = "/catalogo/categoria=Teatro">Teatro</a></li>
          <li><a href = "/catalogo/categoria=Deportes">Deportes</a></li>
          <li><a href = "/catalogo/categoria=Festivales">Festivales</a></li>
        </ul>
      </div>
      <div class = "footer_section">
        <h3>Legal</h3>
        <ul>
          <li>
            <a href = "/terminos_y_condiciones" target = "_blank" rel = "noopener noreferrer">
              Términos y condiciones
            </a>
          </li>
          <li>
            <a href = "/politica_de_privacidad" target = "_blank" rel = "noopener noreferrer">
              Política de privacidad
            </a>
          </li>
          <li>
            <a href = "/politica_de_reembolsos" target = "_blank" rel = "noopener noreferrer">
              Política de reembolsos
            </a>
          </li>
          <li>
            <a href = "/contacto_y_soporte" target = "_blank" rel = "noopener noreferrer">
              Contacto y soporte
            </a>
          </li>
        </ul>
      </div>
      <div class = "footer_section">
        <h3>Síganos</h3>
        <div class = "social_links">
          <a
            href = "https://x.com"
            target = "_blank"
            rel = "noopener noreferrer"
            class = "social_icon"
            aria-label = "X"
          >
            <svg
              xmlns = "http://www.w3.org/2000/svg"
              width = "24"
              height = "24"
              viewBox = "0 0 24 24"
              fill = "none"
              stroke = "currentColor"
              stroke-width = "2"
              stroke-linecap = "round"
              stroke-linejoin = "round"
            >
              <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"></path>
              <path d = "M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d = "M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
          <a
            href = "https://www.instagram.com"
            target = "_blank"
            rel = "noopener noreferrer"
            class = "social_icon"
            aria-label = "Instagram"
          >
            <svg
              xmlns = "http://www.w3.org/2000/svg"
              width = "24"
              height = "24"
              viewBox = "0 0 24 24"
              fill = "none"
              stroke = "currentColor"
              stroke-width = "2"
              stroke-linecap = "round"
              stroke-linejoin = "round"
            >
              <rect x = "2" y = "2" width = "20" height = "20" rx = "5" ry = "5"></rect>
              <path d = "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1 = "17.5" y1 = "6.5" x2 = "17.5" y2 = "6.5"></line>
            </svg>
          </a>
          <a
            href = "https://www.facebook.com"
            target = "_blank"
            rel = "noopener noreferrer"
            class = "social_icon"
            aria-label = "Facebook"
          >
            <svg
              xmlns = "http://www.w3.org/2000/svg"
              width = "24"
              height = "24"
              viewBox = "0 0 24 24"
              fill = "none"
              stroke = "currentColor"
              stroke-width = "2"
              stroke-linecap = "round"
              stroke-linejoin = "round"
            >
              <path d = "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class = "footer_bottom">
      <p>
        &copy; {new Date().getFullYear().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Passly. Todos los derechos reservados.
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--secondary-background-color);
    border-top: 1px solid var(--border-color);
    padding: 4rem 0 2rem;
    margin-top: 6rem;
  }

  .footer_content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .logo {
    font-family: var(--display-font);
    font-size: 2rem;
    font-weight: 750;
    letter-spacing: -0.5px;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .description {
    color: var(--secondary-text-color);
    font-size: 1rem;
    max-width: 300px;
  }

  h3 {
    color: var(--primary-text-color);
    font-size: 1rem;
    margin-bottom: 1.5rem;
    font-weight: 750;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  ul a {
    color: var(--secondary-text-color);
    font-size: 0.875rem;
  }

  ul a:hover {color: var(--primary-accent-color);}

  .social_links {
    display: flex;
    gap: 1rem;
  }

  .social_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--card-background-color);
    border: 1px solid var(--border-color);
    color: var(--secondary-text-color);
    transition: all var(--fast-transition);
  }

  .social_icon:hover {
    background: var(--primary-accent-color);
    border-color: var(--primary-accent-color);
    color: white;
    transform: translateY(-2px);
  }

  .footer_bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.875rem;
  }

  @media (max-width: 900px) {
    .footer_content {grid-template-columns: 1fr 1fr;}
  }

  @media (max-width: 600px) {
    .footer_content {grid-template-columns: 1fr;}
  }
</style>