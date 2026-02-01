import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, Star, Leaf, AlertTriangle, Menu, Search, Clock, Calendar, Heart, Play } from 'lucide-react';

// LINKS E CONFIGURAÇÕES
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; 
const VIDEO_DRA_ID = "697c366c02e0aee2dde139e2"; // VSL 1
const VIDEO_RETENCAO_ID = "697c36775c7f3683791b5a5a"; // VSL 2

// --- COMPONENTE: VÍDEO INTELIGENTE (Resolve o bug da tela branca e delay) ---
const SmartVideoStep = ({ videoId, headline, onNext, delaySeconds = 10, showHeadline = true }) => {
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);

  // Timer do Botão
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [delaySeconds]);

  // Carregamento do Script VTurb (Seguro para React)
  useEffect(() => {
    // Limpa scripts anteriores
    const existing = document.querySelectorAll(`script[src*="${videoId}"]`);
    existing.forEach(e => e.remove());

    const script = document.createElement("script");
    script.src = `https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/${videoId}/v4/player.js`;
    script.async = true;
    
    if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Limpa container antes de injetar
        const playerTag = document.createElement('vturb-smartplayer');
        playerTag.id = `vid-${videoId}`;
        playerTag.style.width = '100%';
        playerTag.style.display = 'block';
        containerRef.current.appendChild(playerTag);
        containerRef.current.appendChild(script);
    }
  }, [videoId]);

  return (
    <div className="space-y-6 text-center animate-fade-in w-full">
      {showHeadline && (
        <h2 className="text-xl font-bold text-gray-900">{headline}</h2>
      )}
      
      <div ref={containerRef} className="w-full max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 min-h-[225px]">
         {/* O Player será injetado aqui */}
      </div>

      <div className={`transition-all duration-700 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button 
          onClick={onNext} 
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:bg-purple-700 transition transform hover:scale-105 uppercase tracking-wide"
        >
          CONTINUAR CONSULTA
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE: CARTÃO DE OPÇÃO (Estilo Inlead - Bonito) ---
const OptionCard = ({ icon, title, subtitle, onClick }) => (
  <button 
    onClick={onClick} 
    className="w-full bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-4 hover:border-purple-500 hover:shadow-md transition-all duration-200 group text-left mb-3 active:scale-95"
  >
    <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-200">{icon}</div>
    <div className="flex-1">
      <span className="block font-bold text-gray-800 text-[17px] leading-tight">{title}</span>
      {subtitle && <span className="block text-xs text-gray-500 mt-1 font-medium leading-snug">{subtitle}</span>}
    </div>
  </button>
);

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const totalSteps = 29; 
  const progress = Math.min(100, Math.max(5, ((currentStep - 1) / (totalSteps - 1)) * 100));

  const scrollToTop = () => window.scrollTo(0, 0);

  const runLoading = (text, nextStep) => {
    setIsLoading(true);
    setLoadingText(text);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(old => {
        if (old >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setCurrentStep(nextStep);
          scrollToTop();
          return 100;
        }
        return old + (Math.random() * 8);
      });
    }, 150);
  };

  const handleNext = (nextStepOverride) => {
    scrollToTop();
    const next = nextStepOverride || currentStep + 1;

    if (currentStep === 21) { 
       runLoading("Analizando su consulta...", 23);
       return;
    }
    if (currentStep === 27) { 
       runLoading("Generando protocolo...", 29);
       return;
    }
    setCurrentStep(next);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const Header = () => (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <div className="h-2 bg-gray-100 w-full">
        <div className="h-full bg-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex items-center justify-center p-3 relative h-16">
        {currentStep > 1 && !isLoading && (
          <button onClick={handlePrev} className="absolute left-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={28} />
          </button>
        )}
        <img src="/logo.webp" alt="Protocolo Lipedema" className="h-10 object-contain" />
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in px-6 pt-20">
      <img src="/logo.webp" alt="Logo" className="h-12 object-contain mb-10 opacity-50 grayscale" />
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between text-xs font-bold text-gray-700">
            <span>{loadingText}</span>
            <span>{Math.round(loadingProgress)}%</span>
        </div>
        <div className="h-4 bg-purple-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 transition-all duration-200" style={{ width: `${loadingProgress}%` }}></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 max-w-xs mx-auto mt-4 text-center">
        Por favor espere, estamos procesando sus respuestas para generar la mejor estrategia...
      </p>
    </div>
  );

  const renderStep = () => {
    if (isLoading) return <LoadingScreen />;

    switch(currentStep) {
      // 1. CAPA
      case 1:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-[26px] font-black text-purple-700 leading-[1.1] uppercase px-2 tracking-tight">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600 px-2 text-sm leading-relaxed">
              Responde este test rápido de 2 minutos y recibe el <strong>Protocolo Lipedema: Adiós en 22 Días</strong>, un método guiado por la <strong>Dra. Lilian</strong>.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-sm w-full border-4 border-white transform rotate-1 hover:rotate-0 transition duration-500">
              <img src="/capa.webp" alt="Antes e Depois" className="w-full h-auto" />
            </div>
            
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:bg-purple-700 transition active:scale-95 animate-bounce-slow uppercase tracking-wide">
              INICIAR CONSULTA
            </button>
            
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-left text-sm text-red-800 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-red-700 mb-1">
                 <AlertTriangle size={18} fill="#DC2626" className="text-white" /> Atención
              </div>
              <p className="leading-tight">Solo <strong>una consulta está disponible.</strong> Si sales de esta página, perderás esta oportunidad.</p>
            </div>
          </div>
        );

      // 2. ÁGUA
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-xl font-black text-gray-900 leading-tight">¿Cuántos vasos de agua sueles beber al día?</h2>
              <p className="text-gray-500 text-sm">Elige la opción que mejor te represente.</p>
            </div>
            <OptionCard icon="🌵" title="Menos de 2 vasos al día" subtitle="(Casi no bebo agua, rara vez me acuerdo)" onClick={() => handleNext()} />
            <OptionCard icon="💧" title="Entre 2 y 4 vasos al día" subtitle="(Bebo agua, pero sé que es poco)" onClick={() => handleNext()} />
            <OptionCard icon="💦" title="Entre 5 y 7 vasos al día" subtitle="(Intento beber más agua, pero no siempre mantengo el hábito)" onClick={() => handleNext()} />
            <OptionCard icon="🚰" title="Entre 8 y 10 vasos al día" subtitle="(Bebo bastante agua, aunque todavía tengo dudas si es lo ideal)" onClick={() => handleNext()} />
            <OptionCard icon="🌊" title="Más de 10 vasos al día" subtitle="(Bebo agua todos los días y mantengo este hábito sin dificultad)" onClick={() => handleNext()} />
          </div>
        );

      // 3. ATIVIDADE FÍSICA
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-xl font-black text-gray-900 leading-tight">¿Cómo es tu rutina de actividad física hoy?</h2>
              <p className="text-gray-500 text-sm">Selecciona la opción que mejor te describa:</p>
            </div>
            <OptionCard icon="🐌" title="Sedentaria, no hago ejercicio" subtitle="La falta de movimiento puede hacer que el lipedema empeore con el tiempo." onClick={() => handleNext()} />
            <OptionCard icon="🚶‍♀️" title="Camino regularmente" subtitle="Caminar es positivo, pero sin un enfoque específico para el lipedema, puede no ser suficiente." onClick={() => handleNext()} />
            <OptionCard icon="🏋️‍♀️" title="Hago ejercicio al menos 3 veces por semana" subtitle="Mantenerte activa ayuda, pero sin controlar la inflamación, es difícil ver cambios reales." onClick={() => handleNext()} />
            <OptionCard icon="💪" title="Entreno casi todos los días" subtitle="Incluso siendo activa, sin un enfoque adecuado para el lipedema, la hinchazón puede aumentar." onClick={() => handleNext()} />
          </div>
        );

      // 4. ESTÁGIOS
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900">¿En qué etapa está tu lipedema hoy?</h2>
            <p className="text-sm text-gray-500">Selecciona una de las opciones a continuación:</p>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-3 hover:border-purple-500 hover:shadow-lg transition-all active:scale-95 shadow-sm">
                <img src="/estagio-1.webp" className="w-full mb-3 rounded-lg" alt="Estagio 1 e 2" />
                <h3 className="font-bold text-gray-800 text-lg">Estadio 1 | 2</h3>
                <p className="text-[11px] text-gray-600 mt-2 font-medium leading-snug">
                  En esta etapa, <strong>actuar a tiempo</strong> es clave para evitar que el lipedema avance y se vuelva más difícil de controlar.
                </p>
              </div>
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-3 hover:border-purple-500 hover:shadow-lg transition-all active:scale-95 shadow-sm">
                <img src="/estagio-2.webp" className="w-full mb-3 rounded-lg" alt="Estagio 3 e 4" />
                <h3 className="font-bold text-gray-800 text-lg">Estadio 3 | 4</h3>
                <p className="text-[11px] text-gray-600 mt-2 font-medium leading-snug">
                  En esta etapa, el lipedema ya está más avanzado y, sin una acción adecuada, puede seguir empeorando.
                </p>
              </div>
            </div>
          </div>
        );

      // 5. ADVERTORIAL
      case 5:
        return (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden font-sans">
            <div className="bg-[#D93025] text-white px-4 py-3 font-bold text-lg flex justify-between items-center">
                <div className="flex items-center gap-3"><Menu size={20}/> SALUD</div>
                <Search size={20} />
            </div>
            <div className="bg-[#B3261E] text-white text-center py-1 text-[10px] tracking-widest uppercase font-bold">Noticias de Hoy</div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-black text-gray-900 leading-snug">
                <span className="text-[#D93025]">Especialistas en Salud revelan:</span> Un nuevo protocolo puede eliminar la grasa inflamada en las piernas, conocida como lipedema, en hasta 22 días.
              </h2>
              <div className="text-xs text-gray-400 italic font-medium">Por Sofia Ramirez | Actualizado hace 2 horas</div>
              <img src="/noticia.webp" className="w-full rounded-lg shadow-sm" alt="Noticia" />
              <p className="text-[13px] text-gray-700 leading-relaxed">
                Un nuevo enfoque creado por especialistas en metabolismo femenino está revolucionando el tratamiento del lipedema — condición que causa acumulación dolorosa de grasa en las piernas.
                <br/><br/>
                El método combina <strong>alimentos antiinflamatorios</strong> con compuestos bioactivos que actúan directamente en la raíz del problema.
              </p>
              <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md mt-2 uppercase tracking-wide hover:bg-purple-700">
                CONTINUAR CONSULTA
              </button>
            </div>
          </div>
        );

      // 6. CONHECIMENTO
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2 mb-6">
               <h2 className="text-xl font-black text-gray-900 leading-tight">¿Conoces los alimentos y suplementos que pueden ayudar a reducir la hinchazón del lipedema?</h2>
               <p className="text-gray-500 text-sm">Selecciona la opción que mejor se adapte a ti:</p>
            </div>
            <OptionCard icon="🥱" title="No, nunca he escuchado hablar de eso." onClick={() => handleNext()} />
            <OptionCard icon="😝" title="He escuchado algo, pero no conozco los detalles." onClick={() => handleNext()} />
            <OptionCard icon="🤔" title="Sí, pero todavía tengo muchas dudas." onClick={() => handleNext()} />
            <OptionCard icon="🥗" title="Sí, conozco el tema y ya he probado algunos cambios en la alimentación." onClick={() => handleNext()} />
          </div>
        );

      // 7. EDUCACIONAL
      case 7:
        return (
          <div className="space-y-6 text-center pt-4">
            <div className="inline-block bg-purple-100 px-3 py-1 rounded-md mb-2">
                <h2 className="text-2xl font-black text-purple-700 uppercase tracking-tighter">¿LO SABÍAS?</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl text-left text-gray-700 space-y-4 shadow-lg border border-purple-50">
              <p className="leading-relaxed">Sin una <span className="text-purple-700 font-bold">alimentación y suplementación adequada</span>, las células de grasa inflamada pueden seguir empeorando, haciendo que la hinchazón aumente.</p>
              <p className="font-bold text-red-600 leading-relaxed border-l-4 border-red-500 pl-3">Cirugías y drenajes no resuelven la causa real del problema, son solo soluciones temporales.</p>
            </div>
            <div className="relative">
                <img src="/prova.webp" className="w-full rounded-xl shadow-md" alt="Prova" />
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-gray-600">Resultado Real</div>
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg uppercase tracking-wide">CONTINUAR CONSULTA</button>
          </div>
        );

      // 8. VSL 1 (DRA LILIAN)
      case 8:
        return (
          <SmartVideoStep 
            videoId={VIDEO_DRA_ID} 
            headline="Antes de continuar, déjame presentarme..." 
            delaySeconds={10} 
            onNext={() => handleNext()} 
          />
        );

      case 9:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Hace cuánto tiempo convives con el lipedema?</h2>
            <OptionCard icon="⏳" title="Lo descubrí hace poco" subtitle="Actuar desde ahora puede ayudar a evitar que el lipedema avance más rápido." onClick={() => handleNext()} />
            <OptionCard icon="📅" title="Hace más de 1 año" subtitle="Cuanto antes empieces un enfoque adecuado, más fácil será acompañar el proceso." onClick={() => handleNext()} />
            <OptionCard icon="⚠️" title="Hace más de 3 años" subtitle="La hinchazón constante puede estar afectando tu bienestar general con el tiempo." onClick={() => handleNext()} />
            <OptionCard icon="🫀" title="Hace más de 5 años" subtitle="Cuando el cuerpo ya está sobrecargado, tomar acción se vuelve aún más importante." onClick={() => handleNext()} />
          </div>
        );

      case 10: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Con qué frecuencia te sientes incómoda con tus piernas o con tu cuerpo?</h2>
            <OptionCard icon="😢" title="Casi todos los días" onClick={() => handleNext()} />
            <OptionCard icon="🙁" title="Algunas veces en la semana" onClick={() => handleNext()} />
            <OptionCard icon="😐" title="De vez en cuando, a lo largo del mes" onClick={() => handleNext()} />
            <OptionCard icon="😊" title="En general, me siento bien con mi cuerpo" onClick={() => handleNext()} />
          </div>
        );

      case 11: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Con qué frecuencia sientes dolor en las piernas?</h2>
            <OptionCard icon="😭" title="Siento dolor casi todo el tiempo" onClick={() => handleNext()} />
            <OptionCard icon="😟" title="Siento dolor de vez en cuando" onClick={() => handleNext()} />
            <OptionCard icon="😊" title="No siento dolor y mi calidad de vida es buena" onClick={() => handleNext()} />
          </div>
        );

      case 12: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Tiene alguna restricción alimentaria?</h2>
            <OptionCard icon="🍽️" title="Sí, tengo restricciones y evito algunos alimentos" onClick={() => handleNext()} />
            <OptionCard icon="😋" title="No, como de todo sin problemas" onClick={() => handleNext()} />
            <OptionCard icon="🤢" title="Algunos alimentos me hacen sentir mal" onClick={() => handleNext()} />
            <OptionCard icon="🤔" title="No estoy segura, nunca me he fijado en eso" onClick={() => handleNext()} />
          </div>
        );

      case 13: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Tienes dificultad para encontrar ropa que se ajuste bien a tu cuerpo?</h2>
            <OptionCard icon="👕" title="Sí, casi nunca encuentro ropa de mi talla" onClick={() => handleNext()} />
            <OptionCard icon="👖" title="Tengo dificultad principalmente con prendas inferiores" subtitle="(pantalones, shorts, faldas)" onClick={() => handleNext()} />
            <OptionCard icon="👜" title="He dejado de intentar comprar ropa desde hace tiempo" onClick={() => handleNext()} />
            <OptionCard icon="💔" title="No me siento cómoda con mi cuerpo y por eso evito comprar ropa" onClick={() => handleNext()} />
            <OptionCard icon="😊" title="No, compro ropa sin mayores dificultades" onClick={() => handleNext()} />
          </div>
        );

      case 14:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Sientes hinchazón en las piernas, brazos o caderas?</h2>
            <OptionCard icon="😲" title="Sí, mis piernas suelen estar hinchadas" subtitle="La hinchazón constante es una señal importante y merece atención." onClick={() => handleNext()} />
            <OptionCard icon="😣" title="Sí, además de la hinchazón, siento dolor" subtitle="Sin un enfoque adecuado, este ciclo de dolor e hinchazón puede intensificarse." onClick={() => handleNext()} />
            <OptionCard icon="😊" title="No, mis piernas se sienten bien" subtitle="No suelo presentar hinchazón de forma frecuente." onClick={() => handleNext()} />
          </div>
        );

      case 15:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Sientes dolor al tocar tus piernas, caderas o brazos?</h2>
            <OptionCard icon="😭" title="Sí, siento dolor con frecuencia" subtitle="Sin un enfoque adecuado, este tipo de dolor puede intensificarse." onClick={() => handleNext()} />
            <OptionCard icon="😣" title="Sí, pero el dolor es leve" subtitle="Incluso los dolores leves pueden aumentar si no se les presta atención." onClick={() => handleNext()} />
            <OptionCard icon="😕" title="Sí, siento dolor de vez en cuando" subtitle="Con el acompañamiento correcto, es posible mejorar estos síntomas." onClick={() => handleNext()} />
            <OptionCard icon="😊" title="No, no siento dolor en estas zonas" onClick={() => handleNext()} />
          </div>
        );

      case 16:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900">¿Notas marcas profundas en las piernas al quitarte la ropa?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg w-full max-w-sm mx-auto border-2 border-white" alt="Marcas" />
            <div className="space-y-3">
              <OptionCard icon="😭" title="Sí, mis piernas quedan muy parecidas a la imagen" subtitle="Puede ser una señal temprana del lipedema." onClick={() => handleNext()} />
              <OptionCard icon="😟" title="A veces, depende de la ropa que use" subtitle="Cuando estas marcas aparecen con frecuencia, es importante observar." onClick={() => handleNext()} />
              <OptionCard icon="😕" title="Mis piernas se marcan, pero no con tanta intensidad" subtitle="Aun así, prestar atención a estos signos puede ayudar a evitar que empeoren." onClick={() => handleNext()} />
              <OptionCard icon="😊" title="No, esto no me sucede" subtitle="Mis piernas no suelen quedar marcadas." onClick={() => handleNext()} />
            </div>
          </div>
        );

      // 17. VSL 2 (RETENÇÃO - FUNDO VERMELHO)
      case 17:
        return (
          <div className="space-y-6 text-center">
            <div className="text-center font-bold text-gray-900 bg-white p-3 rounded-lg shadow-sm">
               🎧 Mira esta explicación rápida 👇
               <p className="text-xs font-normal text-gray-500 mt-1">Si el audio no se reproduce automáticamente, haz clic para escuchar.</p>
            </div>
            
            {/* Componente SmartVideoStep REUTILIZADO para o Vídeo 2 */}
            <SmartVideoStep 
              videoId={VIDEO_RETENCAO_ID} 
              headline="" 
              showHeadline={false}
              delaySeconds={5} // Botão aparece mais rápido aqui
              onNext={() => handleNext()} 
            />
          </div>
        );

      // 18. ATENÇÃO
      case 18:
        return (
          <div className="text-center space-y-6 pt-6">
            <div className="inline-block bg-purple-100 px-4 py-1 rounded">
               <h2 className="text-purple-700 font-black text-3xl tracking-widest uppercase">ATENCIÓN</h2>
            </div>
            <p className="text-lg text-gray-700 font-medium leading-relaxed px-2">
              Las próximas preguntas son muy importantes. Con ellas podremos evaluar si estás lista para <strong>reducir medidas, hinchazón y molestias en un período de 22 días</strong>.
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-4">
                <img src="/transicao.webp" className="w-full" alt="Transicao" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase tracking-wider animate-pulse">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      case 19: 
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-6">
                <h2 className="text-xl font-black text-gray-900">¿Te gustaría tener acceso a un enfoque natural y guiado?</h2>
                <p className="text-sm text-gray-600">La elección es suya: un tratamiento natural o medicamentos y cirugías arriesgadas.</p>
            </div>
            <OptionCard icon="😍" title="¡Sí, me encantaría!" onClick={() => handleNext()} />
            <OptionCard icon="💊" title="No, prefiero hacer cirugías carísimas" subtitle="y tomar medicamentos para intentar curarme" onClick={() => handleNext()} />
          </div>
        );

      case 20: 
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-6">
                <h2 className="text-xl font-black text-gray-900">¿Quiere controlar el lipedema, reducir el dolor y perder medidas?</h2>
                <p className="text-sm text-gray-600">Puede interrumpir el avance del lipedema y mejorar su salud, pero necesita actuar ahora.</p>
            </div>
            <OptionCard icon="😍" title="Sí, quiero librarme del dolor y conquistar más salud" onClick={() => handleNext()} />
            <OptionCard icon="😓" title="No, prefiero continuar como estoy ahora" onClick={() => handleNext()} />
          </div>
        );

      case 21:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-black text-gray-900 leading-tight">22 días es todo lo que necesitas para transformar tus piernas...</h2>
            <p className="text-gray-600 text-sm">Después de comenzar el <strong>Protocolo Lipedema: Adiós en 22 Días</strong>, este fue el resultado que <strong>Sofía</strong> consiguió.</p>
            <div className="rounded-xl overflow-hidden shadow-xl border-2 border-white">
                <img src="/sofia.webp" className="w-full" alt="Sofia" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase tracking-wide">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      case 22: return null; // Loading Screen

      // 23. DIAGNÓSTICO
      case 23:
        return (
          <div className="space-y-6 pb-10">
            <h2 className="text-center text-2xl font-black text-gray-900">Aquí está el resultado de su consulta:</h2>
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest font-bold">Nivel de gravedad de su caso:</p>
            
            <div className="flex justify-center my-4 relative">
              <div className="w-36 h-36 rounded-full border-[10px] border-[#EF4444] flex items-center justify-center bg-white shadow-xl z-10">
                <span className="text-5xl font-black text-gray-800">91%</span>
              </div>
              <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50"></div>
            </div>

            <div className="bg-[#FEE2E2] text-[#991B1B] p-4 rounded-xl text-center font-bold border border-[#FECACA] text-sm shadow-sm">
              Resultado: <span className="text-[#DC2626] font-black uppercase">Preocupante!</span>
            </div>

            <div className="space-y-6 px-1 pt-2">
               <ResultSlider label="Nivel de inflamación" value="82%" />
               <ResultSlider label="Nivel de hinchazón" value="62%" />
               <ResultSlider label="Nivel de salud" value="47%" />
               <ResultSlider label="Nivel de empoderamiento" value="12%" />
            </div>

            <div className="py-6 flex justify-center">
              <img src="/diag-body.webp" className="w-2/3 max-w-[200px] drop-shadow-2xl" alt="Corpo" />
            </div>

            <div className="bg-[#DCFCE7] border border-[#86EFAC] p-5 rounded-xl text-left space-y-3 shadow-sm">
              <div className="flex items-start gap-2 font-bold text-[#15803D] text-sm leading-tight">
                <span className="w-3 h-3 bg-[#22C55E] rounded-full shrink-0 mt-1"></span>
                <span>Tiene un perfil adecuado para la realización del Protocolo Lipedema Reset 28D.</span>
              </div>
              <p className="text-xs text-[#166534] leading-relaxed pl-5">
                De acuerdo con sus respuestas, encontramos que está lista para desinflamar su lipedema a través de una alimentación natural...
              </p>
            </div>

            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl shadow-xl text-lg animate-bounce-slow uppercase tracking-wide">
              ¡QUIERO SABER MÁS! 😍
            </button>
          </div>
        );

      case 24: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Has intentado todo para tratar el lipedema, pero nada parece funcionar?</h2>
            <OptionCard icon="😓" title="Lo he intentado todo y nunca he tenido un resultado satisfactorio." onClick={() => handleNext()} />
            <OptionCard icon="🤔" title="Nunca he probado ningún enfoque antilipedema." onClick={() => handleNext()} />
          </div>
        );

      case 25:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900 leading-tight">No más Intentos Frustrados: Conozca el Protocolo que Ataca el Lipedema en la Raíz</h2>
            <p className="text-gray-600 text-sm">El protocolo fue creado para reducir la inflamación, equilibrar hormonas y frenar el avance.</p>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <img src="/alimentos.webp" className="w-full" alt="Alimentos" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase text-sm tracking-wide hover:bg-purple-800">
              <Leaf size={18}/> ¡QUIERO CONOCER EL PROTOCOLO!
            </button>
          </div>
        );

      case 26: 
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Desea tener acceso a un plan para reducir la hinchazón?</h2>
            <OptionCard icon="🤩" title="¡Sí, quiero mucho!" onClick={() => handleNext()} />
            <OptionCard icon="😁" title="¡Sí, quiero empezar ahora!" onClick={() => handleNext()} />
          </div>
        );

      // 27. MEDO (SCROLL LONGO)
      case 27:
        return (
          <div className="text-center space-y-8 bg-white pb-6">
            <h2 className="text-2xl font-black text-gray-900 uppercase leading-none">Vea lo que sucede cuando el lipedema no se trata...</h2>
            
            <FearBlock title="El lipedema solo empeora con el tiempo." text="Las piernas están cada vez más hinchadas, desproporcionadas y doloridas." img="/evolucao.webp" />
            <FearBlock title="Su movilidad disminuye cada vez más." text="El peso en las piernas y caderas limita sus movimientos." img="/mobilidade.webp" />
            <FearBlock title="El lipedema puede evolucionar a linfedema." text="Las piernas pueden deformarse y pesarse de forma permanente." img="/evolucao.webp" />
            
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-xs uppercase shadow-xl tracking-wider">
              FINALIZAR CONSULTA Y ACCEDER
            </button>
          </div>
        );

      case 28: return null; // Loading Screen

      // 29. OFERTA FINAL
      case 29:
        return (
          <div className="space-y-8 pb-20 animate-fade-in">
             <div className="text-center space-y-4">
                <h2 className="text-2xl font-black text-gray-900">¡Protocolo personalizado generado con éxito!</h2>
                
                <div className="flex justify-center gap-4 text-[10px] font-bold text-white uppercase tracking-wider">
                    <span className="bg-[#EF4444] px-2 py-1 rounded shadow-sm">❌ Antes</span>
                    <span className="bg-[#22C55E] px-2 py-1 rounded shadow-sm">✅ Después</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 mx-auto max-w-xs">
                    <img src="/final-shorts.webp" className="w-full object-cover" alt="Resultado" />
                    <div className="absolute bottom-0 w-full flex text-center text-xs font-bold text-white uppercase tracking-wider">
                        <div className="w-1/2 bg-[#EF4444]/90 py-2 backdrop-blur-sm">Antes</div>
                        <div className="w-1/2 bg-[#A855F7]/90 py-2 backdrop-blur-sm">Después</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-left px-2">
                    <MetricItem label="Hinchazón" bad="Constante" good="Reducida" />
                    <MetricItem label="Dolores" bad="Todos los días" good="Desapareciendo" />
                    <MetricItem label="Autoestima" bad="Muy baja" good="Elevada" />
                    <MetricItem label="Resultados" bad="Ningún cambio" good="Visibles en 21 días" />
                </div>
             </div>

             <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 space-y-4 shadow-sm">
                <h3 className="font-black text-center text-gray-900 text-lg leading-tight">Beneficios que vas a tener al adquirir el Protocolo Lipedema:</h3>
                <ul className="space-y-4">
                    <BenefitItem title="Clases en video con orientación médica" desc="Aprende a implementar el plan paso a paso." />
                    <BenefitItem title="Protocolo Alimentario Antiinflamatorio" desc="Menú nutricional y práctico para 28 días." />
                    <BenefitItem title="Lista VIP de compras saludables" desc="Compra con estrategia y sin gastar de más." />
                    <BenefitItem title="Planner semanal personalizado" desc="Organiza tu rutina con claridad." />
                </ul>
             </div>

             <div className="bg-[#FEF3C7] border-2 border-[#FDE68A] rounded-xl p-6 shadow-md text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase">Oferta Especial</div>
                <h3 className="font-bold text-[#92400E] mb-4 uppercase text-sm tracking-wide">Resumen de lo que vas a recibir</h3>
                <div className="space-y-2 text-xs text-gray-700 font-medium text-left mx-auto max-w-[200px]">
                    <p>📘 Protocolo Lipedema — <span className="line-through text-red-400 float-right">USD 97</span></p>
                    <p>📅 Planner semanal — <span className="line-through text-red-400 float-right">USD 37</span></p>
                    <p>🥗 Dieta antiinflamatoria — <span className="line-through text-red-400 float-right">USD 27</span></p>
                    <p>🛒 Lista VIP de compras — <span className="line-through text-red-400 float-right">USD 27</span></p>
                </div>
                <div className="mt-6 border-t border-[#FCD34D] pt-4">
                    <p className="text-red-500 font-bold line-through text-xs">Valor real: USD 285</p>
                    <p className="text-xl font-bold text-gray-800 uppercase mt-1">Hoy solo:</p>
                    <p className="text-6xl font-black text-[#15803D] tracking-tighter shadow-green-200 drop-shadow-sm">USD 9,90</p>
                    <p className="text-[10px] text-gray-500 mt-2 font-medium">Menos de un café al día ☕</p>
                </div>
             </div>

             <a href={CHECKOUT_LINK} className="block w-full bg-purple-700 text-white font-black py-5 rounded-xl text-lg shadow-xl text-center uppercase animate-bounce-slow tracking-wider hover:bg-purple-800 transition transform hover:-translate-y-1">
               QUIERO GARANTIZAR MI PROTOCOLO
             </a>

             <div className="space-y-4">
                <Testimonial name="Laura Martínez" text="Nunca pensé que algo tan simple funcionaría. Mi dolor bajó." />
                <Testimonial name="Valentina Gómez" text="Aprendí a controlar la inflamación. Me veo y me siento diferente." />
             </div>

             <div className="text-center pt-6 pb-4">
                <img src="/garantia.webp" alt="Garantia 7 Dias" className="w-32 mx-auto drop-shadow-lg" />
                <a href={CHECKOUT_LINK} className="block w-full bg-green-600 text-white font-bold py-4 rounded-xl text-xs uppercase mt-6 shadow-lg tracking-wide hover:bg-green-700">
                    QUIERO ACCEDER CON 7 DÍAS DE GARANTÍA
                </a>
             </div>

             <div className="text-[10px] text-center text-gray-400 mt-10 pt-6 border-t border-gray-100">
                <p>© 2026 - Criado via inlead.digital | Central de anúncios</p>
             </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-16 pb-10 px-4 md:px-0">
      <Header />
      <div className="max-w-md mx-auto w-full">
        {renderStep()}
      </div>
    </div>
  );
}

// --- SUBCOMPONENTES ESTILIZADOS ---

const ResultSlider = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold mb-1 text-gray-800"><span>{label}</span><span>{value}</span></div>
    <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative">
      <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#1F2937] text-white text-[7px] flex items-center justify-center rounded-full font-bold border border-white shadow z-10" style={{ left: value }}>TÚ</div>
    </div>
    <div className="flex justify-between text-[8px] text-gray-400 mt-1 font-medium uppercase"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
  </div>
);

const FearBlock = ({ title, text, img }) => (
    <div className="bg-[#FEF2F2] rounded-2xl p-5 text-left border border-[#FEE2E2] shadow-sm">
        <h3 className="font-black text-[#991B1B] text-sm mb-2 uppercase leading-tight">{title}</h3>
        <p className="text-xs text-[#7F1D1D] mb-4 leading-relaxed font-medium">{text}</p>
        <img src={img} className="rounded-lg w-full object-cover shadow-sm" alt="Evolucao" />
    </div>
);

const BenefitItem = ({ title, desc }) => (
  <li className="flex gap-3 items-start">
    <div className="bg-[#22C55E] text-white p-0.5 rounded-full mt-0.5 shrink-0"><Check size={12} strokeWidth={4} /></div>
    <div><span className="block font-bold text-gray-800 text-xs leading-tight">{title}</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5 block">{desc}</span></div>
  </li>
);

const MetricItem = ({ label, bad, good }) => (
    <div className="space-y-1 mb-2">
        <p className="text-gray-800">{label}</p>
        <div className="flex justify-between text-gray-400 text-[9px]"><span className="text-red-500 font-bold">🔴 {bad}</span> <span className="font-mono">95%</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[95%]"></div></div>
        
        <div className="flex justify-between text-gray-400 mt-1 text-[9px]"><span className="text-green-500 font-bold">🟢 {good}</span> <span className="font-mono">10%</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[10%]"></div></div>
    </div>
);

const Testimonial = ({ name, text }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md relative text-left">
    <div className="flex text-[#FACC15] mb-2 gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
    <p className="text-xs text-gray-600 italic leading-relaxed">"{text}"</p>
    <p className="text-[10px] font-black text-gray-900 mt-3 block uppercase tracking-wide">- {name}</p>
  </div>
);

export default App;