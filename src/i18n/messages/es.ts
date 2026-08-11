import type { Messages } from '../types';

export const es: Messages = {
  meta: {
    brandLabel: 'Presupuesto web',
    homeTitle: 'Presupuesto web — encuesta de discovery',
    homeDescription:
      'Una encuesta breve para entender necesidades, preparación y expectativas antes de proponer la solución adecuada.',
    formTitle: 'Formulario del proyecto',
    formDescription:
      'Responde paso a paso para que podamos entender tu proyecto y preparar una propuesta clara.',
    thanksTitle: 'Solicitud recibida',
    thanksDescription:
      'Recibimos tu proyecto. Te contamos qué sigue y cuándo vas a tener novedades.',
  },
  common: {
    continue: 'Continuar',
    back: 'Atrás',
    submit: 'Enviar solicitud',
    submitting: 'Enviando…',
    required: 'Obligatorio',
    optional: 'Opcional',
    language: 'Idioma',
    startCta: 'Empezar',
    goHome: 'Volver al inicio',
    edit: 'Editar',
  },
  home: {
    headline: 'Una encuesta breve para entender tu proyecto',
    supporting:
      'Con tus necesidades, preparación y expectativas definimos qué solución y nivel de acompañamiento encajan mejor.',
    timeEstimate: 'Tarda unos 5–8 minutos.',
    nextStep: 'Después te escribimos con los próximos pasos.',
  },
  form: {
    progressLabel: 'Progreso del formulario',
    stepOf: 'Paso {current} de {total}',
    reviewTitle: 'Revisión',
    reviewHint: 'Verifica tus respuestas antes de enviar.',
    submitError: 'No pudimos enviar el formulario. Inténtalo de nuevo.',
    phases: {
      contact: 'Contacto',
      business: 'Negocio',
      project: 'Proyecto',
      close: 'Cierre',
    },
  },
  reviewStep: {
    hint: 'Revisá cada bloque. Si algo no está bien, podés editarlo y volvés acá.',
    sectionLabel: 'Sección {n}',
    emptyExtras: 'No agregaste notas adicionales.',
    trustTitle: 'Estás a un paso de enviarnos tu proyecto',
    trustBody:
      'Con esta información armamos una propuesta a medida. Si algo quedó incompleto o cambió, mejor corregirlo ahora.',
    nextTitle: 'Qué pasa después de enviar',
    nextPoints: [
      'Recibimos tu solicitud y la revisamos con calma',
      'Te escribimos con los próximos pasos o preguntas puntuales',
      'No hay compromiso: este envío no es un contrato',
    ],
    privacyNote:
      'Usamos estos datos únicamente para responderte y preparar tu propuesta.',
  },
  thanks: {
    eyebrow: 'Recibido con éxito',
    headline: 'Gracias. Ya tenemos tu proyecto.',
    supporting:
      'Leímos tu información con atención. A partir de acá armamos una propuesta clara, sin vueltas innecesarias.',
    referenceLabel: 'Tu número de referencia',
    referenceHint:
      'Guardalo por si nos escribís: nos ayuda a ubicar tu solicitud al instante.',
    nowTitle: 'Qué ocurre ahora',
    nowIntro:
      'Un proceso simple, con tiempos realistas para que sepas qué esperar.',
    timeline: [
      {
        title: 'Revisamos tu solicitud',
        timing: 'Hoy – 24 h',
        description:
          'Leemos objetivos, alcance, materiales y contexto para entender el proyecto completo.',
      },
      {
        title: 'Te escribimos',
        timing: '1 – 2 días hábiles',
        description:
          'Vas a recibir un mensaje con los próximos pasos o, si hace falta, una o dos preguntas puntuales.',
      },
      {
        title: 'Preparamos la propuesta',
        timing: '2 – 4 días hábiles',
        description:
          'Con todo claro, armamos una propuesta alineada a tu alcance, plazos e inversión.',
      },
    ],
    nextTitle: 'Mientras tanto, te puede ayudar',
    nextSteps: [
      'Reunir logo, fotos y textos si todavía no están listos',
      'Tener a mano acceso al dominio o hosting, si ya los tenés',
      'Pensar 1 o 2 sitios de referencia que te gusten de verdad',
    ],
    ctaSupporting:
      'No tenés que hacer nada más por ahora. Nosotros te contactamos.',
    ctaPrimary: 'Volver al inicio',
    ctaNote: 'Opcional: podés cerrar esta página con tranquilidad.',
  },
  steps: {
    contact: {
      title: '¿Cómo te contactamos?',
      description: '',
    },
    business: {
      title: 'Contanos sobre tu negocio',
      description: '',
    },
    needs: {
      title: '¿Qué necesitás resolver?',
      description: '',
    },
    assets: {
      title: '¿Qué tenés listo para el proyecto?',
      description: '',
    },
    design: {
      title: '¿Qué estilo visual buscás?',
      description: '',
    },
    technical: {
      title: 'Algunos detalles prácticos',
      description: '',
    },
    'timeline-budget': {
      title: 'Tiempos e inversión',
      description:
        'Esto nos ayuda a proponerte caminos realistas, sin pedirte un número exacto.',
    },
    extras: {
      title: 'Antes de cerrar…',
      description:
        'Si hay algo que no preguntamos y que cambia cómo entendemos tu proyecto — una restricción, una idea, una preocupación o un detalle que te importa — contanos acá. Lo leemos con atención.',
    },
    review: {
      title: 'Revisá tu información',
      description:
        'Un último vistazo antes de enviar. Así nos aseguramos de entender bien tu proyecto.',
    },
  },
  contactStep: {
    fullNamePlaceholder: 'Ej. Ana Pérez',
    emailPlaceholder: 'ana@empresa.com',
    phonePlaceholder: '+54 9 11 1234-5678',
    emailHint: 'Te respondemos por este correo.',
    phoneHint: 'Si preferís WhatsApp o llamada.',
    privacyNote:
      'Solo usamos estos datos para responderte y armarte el presupuesto. No los compartimos.',
    savedMessage:
      'Datos guardados. El siguiente paso estará disponible pronto.',
  },
  businessStep: {
    companyPlaceholder: 'Ej. Estudio Norte',
    industryPlaceholder: 'Seleccioná una industria',
    industryHint: '',
    hasWebsiteLegend: '¿Tenés una página web?',
    hasWebsiteHint: 'Si ya tenés sitio, te pedimos la URL para revisarlo.',
    websitePlaceholder: 'https://www.ejemplo.com',
    websiteHint: 'URL completa, con https://',
    yes: 'Sí',
    no: 'No',
    savedMessage:
      'Datos del negocio guardados. El siguiente paso estará disponible pronto.',
    industries: {
      retail: 'Comercio / retail',
      services: 'Servicios',
      technology: 'Tecnología',
      health: 'Salud',
      education: 'Educación',
      food: 'Gastronomía',
      realEstate: 'Bienes raíces',
      construction: 'Construcción',
      professional: 'Servicios profesionales',
      other: 'Otra',
    },
  },
  needsStep: {
    goalsPlaceholder:
      'Ej. Nos escriben poco por web y dependemos del boca a boca…',
    goalsHint:
      'Contalo en tus palabras. Todavía no hace falta hablar de tecnología.',
    projectTypeLegend: '¿Qué tipo de proyecto imaginás?',
    projectTypeHint: 'Elegí la más cercana. Después lo afinamos.',
    expectedOutcomePlaceholder:
      'Ej. Recibir más consultas por mes / vender online / ordenar pedidos…',
    expectedOutcomeHint:
      'Opcional. Un resultado concreto que te haría decir “esto funcionó”.',
    savedMessage:
      'Necesidad registrada. El siguiente paso estará disponible pronto.',
    projectTypeOptions: {
      website: {
        label: 'Sitio web',
        description: 'Presencia online y contacto.',
      },
      webApp: {
        label: 'Aplicación o sistema',
        description: 'Flujos, usuarios y datos.',
      },
      ecommerce: {
        label: 'Tienda online',
        description: 'Catálogo, pagos y ventas.',
      },
      redesign: {
        label: 'Rediseño',
        description: 'Mejorar algo que ya existe.',
      },
      other: {
        label: 'Otro',
        description: 'No estoy seguro o es una mezcla.',
      },
    },
  },
  assetsStep: {
    helpLegend: 'Si te falta algo de lo anterior, ¿querés que te ayudemos a armarlo?',
    helpHint:
      'No pasa nada si no tenés todo listo. Podemos darte una mano con lo que haga falta.',
    savedMessage:
      'Materiales registrados. El siguiente paso estará disponible pronto.',
    logoOptions: {
      yes: 'Sí',
      no: 'No',
    },
    contentOptions: {
      all: 'Tengo todo',
      some: 'Tengo algo',
      none: 'No tengo',
    },
    styleOptions: {
      defined: 'Los tengo',
      ideas: 'Tengo ideas',
      none: 'Todavía no',
    },
    items: {
      logo: {
        label: '¿Tenés un logo?',
        hint: 'Un archivo usable (PNG, SVG o similar), no solo una foto recortada.',
      },
      photos: {
        label: 'Fotos del negocio, productos o equipo',
        hint: 'Imágenes propias que se puedan usar en el sitio.',
      },
      texts: {
        label: 'Textos (servicios, acerca de, beneficios…)',
        hint: 'Aunque estén en borrador o en WhatsApp, cuenta.',
      },
      visualIdentity: {
        label: 'Colores y tipografías',
        hint: 'Si ya tenés colores definidos, una tipografía preferida o sabés el nombre de la letra.',
      },
    },
  },
  designStep: {
    styleLegend: '¿Qué estilo se acerca más a lo que imaginás?',
    styleHint: 'Elegí la dirección general. Después lo afinamos juntos.',
    styleNoteLabel: 'Contanos un poco más',
    styleNotePlaceholder:
      'Ej. Una mezcla de limpio y con personalidad, o algo que no encaja en las opciones…',
    styleNoteHint: 'Opcional. Cualquier detalle que nos ayude a entenderlo.',
    hasReferencesLegend: '¿Tenés alguna página o sitio de referencia?',
    hasReferencesHint:
      'Si hay sitios que te gusten, los usamos como punto de partida.',
    yes: 'Sí',
    no: 'No',
    urlsPlaceholder:
      'https://ejemplo.com\nhttps://otra-referencia.com/pagina',
    urlsHint: 'Pegá una o más URLs (una por línea).',
    tastePlaceholder:
      'Ej. Me gusta lo limpio y claro. Prefiero evitar diseños cargados o muy corporativos…',
    tasteHint: 'Opcional. Qué te gusta, qué evitarías o la sensación que buscás.',
    savedMessage:
      'Estilo registrado. El siguiente paso estará disponible pronto.',
    styleOptions: {
      minimal: {
        label: 'Minimalista',
        description: 'Espacio, claridad y pocos elementos.',
      },
      modern: {
        label: 'Moderno / impactante',
        description: 'Actual, limpio o con mucha personalidad.',
      },
      classic: {
        label: 'Clásico / elegante',
        description: 'Sobrio, atemporal y cuidado en los detalles.',
      },
      friendly: {
        label: 'Cercano',
        description: 'Cálido, accesible y fácil de recorrer.',
      },
      other: {
        label: 'Otro / mezcla',
        description: 'No encaja en una sola categoría.',
      },
    },
  },
  technicalStep: {
    infraLegend: '¿Qué tenés hoy listo para el sitio?',
    infraHint: 'Si no estás seguro, marcá esa opción; lo vemos juntos.',
    domainNamePlaceholder: 'tunegocio.com',
    domainNameHint: 'Escribilo sin https://, solo el nombre del dominio.',
    emailLegend: '¿Querés correo con el dominio?',
    emailHint: 'Por ejemplo: hola@tunegocio.com',
    maintenanceLegend:
      'Cuando el sitio esté online, ¿quién se ocuparía de mantenerlo y actualizarlo?',
    maintenanceHint:
      'Textos, novedades, ajustes o el cuidado del día a día.',
    savedMessage:
      'Detalles guardados. El siguiente paso estará disponible pronto.',
    infraOptions: {
      both: 'Dominio y hosting',
      domainOnly: 'Solo dominio',
      hostingOnly: 'Solo hosting',
      none: 'Todavía nada',
      unsure: 'No estoy seguro',
    },
    emailOptions: {
      yes: 'Sí',
      unsure: 'Todavía no lo sé',
      no: 'No hace falta',
    },
    maintenanceOptions: {
      client: 'Yo o mi equipo',
      agency: 'Ustedes',
      undecided: 'Todavía no lo definí',
    },
  },
  timelineBudgetStep: {
    timelineLegend: '¿Para cuándo te gustaría tenerlo listo?',
    timelineHint: 'Una idea aproximada alcanza; después lo afinamos juntos.',
    investmentLegend:
      '¿En qué rango te sentís cómodo invertir en este proyecto?',
    investmentIntro:
      'No hace falta un monto exacto. Elegí la opción que más se acerque: nos ayuda a proponerte alternativas que encajen.',
    investmentHint:
      'No es un compromiso. Si preferís dejarlo para la conversación, también está bien.',
    savedMessage:
      'Respuestas guardadas. El siguiente paso estará disponible pronto.',
    timelineOptions: {
      asap: 'Lo antes posible',
      oneMonth: 'En aproximadamente un mes',
      oneToThreeMonths: 'En 1 a 3 meses',
      flexible: 'No hay apuro; soy flexible',
      unsure: 'Todavía no lo tengo claro',
    },
    investmentOptions: {
      starter: {
        label: 'Un punto de partida contenido',
        description: 'Orientativo: hasta ~USD 1.000',
      },
      focused: {
        label: 'Un proyecto de alcance medio',
        description: 'Orientativo: ~USD 1.000 – 2.500',
      },
      complete: {
        label: 'Algo más completo',
        description: 'Orientativo: ~USD 2.500 – 5.000',
      },
      open: {
        label: 'Estoy abierto a una inversión más amplia',
        description: 'Orientativo: más de ~USD 5.000',
      },
      discuss: {
        label: 'Prefiero hablarlo después',
        description: 'Sin problema: lo vemos juntos en la conversación.',
      },
    },
  },
  extrasStep: {
    listenLabel: 'Nos interesa especialmente si podés contar…',
    listenPoints: [
      'Algo que no entró en las preguntas anteriores',
      'Una restricción, fecha o contexto que cambia el enfoque',
      'Cómo imaginás el resultado o qué te preocupa evitar',
    ],
    promptsLabel: 'Si te sirve, empezá por uno de estos temas',
    promptsHint: 'Tocá una idea para abrir el hilo. Podés sumar más de una.',
    writeLabel: 'Escribí con tus palabras',
    writePlaceholder:
      'Por ejemplo: “Tenemos un evento en octubre y necesitamos estar online antes…”, “Ya intentamos con otra web y no funcionó porque…”, “Lo más importante para mí es…”',
    writeHint:
      'No hace falta que sea perfecto. Si no hay nada más, podés continuar igual.',
    readingNote: 'Gracias: esto lo leemos al armar tu propuesta.',
    savedMessage:
      'Gracias por contarnos. El siguiente paso estará disponible pronto.',
    prompts: {
      deadline: {
        label: 'Hay una fecha o evento importante',
        seed: 'Fecha o evento importante:',
      },
      priorWork: {
        label: 'Ya tengo experiencia previa con esto',
        seed: 'Experiencia previa / web actual:',
      },
      mustHave: {
        label: 'Hay algo que no puede faltar',
        seed: 'No puede faltar:',
      },
      concern: {
        label: 'Tengo una duda o preocupación',
        seed: 'Duda o preocupación:',
      },
      vision: {
        label: 'Quiero contar cómo imagino el resultado',
        seed: 'Cómo imagino el resultado:',
      },
    },
  },
  fields: {
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    company: 'Nombre del negocio',
    industry: 'Industria',
    hasWebsite: '¿Tenés una página web?',
    website: 'URL del sitio',
    projectType: 'Tipo de proyecto',
    goals: '¿Qué problema u oportunidad querés resolver?',
    expectedOutcome: '¿Cómo sabrías que el proyecto funcionó?',
    logo: 'Logo',
    photos: 'Fotografías',
    texts: 'Textos',
    visualIdentity: 'Colores y tipografías',
    needsContentHelp: 'Ayuda con materiales',
    designStyle: 'Estilo visual',
    designStyleNote: 'Detalle del estilo',
    hasReferences: '¿Tenés referencias?',
    referenceUrls: 'Páginas o sitios de referencia',
    designTaste: '¿Hay algo que te guste o quieras evitar?',
    infraStatus: 'Qué tenés hoy listo',
    domainName: 'Nombre del dominio',
    corporateEmailStatus: 'Correo con dominio',
    siteMaintenance: 'Quién mantiene y actualiza el sitio',
    timeline: 'Cuándo lo necesitás',
    investmentRange: 'Rango de inversión',
    additionalNotes: 'Lo que todavía no preguntamos',
  },
  validation: {
    required: 'Este campo es obligatorio',
    emailInvalid: 'Ingresa un email válido',
    urlInvalid: 'Ingresá al menos una URL o dominio de referencia',
    phoneInvalid: 'Ingresa un teléfono válido',
    minLength: 'Debe tener al menos {min} caracteres',
    selectAtLeastOne: 'Selecciona al menos una opción',
  },
};
