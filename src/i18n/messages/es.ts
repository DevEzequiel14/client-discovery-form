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
      'Recibimos tu información. Te escribimos en 1–2 días hábiles con una propuesta clara.',
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
    hint: 'Si algo no está bien, editalo y volvés acá.',
    afterSend: 'Después de enviar, te escribimos con los próximos pasos. No hay compromiso.',
    privacyNote:
      'Usamos estos datos solo para responderte y preparar tu propuesta.',
  },
  thanks: {
    headline: 'Bien, ya tenemos tu información.',
    supporting:
      'Vamos a leer con atención y a partir de acá armamos una propuesta clara. Te escribimos en 1–2 días hábiles. Gracias.',
    referenceLabel: 'Referencia',
    ctaPrimary: 'Volver al inicio',
    ctaNote: 'También podés cerrar esta pestaña sin problema.',
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
      description: '',
    },
    extras: {
      title: '¿Algo más?',
      description: '',
    },
    review: {
      title: 'Revisá tu información',
      description: '',
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
    timelineHint: 'Una idea aproximada alcanza; después lo afinamos.',
    investmentLegend: '¿En qué rango te sentís cómodo invertir?',
    investmentHint:
      'Orientativo, no es un compromiso. Si preferís, lo hablamos después.',
    savedMessage:
      'Respuestas guardadas. El siguiente paso estará disponible pronto.',
    timelineOptions: {
      asap: 'Lo antes posible',
      oneToThreeMonths: 'En 1 a 3 meses',
      flexible: 'Sin apuro',
      unsure: 'Todavía no lo sé',
    },
    investmentOptions: {
      starter: 'Hasta ~USD 1.000',
      focused: '~USD 1.000 – 2.500',
      complete: '~USD 2.500 – 5.000',
      open: 'Más de ~USD 5.000',
      discuss: 'Prefiero hablarlo después',
    },
  },
  extrasStep: {
    promptsLabel: 'Si te ayuda:',
    writeLabel: '¿Hay algo que debamos saber?',
    writePlaceholder: 'Ej. Necesitamos estar online antes de octubre…',
    writeHint: 'Opcional. Si no hay nada más, podés seguir.',
    savedMessage:
      'Gracias por contarnos. El siguiente paso estará disponible pronto.',
    prompts: {
      deadline: {
        label: 'Fecha o evento',
        seed: 'Fecha o evento: ',
      },
      mustHave: {
        label: 'No puede faltar',
        seed: 'No puede faltar: ',
      },
      concern: {
        label: 'Duda o preocupación',
        seed: 'Duda o preocupación: ',
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
