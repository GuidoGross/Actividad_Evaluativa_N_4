<svelte:head>
  <title>Passly | Política de reembolsos</title>
</svelte:head>

<section class = "refund_page">
  <LegalDocument
    title = "Política de reembolsos"
    summary = "Detallamos los escenarios de cancelación, postergación y arrepentimiento que debería contemplar Passly en una experiencia de compra transparente."
    last_updated = "25 de septiembre de 2.026"
    sections = {document_sections}
  />
  <div class = "container">
    <aside class = "withdrawal_card" aria-label = "Solicitud de arrepentimiento">
      <div>
        <span class = "card_eyebrow eyebrow">¿Cambió de opinión?</span>
        <h2>Solicitud de arrepentimiento</h2>
        <p>
          Inicie la consulta desde soporte e incluya el identificador de compra. El flujo definitivo deberá validarse contra la normativa y las condiciones del evento.
        </p>
      </div>
      <a
        href = "/contacto_y_soporte?motivo=arrepentimiento"
        class = "withdrawal_button action_button action_button_primary"
      >
        Ir a contacto y soporte <span aria-hidden = "true">→</span>
      </a>
    </aside>
  </div>
</section>

<style>
  .refund_page :global(.legal_page) {padding-bottom: 0;}

  .withdrawal_card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 1.5rem;
    margin-top: 2rem;
    background: linear-gradient(115deg, rgba(140, 90, 245, 0.25), rgba(60, 130, 245, 0.1));
    border: 1px solid rgba(140, 90, 245, 0.5);
    border-radius: 25px;
  }

  .card_eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  }

  .withdrawal_card h2 {
    margin-top: 0.25rem;
    font-size: 1.25rem;
  }

  .withdrawal_card p {
    max-width: 750px;
    margin-top: 0.5rem;
    color: var(--secondary-text-color);
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .withdrawal_button {
    flex: none;
    padding: 1rem 1rem;
    border-radius: 10px;
    font-size: 1rem;
  }

  @media (max-width: 650px) {
    .withdrawal_card {
      align-items: flex-start;
      flex-direction: column;
      gap: 1rem;
    }

    .withdrawal_button {width: 100%;}
  }
</style>

<script lang="ts">
  import LegalDocument from "#lib/components/legal_document.svelte";

  const document_sections = [
    {
      id: "scope",
      title: "Alcance de esta política",
      paragraphs: [
        "Esta política describe el comportamiento esperado para solicitudes relacionadas con entradas adquiridas a través de Passly. Cada evento puede incluir condiciones particulares que deberán mostrarse antes de confirmar la operación.",
        "Como parte de esta demostración académica, los reembolsos no se procesan de forma real. La interfaz deja preparado el camino de consulta para una integración posterior."
      ]
    },
    {
      id: "cancellation",
      title: "Evento cancelado",
      paragraphs: [
        "Si una organización cancela un evento, el registro debería conservarse con estado Cancelado y los compradores recibirían una comunicación con los pasos a seguir. La devolución, si correspondiera, se gestionaría sobre el medio de pago o procedimiento definido para la compra.",
        "El panel administrativo debe registrar la cancelación como un cambio de estado, evitando borrar datos del evento, sus funciones o el historial de entradas."
      ]
    },
    {
      id: "postponement",
      title: "Evento postergado o modificado",
      paragraphs: [
        "Ante un cambio de fecha, horario o lugar, Passly debería informar la nueva condición y, cuando la regla aplicable lo permita, ofrecer instrucciones para solicitar reintegro o conservar la entrada para la nueva función.",
        "La disponibilidad y la validez de los tickets deben ser recalculadas y confirmadas por el backend antes de comunicar una resolución."
      ]
    },
    {
      id: "request",
      title: "Cómo solicitar asistencia",
      paragraphs: [
        "Para iniciar una consulta, el usuario deberá ingresar a Contacto y soporte e indicar el correo asociado a la compra, el evento y el identificador de comprobante cuando esté disponible.",
        "El sistema debería registrar la solicitud, evitar duplicados y devolver un estado claro para su seguimiento."
      ],
      items: [
        "Identificador de compra o comprobante.",
        "Evento y función involucrados.",
        "Motivo de la solicitud y medio de contacto.",
        "Documentación adicional solo si fuese estrictamente necesaria."
      ]
    },
    {
      id: "exceptions",
      title: "Situaciones que pueden requerir revisión",
      paragraphs: [
        "Las solicitudes pueden requerir una revisión adicional cuando la entrada ya fue utilizada, exista una restricción informada por la organización, se detecte actividad fraudulenta o el plazo aplicable haya vencido.",
        "La respuesta final deberá respetar las condiciones comunicadas en el evento y la normativa que corresponda al contexto real del servicio."
      ]
    }
  ];
</script>