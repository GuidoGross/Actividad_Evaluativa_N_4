<svelte:head>
  <title>Passly | Términos y condiciones</title>
</svelte:head>

<LegalDocument
  title = "Términos y condiciones"
  summary = "Estas condiciones describen cómo funciona la experiencia de compra, publicación y uso de Passly dentro de esta demostración académica."
  last_updated = "25 de septiembre de 2.026"
  sections = {document_sections}
/>

<script lang="ts">
  import LegalDocument from "#lib/components/legal_document.svelte";

  const document_sections = [
    {
      id: "acceptance",
      title: "Aceptación de las condiciones",
      paragraphs: [
        "Al navegar, registrarse o realizar una solicitud de compra en Passly, usted acepta estas condiciones de uso y la información publicada en las políticas vinculadas desde el sitio.",
        "Passly se presenta aquí como una plataforma ficticia de venta de entradas. Sus textos y flujos fueron elaborados con fines de aprendizaje y diseño de producto."
      ]
    },
    {
      id: "accounts",
      title: "Cuenta y acceso",
      paragraphs: [
        "Para realizar operaciones que requieran identificación, el usuario deberá proporcionar información veraz, actualizada y suficiente. Cada persona es responsable de preservar la confidencialidad de sus credenciales.",
        "La plataforma podrá limitar o revisar una cuenta cuando detecte datos inconsistentes, uso abusivo, intentos de fraude o incumplimiento de estas condiciones."
      ],
      items: [
        "No comparta su contraseña ni permita que terceros utilicen su sesión.",
        "Informe cualquier acceso no autorizado a través de los canales de soporte.",
        "Mantenga actualizado su correo electrónico para recibir comunicaciones sobre sus compras."
      ]
    },
    {
      id: "tickets",
      title: "Compra de entradas",
      paragraphs: [
        "La disponibilidad, el precio, las categorías y los límites de compra pueden variar según cada evento. Antes de confirmar una operación, Passly deberá mostrar un resumen con la función seleccionada, la cantidad solicitada y el total estimado.",
        "Una compra se considerará confirmada únicamente cuando el sistema de pagos simulado y el backend registren la operación. El comprobante y el código QR definitivo se emitirán luego de esa confirmación."
      ],
      note: "El carrito o la selección previa no garantizan disponibilidad: el stock solo se reserva mediante el proceso de compra definido para cada evento."
    },
    {
      id: "events",
      title: "Cambios, postergaciones y cancelaciones",
      paragraphs: [
        "La organización de cada evento es responsable por sus fechas, horarios, ubicación y condiciones de ingreso. Si existiera una modificación relevante, Passly buscará comunicarla mediante los datos de contacto asociados a la cuenta.",
        "Cuando un evento sea cancelado o reprogramado, se aplicará el procedimiento publicado en la Política de reembolsos. La cancelación no implica la eliminación del registro ni del historial de compras asociado."
      ]
    },
    {
      id: "use",
      title: "Uso responsable de la plataforma",
      paragraphs: [
        "No está permitido interferir con el funcionamiento del sitio, automatizar compras de forma no autorizada, revender entradas en contra de las reglas del evento ni intentar acceder a áreas administrativas sin permiso.",
        "Las funciones de administración se encuentran reservadas a usuarios autorizados. Toda validación de rol, inventario, reserva y concurrencia debe realizarse de forma segura en el backend."
      ]
    },
    {
      id: "contact",
      title: "Consultas",
      paragraphs: [
        "Para consultas sobre estas condiciones o sobre una compra, puede utilizar la página de Contacto y soporte. La información brindada allí se usará únicamente para atender la solicitud dentro de esta demostración."
      ]
    }
  ];
</script>