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
    thanksTitle: '¡Gracias!',
    thanksDescription: 'Recibimos tu información. Te contactaremos pronto.',
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
  thanks: {
    headline: 'Solicitud recibida',
    supporting:
      'Revisaremos tu información y te escribiremos con los próximos pasos.',
    reference: 'Referencia',
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
      title: 'Diseño',
      description: 'Estilo, referencias e inspiración.',
    },
    'timeline-budget': {
      title: 'Plazos y presupuesto',
      description: 'Expectativas de tiempo e inversión.',
    },
    review: {
      title: 'Revisión',
      description: 'Confirma que todo esté correcto.',
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
    designStyle: 'Estilo de diseño',
    references: 'Referencias o enlaces',
    timeline: 'Plazo deseado',
    budget: 'Presupuesto estimado',
    additionalNotes: 'Notas adicionales',
  },
  validation: {
    required: 'Este campo es obligatorio',
    emailInvalid: 'Ingresa un email válido',
    urlInvalid: 'Ingresa una URL válida',
    phoneInvalid: 'Ingresa un teléfono válido',
    minLength: 'Debe tener al menos {min} caracteres',
    selectAtLeastOne: 'Selecciona al menos una opción',
  },
};
