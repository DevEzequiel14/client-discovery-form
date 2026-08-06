import type { Messages } from '../types';

export const es: Messages = {
  meta: {
    brandLabel: 'Presupuesto web',
    homeTitle: 'Cuéntanos tu proyecto',
    homeDescription:
      'Completá estas preguntas antes de pedir un presupuesto para tu sitio web o sistema.',
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
    headline: 'Cuéntanos tu proyecto',
    supporting:
      'Completá estas preguntas para que podamos entender objetivos, alcance y plazos antes de armarte una propuesta.',
    timeEstimate: 'Tarda unos 5–8 minutos.',
    nextStep: 'Después te escribimos con los próximos pasos.',
  },
  form: {
    progressLabel: 'Progreso del formulario',
    stepOf: 'Paso {current} de {total}',
    reviewTitle: 'Revisión',
    reviewHint: 'Verifica tus respuestas antes de enviar.',
    submitError: 'No pudimos enviar el formulario. Inténtalo de nuevo.',
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
      description:
        'Solo necesitamos estos datos para responderte. No compartimos tu información.',
    },
    business: {
      title: 'Contanos sobre tu negocio',
      description:
        'Con esta información entendemos el contexto de tu marca antes de hablar del proyecto.',
    },
    needs: {
      title: '¿Qué necesitás resolver?',
      description:
        'Empezamos por tu problema u objetivo. Después vemos qué tipo de proyecto encaja y qué resultado esperás.',
    },
    assets: {
      title: '¿Con qué materiales contás?',
      description:
        'Esto nos dice cuánto hay listo para producir y si hace falta acompañarte en contenidos y marca.',
    },
    design: {
      title: '¿Qué estilo visual buscás?',
      description:
        'Sin hablar de colores: queremos entender referencias, dirección estética y gustos.',
    },
    technical: {
      title: 'Algunos detalles prácticos',
      description:
        'Solo para entender cómo está hoy lo técnico y quién va a ocuparse del sitio después.',
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
    emailHint: 'Te escribimos a este correo con la respuesta.',
    phoneHint: 'Si preferís que te contactemos por WhatsApp o llamada.',
    privacyNote: 'Usamos estos datos únicamente para armarte el presupuesto.',
    savedMessage:
      'Datos guardados. El siguiente paso estará disponible pronto.',
  },
  businessStep: {
    companyPlaceholder: 'Ej. Estudio Norte',
    industryPlaceholder: 'Seleccioná una industria',
    industryHint: 'Elegí la que mejor represente tu actividad principal.',
    hasWebsiteLegend: '¿Tenés una página web?',
    hasWebsiteHint: 'Si ya existe un sitio, pedimos la URL para revisarlo.',
    websitePlaceholder: 'https://www.ejemplo.com',
    websiteHint: 'Incluí la URL completa, con https://',
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
      'Ej. Hoy dependemos del boca a boca y queremos captar consultas de forma constante…',
    goalsHint:
      'Contá el problema o la oportunidad. No hace falta hablar todavía de tecnología.',
    projectTypeLegend: '¿Qué tipo de proyecto imaginás?',
    projectTypeHint: 'Elegí la opción más cercana. Después lo afinamos juntos.',
    expectedOutcomePlaceholder:
      'Ej. Quiero recibir más consultas calificadas por mes y mostrar mis servicios con claridad…',
    expectedOutcomeHint:
      'Pensá en el resultado concreto que te haría decir “esto funcionó”.',
    savedMessage:
      'Necesidad registrada. El siguiente paso estará disponible pronto.',
    projectTypeOptions: {
      website: {
        label: 'Sitio web',
        description: 'Presencia online, páginas y contacto.',
      },
      webApp: {
        label: 'Aplicación o sistema',
        description: 'Flujos, usuarios y gestión de información.',
      },
      ecommerce: {
        label: 'Tienda online',
        description: 'Catálogo, pagos y ventas por internet.',
      },
      redesign: {
        label: 'Rediseño',
        description: 'Mejorar un sitio o sistema que ya existe.',
      },
      other: {
        label: 'Otro',
        description: 'Todavía no estás seguro o es una mezcla.',
      },
    },
  },
  assetsStep: {
    matrixLegend: 'Estado de cada material',
    matrixHint: 'Marcá la opción más cercana a tu situación actual.',
    helpLegend: '¿Querés que te ayudemos a crear o completar lo que falte?',
    helpHint:
      'Si preferís enfocarte en tu negocio, podemos encargarnos de contenidos y marca.',
    savedMessage:
      'Materiales registrados. El siguiente paso estará disponible pronto.',
    readiness: {
      ready: 'Listo',
      partial: 'Parcial',
      none: 'No tengo',
    },
    items: {
      logo: {
        label: 'Logo',
        hint: 'Archivo usable (SVG, PNG o AI), no solo una foto recortada.',
      },
      photos: {
        label: 'Fotografías',
        hint: 'Imágenes propias del negocio, productos o equipo.',
      },
      texts: {
        label: 'Textos',
        hint: 'Copy de servicios, acerca de, beneficios o propuestas.',
      },
      visualIdentity: {
        label: 'Identidad visual',
        hint: 'Colores, tipografías o estilo visual definidos.',
      },
      brandManual: {
        label: 'Manual de marca',
        hint: 'Documento con reglas de uso de la marca.',
      },
    },
  },
  designStep: {
    styleLegend: '¿Qué estilo se acerca más a lo que imaginás?',
    styleHint: 'Elegí la dirección general. Después lo afinamos con referencias.',
    urlsPlaceholder:
      'https://ejemplo.com\nhttps://otra-referencia.com/pagina',
    urlsHint:
      'Pegá una o más URLs de sitios o páginas que te gusten (una por línea).',
    tastePlaceholder:
      'Ej. Me gusta lo limpio y con buena tipografía. Prefiero evitar diseños cargados o muy corporativos…',
    tasteHint:
      'Contá qué te gusta, qué evitarías y la sensación que debería transmitir.',
    savedMessage:
      'Estilo registrado. El siguiente paso estará disponible pronto.',
    styleOptions: {
      minimal: {
        label: 'Minimalista',
        description: 'Espacio, claridad y pocos elementos.',
      },
      modern: {
        label: 'Moderno',
        description: 'Actual, limpio y con buen ritmo visual.',
      },
      classic: {
        label: 'Clásico',
        description: 'Sobrio, ordenado y atemporal.',
      },
      bold: {
        label: 'Impactante',
        description: 'Fuerte, expresivo y con mucha personalidad.',
      },
      elegant: {
        label: 'Elegante',
        description: 'Refinado, premium y cuidado en los detalles.',
      },
      friendly: {
        label: 'Cercano',
        description: 'Cálido, accesible y fácil de recorrer.',
      },
      editorial: {
        label: 'Editorial',
        description: 'Enfocado en tipografía, lectura y composición.',
      },
      other: {
        label: 'Otro / mezcla',
        description: 'No encaja en una sola categoría.',
      },
    },
  },
  technicalStep: {
    domainLegend: '¿Ya tenés un dominio para el sitio?',
    domainHint: 'Por ejemplo: tunegocio.com',
    domainNamePlaceholder: 'tunegocio.com',
    domainNameHint: 'Escribilo sin https://, solo el nombre del dominio.',
    hostingLegend: '¿Ya tenés un lugar donde hospedar el sitio?',
    hostingHint: 'Si no estás seguro, no hay problema: marcá esa opción.',
    emailLegend: '¿Usás o pensás usar correo con tu dominio?',
    emailHint: 'Por ejemplo: hola@tunegocio.com',
    adminLegend: 'Cuando el sitio esté online, ¿quién se va a ocupar del día a día?',
    adminHint: 'Publicar novedades, revisar mensajes o cosas simples del sitio.',
    updatesLegend: 'Y para cambios o actualizaciones más adelante, ¿quién se encargaría?',
    updatesHint: 'Textos, secciones nuevas o ajustes que puedan surgir con el tiempo.',
    savedMessage:
      'Detalles guardados. El siguiente paso estará disponible pronto.',
    domainOptions: {
      yes: 'Sí, ya lo tengo',
      buying: 'Lo estoy comprando',
      no: 'Todavía no',
      unsure: 'No estoy seguro',
    },
    hostingOptions: {
      yes: 'Sí, ya tengo',
      no: 'Todavía no',
      unsure: 'No estoy seguro',
    },
    emailOptions: {
      yes: 'Sí, ya lo uso',
      planning: 'Lo quiero configurar',
      no: 'Por ahora no',
    },
    roleOptions: {
      myself: 'Yo',
      team: 'Alguien de mi equipo',
      external: 'Una persona externa',
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
    goals: '¿Qué querés lograr?',
    expectedOutcome: '¿Qué esperás obtener?',
    logo: 'Logo',
    photos: 'Fotografías',
    texts: 'Textos',
    visualIdentity: 'Identidad visual',
    brandManual: 'Manual de marca',
    needsContentHelp: 'Ayuda con materiales',
    designStyle: 'Estilo visual',
    referenceUrls: 'Páginas o sitios de referencia',
    designTaste: 'Gustos y preferencias',
    domainStatus: 'Dominio',
    domainName: 'Nombre del dominio',
    hostingStatus: 'Lugar para hospedar el sitio',
    corporateEmailStatus: 'Correo con dominio',
    siteAdmin: 'Quién se ocupa del día a día',
    siteUpdates: 'Quién hace actualizaciones',
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
