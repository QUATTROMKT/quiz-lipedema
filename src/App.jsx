import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, Star, Leaf, AlertTriangle, Menu, Search } from 'lucide-react';

// --- CONFIGURAÇÕES ---
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; 
const VIDEO_ID_DRA = "697c366c02e0aee2dde139e2"; // Vídeo Etapa 8
const VIDEO_ID_VENDAS = "697c36775c7f3683791b5a5a"; // Vídeo Etapa 17/28

// --- COMPONENTE DE VÍDEO COM DELAY (RESOLVE O PROBLEMA DO BOTÃO E CARREGAMENTO) ---
const SmartVideoStep = ({ videoId, headline, onNext, showHeadline = true }) => {
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);

  // 1. Lógica do Delay do Botão (10 Segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // 10000ms = 10 segundos

    return () => clearTimeout(timer);
  }, []);

  // 2. Lógica Forçada para Carregar o VTurb (Resolve o bug do vídeo sumir)
  useEffect(() => {
    // Remove scripts anteriores para garantir reload limpo
    const existingScripts = document.querySelectorAll(`script[src*="${videoId}"]`);
    existingScripts.forEach(s => s.remove());

    const script = document.createElement("script");
    // URL baseada nos scripts que você mandou
    script.src = `https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/${videoId}/v4/player.js`;
    script.async = true;
    
    if (containerRef.current) {
        containerRef.current.appendChild(script);
    }

    // Tenta forçar o smartplayer global se ele já estiver carregado
    if (window.smartplayer) {
        setTimeout(() => window.smartplayer(), 500);
    }
  }, [videoId]);

  return (
    <div className="space-y-6 text-center animate-fade-in">
      {showHeadline && (
        <h2 className="text-xl font-bold text-gray-900">{headline}</h2>
      )}
      
      {/* Container do Vídeo */}
      <div className="w-full max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 min-h-[225px]" ref={containerRef}>
         <vturb-smartplayer id={`vid-${videoId}`} style={{ width: '100%', display: 'block' }}></vturb-smartplayer>
      </div>

      {/* Botão com Delay */}
      {showButton ? (
        <button 
          onClick={onNext} 
          className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase animate-bounce-slow transition-all duration-500 ease-in-out"
        >
          CONTINUAR CONSULTA
        </button>
      ) : (
        <p className="text-xs text-gray-400 animate-pulse">Por favor, espera unos segundos...</p>
      )}
    </div>
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const totalSteps = 29; 
  const progress = Math.min(100, Math.max(5, ((currentStep - 1) / (totalSteps - 1)) * 100));

  const scrollToTop = () => window.scrollTo(0, 0);

  // Sistema de Loading Simulado
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
        return old + (Math.random() * 15);
      });
    }, 300); // Velocidade do loading
  };

  const handleNext = (nextStepOverride) => {
    scrollToTop();
    const next = nextStepOverride || currentStep + 1;

    // Loading 1: Antes do Diagnóstico (Step 21 -> 23)
    if (currentStep === 21) { 
       runLoading("Analizando su consulta...", 23);
       return;
    }

    // Loading 2: Antes do Final (Step 27 -> 29)
    if (currentStep === 27) { 
       runLoading("Cargando, espere...", 29);
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

  // HEADER
  const Header = () => (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <div className="h-2 bg-gray-100 w-full">
        <div className="h-full bg-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex items-center justify-center p-3 relative h-16">
        {currentStep > 1 && !isLoading && (
          <button onClick={handlePrev} className="absolute left-4 text-gray-400 hover:text-gray-600 p-2">
            <ChevronLeft size={28} />
          </button>
        )}
        <img src="/logo.webp" alt="Protocolo Lipedema" className="h-10 object-contain" />
      </div>
    </div>
  );

  // TELA DE LOADING
  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in px-6 pt-20">
      <img src="/logo.webp" alt="Logo" className="h-12 object-contain mb-10 opacity-50" />
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between text-xs font-bold text-gray-700">
            <span>{loadingText}</span>
            <span>{Math.round(loadingProgress)}%</span>
        </div>
        <div className="h-4 bg-purple-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 transition-all duration-200" style={{ width: `${loadingProgress}%` }}></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 max-w-xs mx-auto mt-4">
        {currentStep === 27 
          ? "Generando protocolo personalizado de acuerdo con sus respuestas." 
          : "Estoy analizando su consulta y preparando su informe..."}
      </p>
    </div>
  );

  // RENDERIZAÇÃO
  const renderStep = () => {
    if (isLoading) return <LoadingScreen />;

    switch(currentStep) {
      
      // ETAPA 1: CAPA
      case 1:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-3xl font-black text-purple-700 leading-tight uppercase px-2">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600 px-2 font-medium">
              Responde este test rápido de 2 minutos y recibe el <strong>Protocolo Lipedema: Adiós en 22 Días</strong>, un método guiado y personalizado por la <strong>Dra. Lilian</strong>.
            </p>
            <div className="rounded-xl overflow-hidden shadow-xl mx-auto max-w-sm w-full border-4 border-white">
              <img src="/capa.webp" alt="Antes e Depois" className="w-full h-auto" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:bg-purple-800 transition active:scale-95 animate-bounce-slow">
              INICIAR CONSULTA
            </button>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-left text-sm text-red-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-red-700 mb-1"><AlertTriangle size={18} /> Atención</div>
              <p>Solo <strong>una consulta está disponible.</strong></p>
              <p>Si sales de esta página, perderás esta oportunidad.</p>
            </div>
          </div>
        );

      case 2: return <QuizStep question="¿Cuántos vasos de agua sueles beber al día?" subtitle="Elige la opción que mejor te represente." options={[{icon:"🌵", text:"Menos de 2 vasos al día", sub:"(Casi no bebo agua)"}, {icon:"💧", text:"Entre 2 y 4 vasos al día", sub:"(Bebo agua, pero sé que es poco)"}, {icon:"💦", text:"Entre 5 y 7 vasos al día", sub:"(Intento beber más)"}, {icon:"🚰", text:"Entre 8 y 10 vasos al día", sub:"(Bebo bastante)"}, {icon:"🌊", text:"Más de 10 vasos al día", sub:"(Bebo todo el día)"}]} onNext={handleNext} />;
      case 3: return <QuizStep question="¿Cómo es tu rutina de actividad física hoy?" subtitle="Selecciona la opción que mejor te describa:" options={[{icon:"🐌", text:"Sedentaria, no hago ejercicio", sub:"La falta de movimiento empeora el lipedema"}, {icon:"🚶‍♀️", text:"Camino regularmente", sub:"Caminar es positivo"}, {icon:"🏋️‍♀️", text:"Hago ejercicio al menos 3 veces", sub:"Mantenerte activa ayuda"}, {icon:"💪", text:"Entreno casi todos los días", sub:"Incluso siendo activa, sin el protocolo..."}]} onNext={handleNext} />;

      // ETAPA 4: ESTÁGIOS
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">¿En qué etapa está tu lipedema hoy?</h2>
            <p className="text-sm text-gray-500">Selecciona una de las opciones a continuación:</p>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border-2 border-gray-100 rounded-xl p-3 hover:border-purple-500 transition shadow-sm active:scale-95">
                <img src="/estagio-1.webp" className="w-full mb-3 rounded" alt="Estagio 1 e 2" />
                <h3 className="font-bold text-gray-800">Estadio 1 | 2</h3>
                <p className="text-xs text-gray-600 mt-2 font-medium leading-tight">En esta etapa, <strong>actuar a tiempo</strong> es clave para evitar que el lipedema avance.</p>
              </div>
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border-2 border-gray-100 rounded-xl p-3 hover:border-purple-500 transition shadow-sm active:scale-95">
                <img src="/estagio-2.webp" className="w-full mb-3 rounded" alt="Estagio 3 e 4" />
                <h3 className="font-bold text-gray-800">Estadio 3 | 4</h3>
                <p className="text-xs text-gray-600 mt-2 font-medium leading-tight">En esta etapa, el lipedema ya está más avanzado y puede seguir empeorando.</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#D93025] text-white px-4 py-4 font-bold text-xl flex justify-between items-center"><div className="flex gap-4"><Menu /> SALUD</div><Search /></div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-bold text-gray-900 leading-snug"><span className="text-[#D93025]">Especialistas en Salud revelan:</span> Un nuevo protocolo puede eliminar la grasa inflamada en hasta 22 días.</h2>
              <div className="text-xs text-gray-400 italic">Por Sofia Ramirez</div>
              <p className="text-sm text-gray-700">En nuevo enfoque creado por especialistas en metabolismo femenino está revolucionando el tratamiento...</p>
              <img src="/noticia.webp" className="w-full rounded-lg" alt="Noticia" />
              <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg shadow mt-2 uppercase">CONTINUAR CONSULTA</button>
            </div>
          </div>
        );

      case 6: return <QuizStep question="¿Conoces los alimentos y suplementos que pueden ayudar?" options={[{icon:"🥱", text:"No, nunca he escuchado hablar de eso"}, {icon:"😝", text:"He escuchado algo, pero no conozco los detalles"}, {icon:"🤔", text:"Sí, pero todavía tengo muchas dudas"}, {icon:"🥗", text:"Sí, conozco el tema y ya he probado algunos cambios"}]} onNext={handleNext} />;

      case 7:
        return (
          <div className="space-y-6 text-center pt-4">
            <h2 className="text-2xl font-black text-purple-800 uppercase bg-purple-100 inline-block px-2">¿LO SABÍAS?</h2>
            <div className="bg-gray-50 p-4 rounded-xl text-left text-gray-700 space-y-4">
              <p>Sin una <span className="text-purple-700 font-bold">alimentación adequada</span>, las células de grasa siguen empeorando.</p>
              <p className="font-bold text-red-600">Cirugías y drenajes no curan la causa raíz.</p>
            </div>
            <img src="/prova.webp" className="w-full rounded-xl shadow-md" alt="Prova" />
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg uppercase">CONTINUAR CONSULTA</button>
          </div>
        );

      // ETAPA 8: VSL 1 (DRA LILIAN) - COM DELAY E CORREÇÃO
      case 8:
        return (
          <SmartVideoStep 
            videoId={VIDEO_ID_DRA} 
            headline="Antes de continuar, déjame presentarme..." 
            onNext={handleNext} 
          />
        );

      case 9: return <QuizStep question="¿Hace cuánto tiempo convives con el lipedema?" options={[{icon:"⏳", text:"Lo descubrí hace poco", sub:"Actuar desde ahora puede ayudar a evitar que avance."}, {icon:"📅", text:"Hace más de 1 año", sub:"Cuanto antes empieces un enfoque adecuado, más fácil será."}, {icon:"⚠️", text:"Hace más de 3 años", sub:"La hinchazón constante puede estar afectando tu bienestar."}, {icon:"🫀", text:"Hace más de 5 años", sub:"Cuando el cuerpo ya está sobrecargado, tomar acción es importante."}]} onNext={handleNext} />;
      case 10: return <QuizStep question="¿Con qué frecuencia te sientes incómoda?" options={[{icon:"😢", text:"Casi todos los días"}, {icon:"🙁", text:"Algunas veces en la semana"}, {icon:"😐", text:"De vez en cuando, a lo largo del mes"}, {icon:"😊", text:"En general, me siento bien"}]} onNext={handleNext} />;
      case 11: return <QuizStep question="¿Con qué frecuencia sientes dolor?" options={[{icon:"😭", text:"Siento dolor casi todo el tiempo"}, {icon:"😟", text:"Siento dolor de vez en cuando"}, {icon:"😊", text:"No siento dolor y mi calidad de vida es buena"}]} onNext={handleNext} />;
      case 12: return <QuizStep question="¿Tienes alguna restricción alimentaria?" options={[{icon:"🍽️", text:"Sí, tengo restricciones"}, {icon:"😋", text:"No, como de todo sin problemas"}, {icon:"🤢", text:"Algunos alimentos me hacen sentir mal"}, {icon:"🤔", text:"No estoy segura"}]} onNext={handleNext} />;
      case 13: return <QuizStep question="¿Tienes dificultad para encontrar ropa?" options={[{icon:"👕", text:"Sí, casi nunca encuentro"}, {icon:"👖", text:"Tengo dificultad con prendas inferiores"}, {icon:"👜", text:"He dejado de intentar comprar"}, {icon:"💔", text:"No me siento cómoda"}, {icon:"😊", text:"No, compro sin problemas"}]} onNext={handleNext} />;
      case 14: return <QuizStep question="¿Sientes hinchazón en las piernas?" options={[{icon:"😲", text:"Sí, mis piernas suelen estar hinchadas", sub:"La hinchazón constante es una señal importante."}, {icon:"😣", text:"Sí, además de la hinchazón, siento dolor", sub:"Sin un enfoque adecuado, este ciclo puede intensificarse."}, {icon:"😊", text:"No, mis piernas se sienten bien"}]} onNext={handleNext} />;
      case 15: return <QuizStep question="¿Sientes dolor al tocar tus piernas?" options={[{icon:"😭", text:"Sí, siento dolor con frecuencia"}, {icon:"😣", text:"Sí, pero el dolor es leve"}, {icon:"😕", text:"Sí, siento dolor de vez en cuando"}, {icon:"😊", text:"No, no siento dolor"}]} onNext={handleNext} />;

      case 16:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900">¿Notas marcas profundas en las piernas al quitarte la ropa?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg w-full max-w-sm mx-auto" alt="Marcas" />
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="option-btn text-left"><span className="mr-2 text-2xl">😭</span><div><span className="font-bold block">Sí, mis piernas quedan muy parecidas</span><span className="text-xs text-gray-500">Señal temprana del lipedema.</span></div></button>
              <button onClick={() => handleNext()} className="option-btn text-left"><span className="mr-2 text-2xl">😟</span><div><span className="font-bold block">A veces, depende de la ropa</span><span className="text-xs text-gray-500">Importante observar.</span></div></button>
              <button onClick={() => handleNext()} className="option-btn text-left"><span className="mr-2 text-2xl">😕</span><div><span className="font-bold block">Se marcan, pero no con tanta intensidad</span><span className="text-xs text-gray-500">Prestar atención ayuda a evitar.</span></div></button>
              <button onClick={() => handleNext()} className="option-btn text-left"><span className="mr-2 text-2xl">😊</span><div><span className="font-bold block">No, esto no me sucede</span><span className="text-xs text-gray-500">No suelen quedar marcadas.</span></div></button>
            </div>
          </div>
        );

      // ETAPA 17: VÍDEO RETENÇÃO (COM DELAY)
      case 17:
        return (
          <div className="space-y-6 text-center">
            <div className="text-center font-bold text-gray-900">🎧 Mira esta explicación rápida 👇<p className="text-xs font-normal text-gray-500 mt-1">Si el audio no se reproduce, haz clic para escuchar.</p></div>
            <SmartVideoStep 
              videoId={VIDEO_ID_VENDAS} 
              headline="" 
              showHeadline={false}
              onNext={() => handleNext()} 
            />
          </div>
        );

      case 18:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-purple-700 font-black text-3xl tracking-widest uppercase bg-purple-100 inline-block px-2">ATENCIÓN</h2>
            <p className="text-sm text-gray-700 font-medium">Las próximas preguntas son muy importantes para evaluar si estás lista.</p>
            <div className="relative"><img src="/transicao.webp" className="rounded-xl shadow-lg w-full" alt="Transicao" /></div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase">CONTINUAR CONSULTA</button>
          </div>
        );

      case 19: return <QuizStep question="¿Te gustaría tener acceso a un enfoque natural?" options={[{icon:"😍", text:"¡Sí, me encantaría!"}, {icon:"💊", text:"No, prefiero hacer cirugías"}]} onNext={handleNext} />;
      case 20: return <QuizStep question="¿Quiere controlar el lipedema y reducir el dolor?" options={[{icon:"😍", text:"Sí, quiero librarme del dolor"}, {icon:"😓", text:"No, prefiero continuar como estoy"}]} onNext={handleNext} />;

      case 21:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">22 días es todo lo que necesitas...</h2>
            <p className="text-gray-600 text-sm">Este fue el resultado que <strong>Sofía</strong> consiguió.</p>
            <img src="/sofia.webp" className="rounded-xl shadow-lg w-full" alt="Sofia" />
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase">CONTINUAR CONSULTA</button>
          </div>
        );

      case 22: return null; // Loading

      // ETAPA 23: DIAGNÓSTICO
      case 23:
        return (
          <div className="space-y-6 pb-10">
            <h2 className="text-center text-2xl font-bold text-gray-900">Aquí está el resultado de su consulta:</h2>
            <div className="flex justify-center my-4"><div className="w-32 h-32 rounded-full border-[8px] border-[#EF4444] flex items-center justify-center bg-white shadow-xl"><span className="text-4xl font-black text-gray-800">91%</span></div></div>
            <div className="bg-[#FEE2E2] text-[#991B1B] p-4 rounded-xl text-center font-bold border border-[#FECACA] text-sm">Resultado: <span className="text-[#DC2626]">Preocupante!</span></div>
            <div className="space-y-5 px-1 pt-2">
               <ResultSlider label="Inflamación" value="82%" />
               <ResultSlider label="Hinchazón" value="62%" />
               <ResultSlider label="Salud" value="47%" />
               <ResultSlider label="Empoderamiento" value="12%" />
            </div>
            <div className="py-4"><img src="/diag-body.webp" className="mx-auto w-2/3" alt="Corpo" /></div>
            <div className="bg-[#DCFCE7] border border-[#86EFAC] p-5 rounded-xl text-left space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#15803D] text-sm leading-tight"><span className="w-3 h-3 bg-[#22C55E] rounded-full shrink-0"></span>Tiene un perfil adecuado para el Protocolo.</div>
              <p className="text-xs text-[#166534] leading-relaxed">De acuerdo con sus respuestas, encontramos que está lista para desinflamar...</p>
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl shadow-xl text-lg animate-bounce-slow uppercase">¡QUIERO SABER MÁS! 😍</button>
          </div>
        );

      case 24: return <QuizStep question="¿Has intentado todo?" options={[{icon:"😓", text:"Lo he intentado todo"}, {icon:"🤔", text:"Nunca he probado ningún enfoque antilipedema."}]} onNext={handleNext} />;

      case 25:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">No más Intentos Frustrados</h2>
            <p className="text-gray-600 text-sm">El protocolo anti-lipedema fue creado para reducir la inflamación.</p>
            <img src="/alimentos.webp" className="rounded-xl shadow-lg border border-gray-100" alt="Alimentos" />
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase text-sm">¡QUIERO CONOCER EL PROTOCOLO! 🌿</button>
          </div>
        );

      case 26: return <QuizStep question="¿Desea tener acceso a un plan?" options={[{icon:"🤩", text:"¡Sí, quiero mucho!"}, {icon:"😁", text:"¡Sí, quiero empezar ahora!"}]} onNext={handleNext} />;

      case 27:
        return (
          <div className="text-center space-y-8 bg-white pb-6">
            <h2 className="text-xl font-black text-gray-900 uppercase">Vea lo que sucede cuando el lipedema no se trata...</h2>
            <FearBlock title="El lipedema solo empeora con el tiempo." text="Las piernas están cada vez más hinchadas." img="/evolucao.webp" />
            <FearBlock title="Su movilidad disminuye cada vez más." text="El peso limita sus movimientos." img="/mobilidade.webp" />
            <FearBlock title="El lipedema puede evolucionar a linfedema." text="Las piernas pueden deformarse." img="/evolucao.webp" />
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-xs uppercase shadow-xl">FINALIZAR CONSULTA Y ACCEDER AL PROTOCOLO</button>
          </div>
        );

      case 28: return null; // Loading

      // ETAPA 29: OFERTA FINAL
      case 29:
        return (
          <div className="space-y-8 pb-20 animate-fade-in">
             <div className="text-center space-y-4">
                <h2 className="text-2xl font-black text-gray-900">¡Protocolo personalizado generado con éxito!</h2>
                <div className="flex justify-center gap-4 text-xs font-bold text-white uppercase"><span className="bg-[#EF4444] px-2 py-1 rounded">❌ Antes</span><span className="bg-[#22C55E] px-2 py-1 rounded">✅ Después</span></div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 mx-auto max-w-sm"><img src="/final-shorts.webp" className="w-full object-cover" alt="Resultado" /></div>
                <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-left px-2"><MetricItem label="Hinchazón" bad="Constante" good="Reducida" /><MetricItem label="Dolores" bad="Todos los días" good="Desapareciendo" /></div>
             </div>

             <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 space-y-4">
                <h3 className="font-black text-center text-gray-900 text-lg">Beneficios que vas a tener:</h3>
                <ul className="space-y-4"><BenefitItem title="Clases en video" desc="Orientación médica." /><BenefitItem title="Protocolo Alimentario" desc="Menú para 28 días." /><BenefitItem title="Lista VIP de compras" desc="Compra con estrategia." /><BenefitItem title="Planner semanal" desc="Organiza tu rutina." /></ul>
             </div>

             <div className="bg-[#FEF3C7] border-2 border-[#FDE68A] rounded-xl p-6 shadow-sm text-center">
                <h3 className="font-bold text-[#92400E] mb-4 uppercase text-sm">Resumen de lo que vas a recibir</h3>
                <div className="space-y-2 text-xs text-gray-700 font-medium"><p>📘 Protocolo Lipedema — <span className="line-through text-red-400">USD 97</span></p><p>📅 Planner semanal — <span className="line-through text-red-400">USD 37</span></p></div>
                <div className="mt-6 border-t border-[#FCD34D] pt-4">
                    <p className="text-red-500 font-bold line-through text-sm">Valor real: USD 285</p>
                    <p className="text-xl font-bold text-gray-800">Hoy solo:</p>
                    <p className="text-5xl font-black text-[#15803D] tracking-tighter">USD 9,90</p>
                    <p className="text-[10px] text-gray-500 mt-2">Menos de un café al día ☕</p>
                </div>
             </div>

             <a href={CHECKOUT_LINK} className="block w-full bg-purple-700 text-white font-black py-5 rounded-xl text-lg shadow-xl text-center uppercase animate-bounce-slow">QUIERO GARANTIZAR MI PROTOCOLO</a>

             <div className="space-y-4"><Testimonial name="Laura Martínez" text="Mi dolor bajó." /><Testimonial name="Valentina Gómez" text="Me veo y me siento diferente." /></div>

             <div className="text-center pt-4">
                <img src="/garantia.webp" alt="Garantia 7 Dias" className="w-32 mx-auto" />
                <a href={CHECKOUT_LINK} className="block w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-xs uppercase mt-4 shadow-lg">QUIERO ACCEDER CON 7 DÍAS DE GARANTÍA</a>
             </div>

             <div className="text-[10px] text-center text-gray-300 mt-10 pt-4 border-t border-gray-100"><p>© 2026 - Criado via inlead.digital | Central de anúncios</p></div>
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

// SUBCOMPONENTES
const QuizStep = ({ question, subtitle, options, onNext }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{question}</h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
    <div className="grid gap-3">
      {options.map((opt, idx) => (
        <button key={idx} onClick={() => onNext()} className="option-btn text-left group">
          <span className="text-2xl mr-4">{opt.icon}</span>
          <div><span className="block font-bold text-gray-800 text-lg leading-tight">{opt.text}</span>{opt.sub && <span className="text-xs text-gray-400 mt-1 block font-normal">{opt.sub}</span>}</div>
        </button>
      ))}
    </div>
  </div>
);

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
    <div className="bg-[#FEF2F2] rounded-xl p-4 text-left border border-[#FEE2E2]">
        <h3 className="font-bold text-[#991B1B] text-sm mb-2">{title}</h3>
        <p className="text-xs text-[#7F1D1D] mb-3 leading-relaxed">{text}</p>
        <img src={img} className="rounded-lg w-full object-cover" alt="Evolucao" />
    </div>
);

const BenefitItem = ({ title, desc }) => (
  <li className="flex gap-3 items-start">
    <div className="bg-[#22C55E] text-white p-0.5 rounded-full mt-0.5"><Check size={12} strokeWidth={4} /></div>
    <div><span className="block font-bold text-gray-800 text-xs leading-tight">{title}</span><span className="text-[10px] text-gray-500 leading-tight mt-0.5 block">{desc}</span></div>
  </li>
);

const MetricItem = ({ label, bad, good }) => (
    <div className="space-y-1 mb-2">
        <p className="text-gray-800">{label}</p>
        <div className="flex justify-between text-gray-400"><span className="text-red-500">🔴 {bad}</span> <span>95%</span></div>
        <div className="h-1 bg-gray-200 rounded-full"><div className="h-full bg-red-500 w-[95%]"></div></div>
        <div className="flex justify-between text-gray-400 mt-1"><span className="text-green-500">🟢 {good}</span> <span>10%</span></div>
        <div className="h-1 bg-gray-200 rounded-full"><div className="h-full bg-green-500 w-[10%]"></div></div>
    </div>
);

const Testimonial = ({ name, text }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative text-left">
    <div className="flex text-[#FACC15] mb-2 gap-0.5"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
    <p className="text-xs text-gray-600 italic leading-relaxed">"{text}"</p>
    <p className="text-[10px] font-bold text-gray-900 mt-2 block">{name}</p>
  </div>
);

export default App;