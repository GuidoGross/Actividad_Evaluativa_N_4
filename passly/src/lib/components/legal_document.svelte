<section class = "legal_page page_section">
  <div class = "container">
    <header class = "legal_header">
      <span class = "eyebrow">Passly · Información importante</span>
      <h1>{title}</h1>
      <p>{summary}</p>
      <div class = "document_meta">
        <span>Última actualización: {last_updated}</span>
        <span>Contenido de demostración académica</span>
      </div>
    </header>
    <div class = "legal_layout">
      <aside class = "document_navigation" aria-label = "Índice del documento">
        <span>En esta página</span>
        <ol>
          {#each sections as section, index}
            <li>
              <a href = {`#${section.id}`}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {section.title}
              </a>
            </li>
          {/each}
        </ol>
      </aside>
      <article class = "document_content surface_card">
        {#each sections as section, index}
          <section
            id = {section.id} class = "document_section" aria-labelledby = {`${section.id}_title`}
          >
            <div class = "section_marker">{String(index + 1).padStart(2, "0")}</div>
            <div class = "section_body">
              <h2 id = {`${section.id}_title`}>{section.title}</h2>
              {#each section.paragraphs as paragraph}
                <p>{paragraph}</p>
              {/each}
              {#if section.items}
                <ul>
                  {#each section.items as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              {/if}
              {#if section.note}
                <p class = "section_note">{section.note}</p>
              {/if}
            </div>
          </section>
        {/each}
      </article>
    </div>
  </div>
</section>

<style>
  .legal_header {
    max-width: 750px;
    padding-bottom: 3rem;
  }

  .legal_header h1 {
    max-width: 750px;
    margin-top: 0.5rem;
    font-size: clamp(3rem, 5vw, 3rem);
  }

  .legal_header > p {
    max-width: 750px;
    margin-top: 1rem;
    color: var(--secondary-text-color);
    font-size: clamp(1rem, 2vw, 1rem);
  }

  .document_meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-top: 1.5rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
  }

  .document_meta span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .document_meta span + span::before {
    content: "";
    width: 4px;
    height: 4px;
    background: var(--primary-accent-color);
    border-radius: 50%;
  }

  .legal_layout {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
    align-items: start;
    gap: clamp(2rem, 6vw, 6rem);
  }
  
  .document_navigation {
    position: sticky;
    top: 100px;
    padding: 1rem 0;
  }

  .document_navigation > span {
    display: block;
    margin-bottom: 1rem;
    color: var(--primary-text-color);
    font-size: 1rem;
    font-weight: 750;
  }

  .document_navigation ol {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0;
    list-style: none;
  }

  .document_navigation a {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    line-height: 1.25;
  }

  .document_navigation a:hover {color: var(--primary-text-color);}

  .document_navigation small {
    color: var(--primary-accent-color);
    font-size: 0.75rem;
    font-weight: 750;
  }

  .document_content {padding: clamp(1.25rem, 3vw, 2.5rem);}

  .document_section {
    display: grid;
    grid-template-columns: 35px minmax(0, 1fr);
    gap: 1rem;
    padding: 0 0 2.5rem;
  }

  .document_section + .document_section {
    padding-top: 2.5rem;
    border-top: 1px solid var(--border-color);
  }
  
  .section_marker {
    color: var(--secondary-accent-color);
    font-family: var(--display-font);
    font-size: 1rem;
    font-weight: 750;
  }

  .section_body h2 {
    margin-bottom: 0.75rem;
    font-size: clamp(1.5rem, 2.5vw, 1.5rem);
  }

  .section_body p {
    color: var(--secondary-text-color);
    font-size: 1rem;
    line-height: 1.5;
  }

  .section_body p + p {margin-top: 0.75rem;}

  .section_body ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1.25rem;
    margin-top: 1rem;
    color: var(--secondary-text-color);
    font-size: 1rem;
    line-height: 1.5;
  }

  .section_body li::marker {color: var(--primary-accent-color);}

  .section_note {
    padding: 1rem 1rem;
    margin-top: 1rem;
    color: var(--primary-text-color) !important;
    background: rgba(140, 90, 245, 0.1);
    border-left: 3px solid var(--primary-accent-color);
    border-radius: 0 10px 10px 0;
    font-size: 0.75rem !important;
    line-height: 1.5 !important;
  }

  @media (max-width: 850px) {
    .legal_layout {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .document_navigation {
      position: static;
      padding: 0;
    }

    .document_navigation ol {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.5rem 1rem;
    }
  }
  @media (max-width: 480px) {
    .legal_page {padding-top: 2.5rem;}

    .document_meta span + span::before {display: none;}

    .document_navigation ol {grid-template-columns: 1fr;}

    .document_section {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .document_content {padding: 1.25rem;}
  }
</style>

<script lang="ts">
  type DocumentSection = {
    id: string;
    title: string;
    paragraphs: string[];
    items?: string[];
    note?: string;
  };

  let {title, summary, last_updated, sections}: {
    title: string;
    summary: string;
    last_updated: string;
    sections: DocumentSection[];
  } = $props();
</script>