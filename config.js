/* ==========================================================================
   CONFIGURACIÓN INICIAL DEL MENÚ
   Lo normal es configurar todo desde el panel:  http://localhost:8090/config
   Este archivo solo se usa la primera vez (o si abres index.html sin servidor).
   ========================================================================== */

window.MENU_CONFIG = {
  /* ---------- Datos del negocio ---------- */
  negocio: {
    nombre: "Casa Brasa",
    eslogan: "Cocina de fuego lento",
    horario: "Mar – Dom · 13:00 a 23:00",
  },

  /* ---------- Qué se muestra ---------- */
  mostrar: {
    precio: true,        // se ve el precio
    imagen: true,        // cada platillo lleva imagen
    descripcion: true,   // texto debajo del nombre
    etiquetas: true,     // "Picante", "Vegano", etc.
    reloj: true,         // hora en la esquina superior
    horario: true,       // píldora con el horario
    eslogan: true,       // texto bajo el nombre del negocio
  },

  /* ---------- Cómo se muestra ---------- */
  vista: "cuadricula",   // "cuadricula" (tarjetas grandes) o "lista" (estilo pizarrón)
  tema: "oscuro",        // "oscuro" o "claro"
  colores: { acento: "#ff8a3d", acento2: "#ffc46b" },
  moneda: { simbolo: "$", decimales: 0 },

  /* ---------- La pantalla ---------- */
  pantalla: {
    orientacion: "horizontal", // "horizontal" (TV normal) o "vertical" (TV girada)
    segundosPorPagina: 12,     // cuánto tiempo se queda cada página
    transicion: "elevar",      // "elevar", "deslizar", "zoom" o "desvanecer"
    platillosPorPagina: { cuadricula: 6, lista: 7 },
    agotados: "marcar",        // "marcar" (sello Agotado) u "ocultar"
    recargarCadaMinutos: 0,    // 0 = nunca (con el servidor los cambios llegan al instante)
  },

  /* ---------- Barra de abajo ---------- */
  barra: {
    progreso: true,            // pestañas de categorías con barra de avance
    promociones: true,         // cinta animada con promociones
    velocidad: 70,             // velocidad de la cinta (px por segundo)
    estilo: "acento",          // "acento" (color de marca) u "oscuro"
  },

  /* ---------- Textos de la cinta de promociones ---------- */
  promociones: [
    "🍹 2×1 en margaritas de 18:00 a 20:00",
    "🔥 Martes de arrachera: 20 % de descuento",
    "🎂 ¿Cumpleaños? El postre va por nuestra cuenta",
    "📶 Wi-Fi gratis · Pregunta a tu mesero",
  ],

  /* ---------- Categorías y platillos ----------
     imagen: URL o ruta local (ej. "img/tacos.jpg"). Si falla, se usa el emoji.
     Para una pantalla sin internet, usa fotos locales en la carpeta img/.
     destacado: true pone la insignia "Favorito".                               */
  categorias: [
    {
      id: "entradas",
      nombre: "Entradas",
      emoji: "🥑",
      platillos: [
        {
          nombre: "Guacamole al molcajete",
          descripcion: "Aguacate Hass, chile serrano, cebolla morada y totopos recién hechos.",
          precio: 145,
          imagen: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=900&q=75",
          emoji: "🥑",
          etiquetas: ["Vegano"],
          destacado: true,
        },
        {
          nombre: "Queso fundido con chorizo",
          descripcion: "Mezcla de quesos chihuahua y asadero, chorizo de la casa y tortillas de harina.",
          precio: 160,
          imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&q=75",
          emoji: "🧀",
          etiquetas: [],
        },
        {
          nombre: "Ensalada de la huerta",
          descripcion: "Hojas tiernas, betabel rostizado, nuez garapiñada y vinagreta de miel.",
          precio: 130,
          imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=75",
          emoji: "🥗",
          etiquetas: ["Vegetariano"],
        },
      ],
    },
    {
      id: "fuertes",
      nombre: "Platos fuertes",
      emoji: "🔥",
      platillos: [
        {
          nombre: "Rib eye a la leña",
          descripcion: "400 g de corte madurado, mantequilla de chiles tatemados y papas cambray.",
          precio: 520,
          imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=75",
          emoji: "🥩",
          etiquetas: [],
          destacado: true,
        },
        {
          nombre: "Tacos de arrachera",
          descripcion: "Tres tacos en tortilla de maíz azul, salsa de molcajete y cebollitas asadas.",
          precio: 210,
          imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&q=75",
          emoji: "🌮",
          etiquetas: ["Picante"],
        },
        {
          nombre: "Hamburguesa Brasa",
          descripcion: "Carne de res 200 g, queso cheddar añejo, tocino y pan brioche.",
          precio: 235,
          imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=75",
          emoji: "🍔",
          etiquetas: [],
        },
        {
          nombre: "Pasta al pomodoro",
          descripcion: "Spaghetti, tomate San Marzano, albahaca fresca y parmesano.",
          precio: 190,
          imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&q=75",
          emoji: "🍝",
          etiquetas: ["Vegetariano"],
        },
      ],
    },
    {
      id: "postres",
      nombre: "Postres",
      emoji: "🍰",
      platillos: [
        {
          nombre: "Churros con cajeta",
          descripcion: "Churros crujientes con azúcar y canela, cajeta de Celaya tibia.",
          precio: 95,
          imagen: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?w=900&q=75",
          emoji: "🍩",
          etiquetas: [],
          destacado: true,
        },
        {
          nombre: "Pastel de chocolate",
          descripcion: "Bizcocho húmedo de cacao 70 % con ganache y frutos rojos.",
          precio: 110,
          imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=75",
          emoji: "🍫",
          etiquetas: [],
        },
      ],
    },
    {
      id: "bebidas",
      nombre: "Bebidas",
      emoji: "🍹",
      platillos: [
        {
          nombre: "Agua de jamaica",
          descripcion: "Natural, endulzada con piloncillo. Jarra de 1 L.",
          precio: 65,
          imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=900&q=75",
          emoji: "🌺",
          etiquetas: ["Sin alcohol"],
        },
        {
          nombre: "Margarita de tamarindo",
          descripcion: "Tequila blanco, tamarindo natural, escarchado de chile.",
          precio: 140,
          imagen: "https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=900&q=75",
          emoji: "🍸",
          etiquetas: ["Picante"],
          destacado: true,
        },
        {
          nombre: "Café de olla",
          descripcion: "Café de Veracruz con canela y piloncillo, servido en jarrito.",
          precio: 55,
          imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=75",
          emoji: "☕",
          etiquetas: [],
        },
      ],
    },
  ],
};
