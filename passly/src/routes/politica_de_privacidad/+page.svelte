<svelte:head>
  <title>Passly | Política de privacidad</title>
</svelte:head>

<LegalDocument
  title = "Política de privacidad"
  summary = "Explicamos de forma clara qué datos puede utilizar Passly y para qué los necesita durante la experiencia de registro y compra de entradas."
  last_updated = "25 de septiembre de 2.026"
  sections = {document_sections}
/>

<script lang="ts">
  import LegalDocument from "#lib/components/legal_document.svelte";

  const document_sections = [
    {
      id: "data",
      title: "Datos que podríamos tratar",
      paragraphs: [
        "Passly puede solicitar datos de identificación y contacto al crear una cuenta, como nombre, correo electrónico y fecha de nacimiento. Durante una compra también puede asociar la operación, el evento y el comprobante a la cuenta utilizada.",
        "La versión académica actual no procesa pagos reales. En una implementación productiva, los datos sensibles de pago deberían ser gestionados por un proveedor especializado y nunca almacenarse en texto plano por la plataforma."
      ],
      items: [
        "Datos de cuenta: nombre, correo electrónico, fecha de nacimiento y fecha de alta.",
        "Datos de operación: evento, función, categoría, cantidad, estado y comprobante.",
        "Datos técnicos mínimos: mensajes de error, auditoría de acciones administrativas y eventos necesarios para diagnosticar el servicio."
      ]
    },
    {
      id: "purposes",
      title: "Finalidades de uso",
      paragraphs: [
        "Los datos se utilizarían para crear y administrar cuentas, asociar compras, comunicar modificaciones de eventos, brindar soporte y prevenir operaciones duplicadas o fraudulentas.",
        "La información no se utilizará para fines incompatibles con la experiencia de compra sin informar previamente al usuario."
      ]
    },
    {
      id: "security",
      title: "Seguridad y conservación",
      paragraphs: [
        "La aplicación debe aplicar controles de acceso, contraseñas protegidas, validación en servidor y registro de acciones relevantes. El acceso administrativo deberá depender de permisos verificables y no únicamente de datos guardados en el navegador.",
        "Los datos se conservarían durante el tiempo necesario para prestar el servicio, atender reclamos, mantener comprobantes o cumplir obligaciones que correspondan al contexto de la plataforma."
      ],
      note: "En esta entrega académica, la persistencia y los mecanismos de seguridad dependen de la integración que realice el backend del equipo."
    },
    {
      id: "sharing",
      title: "Compartición de información",
      paragraphs: [
        "La información necesaria para emitir una entrada podría compartirse con la organización responsable del evento o con proveedores técnicos estrictamente necesarios para procesar la operación. Cualquier integración deberá limitarse a los datos indispensables.",
        "Passly no presenta este contenido como una autorización para comercializar datos personales ni para realizar comunicaciones no solicitadas."
      ]
    },
    {
      id: "rights",
      title: "Sus opciones y derechos",
      paragraphs: [
        "Una persona podrá solicitar actualización de sus datos de contacto, consultar información vinculada a su cuenta o pedir orientación sobre una compra a través de los canales de soporte publicados.",
        "Las solicitudes se evaluarán de acuerdo con el alcance técnico de la plataforma y las reglas aplicables al entorno donde se despliegue."
      ]
    },
    {
      id: "updates",
      title: "Cambios en esta política",
      paragraphs: [
        "Si esta política cambiara de manera relevante, se actualizará la fecha indicada al comienzo del documento y se comunicará cuando corresponda."
      ]
    }
  ];
</script>