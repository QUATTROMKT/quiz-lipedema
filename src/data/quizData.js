// src/data/quizData.js

export const quizSteps = [
  {
    id: 1,
    type: 'intro',
    imgSrc: "/capa.webp",
    headline: "ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS",
    subheadline: "Responde este test rápido de 2 minutos y recibe el Protocolo Lipedema: Adiós en 22 Días, un método guiado y personalizado por la Dra. Lilian.",
    buttonText: "INICIAR CONSULTA",
    footerAlert: "Solo una consulta está disponible. Si sales de esta página, perderás esta oportunidad."
  },
  {
    id: 2,
    type: 'question',
    headline: "¿Cuántos vasos de agua sueles beber al día?",
    subheadline: "Elige la opción que mejor te represente.",
    options: [
      { label: "Menos de 2 vasos al día", sub: "(Casi no bebo agua, rara vez me acuerdo)", icon: "🌵" },
      { label: "Entre 2 y 4 vasos al día", sub: "(Bebo agua, pero sé que es poco)", icon: "💧" },
      { label: "Entre 5 y 7 vasos al día", sub: "(Intento beber más agua, pero no siempre mantengo el hábito)", icon: "💦" },
      { label: "Entre 8 y 10 vasos al día", sub: "(Bebo bastante agua, aunque todavía tengo dudas si es lo ideal)", icon: "🚰" },
      { label: "Más de 10 vasos al día", sub: "(Bebo agua todos los días y mantengo este hábito sin dificultad)", icon: "🌊" }
    ]
  },
  {
    id: 3,
    type: 'question',
    headline: "¿Cómo es tu rutina de actividad física hoy?",
    subheadline: "Selecciona la opción que mejor te describa:",
    options: [
      { label: "Sedentaria, no hago ejercicio", sub: "La falta de movimiento puede hacer que el lipedema empeore con el tiempo...", icon: "🐌" },
      { label: "Camino regularmente", sub: "Caminar es positivo, pero sin un enfoque específico puede no ser suficiente.", icon: "🚶‍♀️" },
      { label: "Hago ejercicio al menos 3 veces por semana", sub: "Mantenerte activa ayuda, pero sin controlar la inflamación es difícil ver cambios.", icon: "🏋️‍♀️" },
      { label: "Entreno casi todos los días", sub: "Incluso siendo activa, sin un enfoque adecuado, la hinchazón puede aumentar.", icon: "💪" }
    ]
  },
  {
    id: 4,
    type: 'comparison',
    headline: "¿En qué etapa está tu lipedema hoy?",
    subheadline: "Selecciona una de las opciones a continuación:",
    options: [
      { 
        id: 'e1', 
        label: "Estadio 1 | 2", 
        img: "/estagio-1.webp", 
        desc: "En esta etapa, actuar a tiempo es clave para evitar que el lipedema avance." 
      },
      { 
        id: 'e2', 
        label: "Estadio 3 | 4", 
        img: "/estagio-2.webp", 
        desc: "En esta etapa, el lipedema ya está más avanzado y puede seguir empeorando." 
      }
    ]
  },
  {
    id: 5,
    type: 'advertorial',
    category: "SALUD",
    tag: "LIPEDEMA",
    headline: "Un nuevo protocolo puede eliminar la grasa inflamada en las piernas, conocida como lipedema, en hasta 22 días.",
    author: "Sofia Ramirez",
    content: [
      "Un nuevo enfoque creado por especialistas en metabolismo femenino está revolucionando el tratamiento del lipedema...",
      "El método combina alimentos antiinflamatorios con compuestos bioactivos que actúan directamente en la raíz...",
      "Según relatos, es posible eliminar hasta 4 kg de grasa inflamada en menos de 3 semanas sin cirugía."
    ],
    imgSrc: "/noticia.webp",
    buttonText: "CONTINUAR CONSULTA"
  },
  // ... (Repetir o padrão para os demais passos conforme os prints 6 ao 21)
  {
    id: 22,
    type: 'loading',
    headline: "Analizando su consulta...",
    subheadline: "Estoy analizando su consulta y preparando su informe...",
    targetStep: 23
  },
  {
    id: 27,
    type: 'fear_sequence',
    headline: "Vea lo que sucede cuando el lipedema no se trata a tiempo...",
    blocks: [
      { title: "El lipedema solo empeora con el tiempo.", text: "Las piernas están cada vez más hinchadas, desproporcionadas y doloridas...", img: "/evolucao.webp" },
      { title: "Su movilidad disminuye cada vez más.", text: "El peso en las piernas y caderas limita sus movimientos...", img: "/mobilidade.webp" },
      { title: "El lipedema puede evolucionar a algo aún más grave: el linfedema.", text: "Cuando la hinchazón empeora, las piernas pueden deformarse permanentemente...", img: "/medo-3.webp" },
      { title: "Los dolores tienden a intensificarse cada vez más.", text: "Sin el tratamiento adecuado, el dolor se vuelve constante e insoportable...", img: "/medo-4.webp" }
    ],
    buttonText: "FINALIZAR CONSULTA Y ACCEDER AL PROTOCOLO"
  }
];