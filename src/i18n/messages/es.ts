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
      title: 'Negocio',
      description: 'Cuéntanos sobre tu empresa o marca.',
    },
    'project-type': {
      title: 'Tipo de proyecto',
      description: 'Qué necesitas construir.',
    },
    goals: {
      title: 'Objetivos',
      description: 'Qué quieres lograr con este proyecto.',
    },
    features: {
      title: 'Funcionalidades',
      description: 'Capacidades clave que debe incluir.',
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
  fields: {
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    company: 'Empresa / marca',
    industry: 'Industria',
    website: 'Sitio web actual',
    projectType: 'Tipo de proyecto',
    projectTypeOptions: {
      website: 'Sitio web',
      webApp: 'Aplicación web / sistema',
      ecommerce: 'E-commerce',
      redesign: 'Rediseño',
      other: 'Otro',
    },
    goals: 'Objetivos principales',
    targetAudience: 'Público objetivo',
    features: 'Funcionalidades deseadas',
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
