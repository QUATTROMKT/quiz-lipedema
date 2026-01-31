import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, AlertTriangle, Heart, Star, AlertCircle, Utensils, Shirt } from 'lucide-react';

// --- CONFIGURAÇÃO DO CHECKOUT ---
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?checkoutMode=10&bid=1769833970670";

// --- FUNÇÃO DE RASTREAMENTO SEGURO (PIXEL) ---
const trackPixel = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, data);
    console.log(`📡 Pixel Disparado: ${event}`, data);
  }
};

// --- COMPONENTE VTURB ---
const VTurbPlayer = ({ videoId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; 
      const smartPlayer = document.createElement('vturb-smartplayer');
      smartPlayer.id = `vid-${videoId}`;
      smartPlayer.style.cssText = "display: block; margin: 0 auto; width: 100%; max-width: 400px;";
      containerRef.current.appendChild(smartPlayer);

      const script = document.createElement('script');
      script.src = `https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/${videoId}/v4/player.js`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [videoId]);

  return <div ref={containerRef} className="w-full my-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white" />;
};

// --- DADOS DO QUIZ ---
const steps = [
  {
    type: 'intro',
    title: 'ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS',
    subtitle: 'Responde este test rápido de 2 minutos y recibe el Protocolo Lipedema: Adiós en 22 Días.',
    image: '/capa-quiz.webp', 
    buttonText: 'INICIAR CONSULTA',
    footer: '⚠️ Solo una consulta está disponible. Si sales de esta página, perderás esta oportunidad.'
  },
  {
    type: 'question',
    progress: 5,
    title: '¿Hace cuánto tiempo convives con el lipedema?',
    options: [
      { label: 'Lo descubrí hace poco', sub: 'Actuar desde ahora es vital.', icon: <Clock className="text-purple-600" /> },
      { label: 'Hace más de 1 año', sub: 'Cuanto antes empieces, mejor.', icon: <Calendar className="text-purple-600" /> },
      { label: 'Hace más de 3 años', sub: 'La hinchazón afecta tu bienestar.', icon: <AlertTriangle className="text-yellow-500" /> },
      { label: 'Hace más de 5 años', sub: 'Tu cuerpo pide ayuda urgente.', icon: <Heart className="text-red-500" /> }
    ]
  },
  {
    type: 'question',
    progress: 10,
    title: '¿Con qué frecuencia te sientes incómoda con tus piernas?',
    options: [
      { label: 'Casi todos los días', icon: '😢' },
      { label: 'Algunas veces a la semana', icon: '😞' },
      { label: 'De vez en cuando', icon: '😐' },
      { label: 'En general, me siento bien', icon: '😊' }
    ]
  },
  {
    type: 'question',
    progress: 15,
    title: '¿Con qué frecuencia sientes dolor en las piernas?',
    options: [
      { label: 'Siento dolor casi todo el tiempo', icon: '😭' },
      { label: 'Siento dolor de vez en quando', icon: '😩' },
      { label: 'No siento dolor', icon: '😊' }
    ]
  },
  {
    type: 'question',
    progress: 20,
    title: '¿Tienes alguna restricción alimentaria?',
    options: [
      { label: 'Sí, tengo restricciones', icon: <Utensils /> },
      { label: 'No, como de todo', icon: '😋' },
      { label: 'Algunos alimentos me caen mal', icon: '🤢' },
      { label: 'No estoy segura', icon: '🤔' }
    ]
  },
  {
    type: 'question',
    progress: 25,
    title: '¿Tienes dificultad para encontrar ropa que se ajuste bien?',
    options: [
      { label: 'Sí, casi nunca encuentro', icon: <Shirt /> },
      { label: 'Solo con pantalones/shorts', icon: '👖' },
      { label: 'He dejado de intentar comprar', icon: '👜' },
      { label: 'No, compro sin problemas', icon: '😊' }
    ]
  },
  {
    type: 'question',
    progress: 30,
    title: '¿Sientes hinchazón en las piernas, brazos o caderas?',
    image: '/inchaco.webp',
    options: [
      { label: 'Sí, suelen estar hinchadas', icon: '😮' },
      { label: 'Sí, além disso sinto dor', icon: '😫' },
      { label: 'No, mis piernas se sienten bien', icon: '😊' }
    ]
  },
  {
    type: 'question',
    progress: 35,
    title: '¿Sientes dolor al tocar tus piernas, caderas o brazos?',
    image: '/dor-toque.webp',
    options: [
      { label: 'Sí, siento dolor con frecuencia', icon: '😭' },
      { label: 'Sí, pero el dolor es leve', icon: '😣' },
      { label: 'De vez en cuando', icon: '😟' },
      { label: 'No, no siento dolor', icon: '😊' }
    ]
  },
  {
    type: 'image-question-single',
    progress: 40,
    title: '¿Notas marcas profundas en las piernas al quitarte la ropa?',
    image: '/marcas-pernas.webp',
    options: [
      { label: 'Sí, muy parecidas a la imagen', icon: '😭' },
      { label: 'A veces, depende de la ropa', icon: '😩' },
      { label: 'Se marcan, pero no tanto', icon: '😕' },
      { label: 'No, esto no me sucede', icon: '😊' }
    ]
  },
  // --- VIDEO 1 (TRACKING VSL) ---
  {
    type: 'video',
    progress: 50,
    title: '💡 Mira esta explicación rápida 👇',
    subtitle: 'Si el audio no se reproduce automáticamente, haz clic para escuchar.',
    videoId: '697c366c02e0aee2dde139e2'
  },
  {
    type: 'info',
    theme: 'purple',
    title: 'ATENCIÓN',
    content: 'Las próximas preguntas son muy importantes para evaluar si estás lista para reducir medidas en 22 días.',
    image: '/atencao.webp',
    buttonText: 'CONTINUAR CONSULTA'
  },
  {
    type: 'image-selection',
    progress: 60,
    title: '¿En qué etapa está tu lipedema hoy?',
    image: '/estagios.webp',
    options: [
      { label: 'Estadio 1 | 2', sub: 'Fase inicial/media' },
      { label: 'Estadio 3 | 4', sub: 'Fase avanzada' }
    ]
  },
  {
    type: 'info',
    theme: 'news',
    title: 'Especialistas en Salud revelan:',
    content: 'Un nuevo protocolo puede eliminar la grasa inflamada en hasta 22 días.',
    image: '/noticia.webp',
    buttonText: 'CONTINUAR CONSULTA'
  },
  {
    type: 'question',
    progress: 75,
    title: '¿Conoces los alimentos y suplementos que ayudan?',
    image: '/alimentos.webp',
    options: [
      { label: 'No, nunca he escuchado', icon: '🤭' },
      { label: 'He escuchado algo', icon: '🤔' },
      { label: 'Sí, pero tengo dudas', icon: '🧐' },
      { label: 'Sí, conozco el tema', icon: '🥗' }
    ]
  },
  {
    type: 'info',
    theme: 'white',
    title: '¿LO SABÍAS?',
    content: 'Sin una alimentación adecuada, las células de grasa inflamada pueden seguir empeorando. Cirugías y drenajes no abordan la causa real.',
    image: '/sabias-que.webp',
    buttonText: 'CONTINUAR CONSULTA'
  },
  // --- VIDEO 2 (TRACKING VSL) ---
  {
    type: 'video',
    progress: 90,
    title: 'Antes de continuar, déjame presentarme...',
    videoId: '697c36775c7f3683791b5a5a'
  },
  {
    type: 'loading',
    title: 'Cargando, espere...',
    subtitle: 'Generando protocolo personalizado de acuerdo con sus respuestas.'
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [showContinue, setShowContinue] = useState(true); 
  const stepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  // --- EFEITO DE RASTREAMENTO E LÓGICA DE PASSOS ---
  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. RASTREAMENTO INICIAL (VIEW CONTENT)
    if (currentStep === 0) {
      trackPixel('ViewContent', { content_name: 'Inicio_Quiz' });
    }

    // 2. RASTREAMENTO DE VÍDEO
    if (stepData.type === 'video') {
      trackPixel('ViewContent', { content_name: `VSL_Passo_${currentStep}` });
      
      // Delay do botão (10 segundos)
      setShowContinue(false); 
      const timer = setTimeout(() => {
        setShowContinue(true); 
      }, 10000); 
      return () => clearTimeout(timer);
    } else {
      setShowContinue(true); 
    }

    // 3. RASTREAMENTO DE FINALIZAÇÃO (SUBMIT APPLICATION)
    if (stepData.type === 'loading') {
      trackPixel('SubmitApplication'); // Marca que terminou o quiz
      const timer = setTimeout(() => setShowOffer(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [stepData, currentStep]);

  // --- TELA DA OFERTA (FINAL) ---
  if (showOffer) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-8 font-sans">
        {/* HEADER */}
        <div className="w-full bg-white shadow-sm py-4 flex justify-center sticky top-0 z-50">
           <img src="/logo.webp" alt="Protocolo Lipedema" className="h-10 object-contain" />
        </div>

        <div className="w-full max-w-md px-4 mt-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 pb-2 text-center border-b border-gray-100">
              <h2 className="text-xl font-black text-gray-900 leading-tight">
                ¡Protocolo personalizado generado con éxito!
              </h2>
            </div>

            <div className="p-4 relative">
               <div className="flex justify-center gap-2 mb-2 text-[10px] font-bold text-white uppercase tracking-wider">
                 <span className="bg-red-500 px-2 py-1 rounded shadow-sm">❌ Antes</span>
                 <span className="bg-green-500 px-2 py-1 rounded shadow-sm">✅ Después</span>
              </div>
              <img src="/resultado.webp" className="w-full rounded-xl shadow-md" alt="Resultado" />
            </div>

            <div className="px-6 space-y-4">
               <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-3">
                  <AlertCircle className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-800 font-medium">Resultado: <span className="font-bold underline">Preocupante</span>. Necesitas actuar rápido.</p>
               </div>

               <div className="flex flex-col items-center">
                  <p className="text-xs font-bold text-gray-700 mb-2 w-full text-left">Nivel de gravedad de su caso:</p>
                  <img src="/grafico-gravidade.webp" className="w-32 mx-auto animate-pulse" alt="91%" />
               </div>
            </div>

            <div className="p-6 mt-4 bg-gray-50 border-t border-gray-200">
               <div className="bg-yellow-100 border-2 border-dashed border-yellow-300 p-4 rounded-xl text-center mb-6">
                  <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Oferta Especial Hoy</p>
                  <div className="flex items-center justify-center gap-2">
                     <span className="text-gray-400 line-through text-lg">USD 285</span>
                     <span className="text-4xl font-black text-green-600">USD 9,90</span>
                  </div>
               </div>

               {/* 🚨 BOTÃO DE CHECKOUT COM TRACKING 🚨 */}
               <a 
                 href={CHECKOUT_LINK}
                 onClick={() => trackPixel('InitiateCheckout')}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center font-black py-4 rounded-xl text-lg shadow-xl shadow-purple-200 transition-transform active:scale-95 animate-pulse"
               >
                 ¡QUIERO EL PROTOCOLO! 🌿
               </a>
               
               <div className="flex justify-center mt-6">
                  <img src="/garantia.webp" className="w-24 object-contain" alt="7 dias garantia" />
               </div>
            </div>

            <div className="p-5 bg-white border-t border-gray-100">
               <div className="flex gap-1 text-yellow-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <p className="text-xs text-gray-600 italic">"Nunca pensé que algo tan simple cambiaría mi vida. En solo 22 días mi dolor bajó."</p>
               <p className="text-xs font-bold text-gray-900 mt-2">- Laura Martínez</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO DO QUIZ ---
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans text-gray-800">
      <div className="w-full bg-white shadow-sm py-4 flex justify-center sticky top-0 z-40">
         <img src="/logo.webp" alt="Protocolo Lipedema" className="h-8 object-contain" />
      </div>

      <div className="w-full max-w-md p-4 flex-1 flex flex-col">
        {stepData.progress && (
          <div className="w-full bg-gray-100 h-2 rounded-full mb-6 mt-2">
            <motion.div 
              className="bg-purple-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stepData.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* INTRO */}
            {stepData.type === 'intro' && (
              <div className="space-y-6 text-center pt-2">
                <h1 className="text-xl font-black text-purple-900 uppercase leading-tight">{stepData.title}</h1>
                <p className="text-gray-600 text-sm px-2">{stepData.subtitle}</p>
                <img src={stepData.image} className="w-full rounded-xl shadow-lg" alt="Capa" />
                <button onClick={handleNext} className="w-full bg-purple-600 text-white font-black py-4 rounded-xl text-lg shadow-lg hover:bg-purple-700 transition-all">
                  {stepData.buttonText}
                </button>
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-100">
                  {stepData.footer}
                </div>
              </div>
            )}

            {/* QUESTIONS */}
            {stepData.type === 'question' && (
              <div className="space-y-6 pt-4">
                <h2 className="text-xl font-black text-center leading-tight">{stepData.title}</h2>
                {stepData.image && <img src={stepData.image} className="w-full rounded-xl shadow-md" alt="Ilustração" />}
                <div className="space-y-3">
                  {stepData.options.map((opt, i) => (
                    <button key={i} onClick={handleNext} className="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all flex items-center gap-4 text-left group active:scale-[0.98]">
                      <div className="text-2xl bg-white p-2 rounded-full shadow-sm">
                        {opt.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{opt.label}</p>
                        {opt.sub && <p className="text-xs text-gray-500">{opt.sub}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* IMAGE QUESTIONS */}
            {(stepData.type === 'image-question-single' || stepData.type === 'image-selection') && (
              <div className="space-y-6 pt-4">
                <h2 className="text-xl font-black text-center leading-tight">{stepData.title}</h2>
                <img src={stepData.image} className="w-full rounded-xl shadow-md mb-2" alt="Exemplo" />
                
                <div className={stepData.type === 'image-selection' ? "grid grid-cols-2 gap-4" : "space-y-3"}>
                  {stepData.options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={handleNext} 
                      className={`
                        ${stepData.type === 'image-selection' 
                          ? "bg-white border-2 border-gray-100 p-4 rounded-2xl hover:border-purple-500 hover:bg-purple-50 text-center"
                          : "w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 flex items-center gap-3 text-left"
                        } transition-all
                      `}
                    >
                       {stepData.type === 'image-question-single' && <span className="text-xl">{opt.icon}</span>}
                       <div className="flex-1">
                          <p className={`font-bold ${stepData.type === 'image-selection' ? 'text-purple-700' : 'text-gray-800 text-sm'}`}>
                            {opt.label}
                          </p>
                          {opt.sub && <p className="text-xs text-gray-500">{opt.sub}</p>}
                       </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* INFO SCREENS */}
            {stepData.type === 'info' && (
              <div className="flex-1 flex flex-col">
                {stepData.theme === 'news' && (
                   <div className="bg-red-600 text-white text-center font-black py-3 -mx-4 mb-6 uppercase tracking-widest text-lg">SALUD</div>
                )}
                {stepData.theme === 'purple' && (
                   <div className="bg-purple-600 text-white text-center font-bold py-1 px-4 rounded mb-4 w-fit mx-auto uppercase">ATENCIÓN</div>
                )}
                {stepData.theme === 'white' && (
                   <div className="text-center mb-2"><span className="bg-yellow-100 text-yellow-800 font-bold py-1 px-3 rounded text-xs uppercase">Información Importante</span></div>
                )}
                
                <h2 className={`font-black text-center mb-4 ${stepData.theme === 'news' ? 'text-xl text-red-700' : 'text-xl text-gray-900'}`}>
                  {stepData.title}
                </h2>
                <p className="text-center text-gray-700 mb-6 font-medium leading-relaxed px-2">
                  {stepData.content}
                </p>
                {stepData.image && <img src={stepData.image} className="w-full rounded-xl mb-6 shadow-md" alt="Info" />}
                
                <button onClick={handleNext} className="w-full bg-purple-600 text-white font-black py-4 rounded-xl shadow-lg mt-auto hover:bg-purple-700 transition-transform active:scale-95">
                   {stepData.buttonText}
                </button>
              </div>
            )}

            {/* VIDEO VTURB COM DELAY DE 10S */}
            {stepData.type === 'video' && (
              <div className="text-center space-y-4 pt-4">
                <h2 className="text-lg font-bold flex items-center justify-center gap-2">
                   {stepData.title}
                </h2>
                <p className="text-xs text-gray-500">{stepData.subtitle}</p>
                
                <VTurbPlayer videoId={stepData.videoId} />

                {/* BOTÃO APARECE APÓS 10s */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showContinue ? 1 : 0, y: showContinue ? 0 : 10 }}
                  transition={{ duration: 0.5 }}
                >
                  {showContinue && (
                    <button 
                      onClick={handleNext} 
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg mt-4 animate-bounce"
                    >
                      Continuar →
                    </button>
                  )}
                </motion.div>
                
                {!showContinue && (
                  <p className="text-xs text-gray-300 animate-pulse mt-4">Por favor, espera unos segundos...</p>
                )}
              </div>
            )}

            {/* LOADING */}
            {stepData.type === 'loading' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center pb-20 pt-10">
                <div className="w-20 h-20 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-black text-gray-800 animate-pulse">{stepData.title}</h2>
                <p className="text-gray-500 mt-2 px-6">{stepData.subtitle}</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
        
        <footer className="mt-10 text-center text-[10px] text-gray-400 py-4 border-t border-gray-100">
           © 2026 - Criado via inlead.digital | Central de anúncios
        </footer>
      </div>
    </div>
  );
}