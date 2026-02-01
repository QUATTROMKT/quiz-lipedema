import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, Star, AlertTriangle, Menu, Search, Lock, ShieldCheck } from 'lucide-react';

// --- CONFIGURAÇÕES GERAIS ---
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; 
const VSL_1_ID = "697c366c02e0aee2dde139e2"; // Vídeo Apresentação
const VSL_2_ID = "697c36775c7f3683791b5a5a"; // Vídeo Explicação Rápida

// --- COMPONENTE: VÍDEO COM DELAY NO BOTÃO ---
const SmartVideoStep = ({ videoId, onNext, delaySeconds = 10 }) => {
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Timer para liberar o botão
    const timer = setTimeout(() => setShowButton(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [delaySeconds]);

  useEffect(() => {
    const existing = document.querySelectorAll(`script[src*="${videoId}"]`);
    existing.forEach(e => e.remove());

    const script = document.createElement("script");
    script.src = `https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/${videoId}/v4/player.js`;
    script.async = true;
    
    if (containerRef.current) {
        containerRef.current.innerHTML = ''; 
        const playerTag = document.createElement('vturb-smartplayer');
        playerTag.id = `vid-${videoId}`;
        playerTag.style.width = '100%';
        playerTag.style.display = 'block';
        containerRef.current.appendChild(playerTag);
        containerRef.current.appendChild(script);
    }
  }, [videoId]);

  return (
    <div className="space-y-6 w-full animate-fade-in">
      <div ref={containerRef} className="w-full bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 min-h-[220px]"></div>
      
      <div className={`transition-all duration-700 ease-in-out ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'}`}>
        <button onClick={onNext} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-xl uppercase tracking-wide animate-pulse hover:bg-purple-800 transition-colors">
          CONTINUAR
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE: CARTÃO DE OPÇÃO ---
const OptionCard = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="w-full bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-4 mb-3 hover:border-purple-500 hover:shadow-md transition-all active:scale-[0.98] group text-left">
    <div className="text-3xl shrink-0">{icon}</div>
    <div className="flex-1">
      <span className="block font-bold text-gray-800 text-[16px] leading-tight group-hover:text-purple-700">{title}</span>
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Lógica do "Loading Fake"
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
    }, 250);
  };

  const handleNext = (nextStepOverride) => {
    scrollToTop();
    const next = nextStepOverride || currentStep + 1;

    // GATILHOS DE LOADING
    if (currentStep === 21) { 
       runLoading("Analizando su perfil...", 23); // Pula 22
       return;
    }
    if (currentStep === 27) { 
       runLoading("Generando protocolo...", 29); // Pula 28
       return;
    }
    
    setCurrentStep(next);
  };

  const handlePrev = () => {
    if (currentStep > 1) { setCurrentStep(prev => prev - 1); scrollToTop(); }
  };

  const Header = () => (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <div className="h-1.5 bg-gray-100 w-full"><div className="h-full bg-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div></div>
      <div className="flex items-center justify-center p-3 h-14 relative">
        {currentStep > 1 && !isLoading && currentStep < 29 && (
            <button onClick={handlePrev} className="absolute left-4 text-gray-400 hover:text-purple-600 transition">
                <ChevronLeft size={24} />
            </button>
        )}
        <img src="/logo.webp" alt="Logo" className="h-8 object-contain" />
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-pulse">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex justify-between text-xs font-bold text-gray-800">
            <span>{loadingText}</span>
            <span>{Math.round(loadingProgress)}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full bg-purple-600 transition-all duration-200" style={{ width: `${loadingProgress}%` }}></div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4 max-w-xs font-medium">
        {currentStep === 27 
            ? "Inteligencia Artificial está creando su plan personalizado..." 
            : "Cruzando sus datos con base científica..."}
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
            <h1 className="text-2xl font-black text-purple-800 leading-tight uppercase px-1">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600 text-sm px-4">
              Responde este test rápido de 2 minutos y recibe el <strong>Protocolo Lipedema: Adiós en 22 Días</strong>.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white mx-auto max-w-xs rotate-1 hover:rotate-0 transition duration-500">
                <img src="/capa.webp" className="w-full bg-gray-100" alt="Capa" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-xl uppercase animate-bounce mt-4">
              INICIAR CONSULTA
            </button>
            <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-left text-xs text-red-800 space-y-1 mx-2">
                <p className="font-bold flex gap-2 items-center"><AlertTriangle size={14}/> Atención:</p>
                <p>Solo una consulta está disponible por IP.</p>
            </div>
          </div>
        );

      case 2: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-2">¿Cuántos vasos de agua sueles beber al día?</h2><OptionCard icon="🌵" title="Menos de 2 vasos al día" subtitle="(Casi no bebo agua)" onClick={() => handleNext()} /><OptionCard icon="💧" title="Entre 2 y 4 vasos al día" subtitle="(Bebo poco)" onClick={() => handleNext()} /><OptionCard icon="💦" title="Entre 5 y 7 vasos al día" subtitle="(Intento beber más)" onClick={() => handleNext()} /><OptionCard icon="🚰" title="Entre 8 y 10 vasos al día" subtitle="(Bebo bastante)" onClick={() => handleNext()} /><OptionCard icon="🌊" title="Más de 10 vasos al día" subtitle="(Hidratación total)" onClick={() => handleNext()} /></div>;
      case 3: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-2">¿Cómo es tu rutina de actividad física hoy?</h2><OptionCard icon="🐌" title="Sedentaria" subtitle="No hago ejercicio actualmente." onClick={() => handleNext()} /><OptionCard icon="🚶‍♀️" title="Camino regularmente" subtitle="Caminar es mi única actividad." onClick={() => handleNext()} /><OptionCard icon="🏋️‍♀️" title="Ejercicio 3x semana" subtitle="Intento mantenerme activa." onClick={() => handleNext()} /><OptionCard icon="💪" title="Entreno intenso" subtitle="Todos los días." onClick={() => handleNext()} /></div>;

      // 4. ESTÁGIOS
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900">¿En qué etapa visual crees que estás?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleNext()} className="bg-white border-2 border-transparent hover:border-purple-500 rounded-2xl p-2 shadow-md transition-all active:scale-95">
                <img src="/estagio-1.webp" className="w-full mb-3 rounded-lg" />
                <h3 className="font-bold text-gray-800">Estadio 1 | 2</h3>
              </button>
              <button onClick={() => handleNext()} className="bg-white border-2 border-transparent hover:border-purple-500 rounded-2xl p-2 shadow-md transition-all active:scale-95">
                <img src="/estagio-2.webp" className="w-full mb-3 rounded-lg" />
                <h3 className="font-bold text-gray-800">Estadio 3 | 4</h3>
              </button>
            </div>
          </div>
        );

      // 5. INTERRUPÇÃO: NOTÍCIA
      case 5:
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden font-sans mx-1">
            <div className="bg-[#D93025] text-white px-4 py-3 font-bold flex justify-between items-center text-sm">
                <div className="flex gap-2 items-center"><Menu size={18}/> SALUD</div>
                <Search size={18}/>
            </div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-black text-gray-900 leading-tight">
                <span className="text-[#D93025]">Estudio revela:</span> Nuevo protocolo natural desinflama el lipedema en tiempo récord.
              </h2>
              <div className="text-xs text-gray-400 italic border-b pb-2">Por Dra. Sofia Ramirez | 10 min de lectura</div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Especialistas confirman que un enfoque basado en <strong>alimentos específicos</strong> puede revertir la inflamación de las células de grasa...
              </p>
              <img src="/noticia.webp" className="w-full rounded-lg my-2" />
              <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg uppercase shadow mt-2 hover:bg-purple-800">
                CONTINUAR LEYENDO
              </button>
            </div>
          </div>
        );

      case 6: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-2">¿Conoces los alimentos antiinflamatorios?</h2><OptionCard icon="🥱" title="No, nunca he escuchado" onClick={() => handleNext()} /><OptionCard icon="😝" title="He escuchado, pero no sé cuáles son" onClick={() => handleNext()} /><OptionCard icon="🤔" title="Sí, pero tengo dudas" onClick={() => handleNext()} /><OptionCard icon="🥗" title="Sí, conozco y ya probé" onClick={() => handleNext()} /></div>;

      // 7. CURIOSIDADE
      case 7:
        return (
          <div className="space-y-6 text-center px-1">
            <div className="bg-purple-100 inline-block px-4 py-1.5 rounded-full"><h2 className="text-lg font-black text-purple-700 uppercase tracking-wide">¿LO SABÍAS?</h2></div>
            <div className="bg-white p-6 rounded-2xl text-left shadow-lg border border-purple-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                <p className="text-gray-700 text-[15px] leading-relaxed">
                    Sin una <span className="font-bold text-purple-700">alimentación adecuada</span>, las células de grasa del lipedema se vuelven "blindadas" contra dietas comunes.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 text-red-600 font-bold text-sm flex gap-2 items-center">
                    <AlertTriangle size={16} /> Cirugías y drenajes no curan la raíz.
                </div>
            </div>
            <img src="/prova.webp" className="w-full rounded-xl shadow-md border border-gray-100" />
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl uppercase shadow-xl tracking-wide">
                ENTENDIDO, CONTINUAR
            </button>
          </div>
        );

      // 8. VSL 1 (Apresentação - Delay 10s)
      case 8: return <div className="text-center"><h2 className="text-xl font-bold text-gray-900 mb-4 px-4">Antes de continuar, mira este mensaje rápido...</h2><SmartVideoStep videoId={VSL_1_ID} onNext={handleNext} delaySeconds={10} /></div>;

      case 9: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Hace cuánto tiempo convives con el lipedema?</h2><OptionCard icon="⏳" title="Lo descubrí hace poco" onClick={() => handleNext()} /><OptionCard icon="📅" title="Hace más de 1 año" onClick={() => handleNext()} /><OptionCard icon="⚠️" title="Hace más de 3 años" onClick={() => handleNext()} /><OptionCard icon="🫀" title="Hace más de 5 años" onClick={() => handleNext()} /></div>;
      case 10: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Con qué frecuencia te sientes incómoda?</h2><OptionCard icon="😢" title="Casi todos los días" onClick={() => handleNext()} /><OptionCard icon="🙁" title="Algunas veces en la semana" onClick={() => handleNext()} /><OptionCard icon="😐" title="De vez en cuando" onClick={() => handleNext()} /><OptionCard icon="😊" title="Me siento bien" onClick={() => handleNext()} /></div>;
      case 11: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Frecuencia de dolor en las piernas?</h2><OptionCard icon="😭" title="Siento dolor intenso y constante" onClick={() => handleNext()} /><OptionCard icon="😟" title="Siento dolor moderado" onClick={() => handleNext()} /><OptionCard icon="😊" title="Casi no siento dolor" onClick={() => handleNext()} /></div>;
      case 12: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Tiene alguna restricción alimentaria?</h2><OptionCard icon="🍽️" title="Sí, tengo restricciones" onClick={() => handleNext()} /><OptionCard icon="😋" title="No, como de todo" onClick={() => handleNext()} /><OptionCard icon="🤢" title="Algunos alimentos me caen mal" onClick={() => handleNext()} /><OptionCard icon="🤔" title="No estoy segura" onClick={() => handleNext()} /></div>;
      case 13: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Dificultad para encontrar ropa?</h2><OptionCard icon="👕" title="Sí, casi nunca encuentro" onClick={() => handleNext()} /><OptionCard icon="👖" title="Dificultad con pantalones" onClick={() => handleNext()} /><OptionCard icon="👜" title="He dejado de comprar ropa" onClick={() => handleNext()} /><OptionCard icon="😊" title="No, compro sin problemas" onClick={() => handleNext()} /></div>;
      case 14: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Sientes hinchazón al final del día?</h2><OptionCard icon="😲" title="Sí, mis piernas se hinchan mucho" subtitle="Señal de alerta máxima." onClick={() => handleNext()} /><OptionCard icon="😣" title="Sí, hinchazón y dolor" subtitle="Inflamación activa." onClick={() => handleNext()} /><OptionCard icon="😊" title="No, mis piernas se sienten bien" onClick={() => handleNext()} /></div>;
      case 15: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Sientes dolor al tocarte las piernas?</h2><OptionCard icon="😭" title="Sí, mucho dolor" onClick={() => handleNext()} /><OptionCard icon="😣" title="Sí, molestia leve" onClick={() => handleNext()} /><OptionCard icon="😕" title="Solo a veces" onClick={() => handleNext()} /><OptionCard icon="😊" title="No siento dolor" onClick={() => handleNext()} /></div>;

      // 16. MARCAS
      case 16:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900">¿Notas marcas profundas al quitarte la ropa (como calcetines)?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg w-full max-w-sm mx-auto border border-gray-100" />
            <div className="space-y-2 pt-2">
                <OptionCard icon="😭" title="Sí, quedan muy marcadas" subtitle="Retención severa." onClick={() => handleNext()} />
                <OptionCard icon="😟" title="A veces sucede" subtitle="Retención moderada." onClick={() => handleNext()} />
                <OptionCard icon="😊" title="No, esto no me sucede" onClick={() => handleNext()} />
            </div>
          </div>
        );

      // 17. VSL 2 (Explicação Rápida - Delay 10s)
      case 17:
        return (
          <div className="space-y-4 text-center">
            <div className="font-bold text-gray-800 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center gap-2">
                <span className="bg-green-100 text-green-700 p-1 rounded">🎧</span> Mira esta explicación rápida:
            </div>
            <SmartVideoStep videoId={VSL_2_ID} onNext={handleNext} delaySeconds={10} />
          </div>
        );

      // 18. ATENÇÃO
      case 18:
        return (
          <div className="text-center space-y-6 px-2">
            <div className="bg-red-100 inline-block px-6 py-2 rounded-lg border border-red-200 shadow-sm">
                <h2 className="text-red-700 font-black text-3xl tracking-widest uppercase">ATENCIÓN</h2>
            </div>
            <p className="text-gray-700 font-medium text-lg leading-snug">
                Las próximas preguntas son vitales. Con ellas podremos evaluar si tu cuerpo está listo para <strong>reducir medidas en 22 días</strong>.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl mx-2 border-2 border-white">
                <img src="/transicao.webp" className="w-full object-cover" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-red-600 text-white font-bold py-5 rounded-xl text-xl shadow-lg uppercase tracking-wider animate-pulse hover:bg-red-700 transition">
                CONTINUAR CONSULTA
            </button>
          </div>
        );

      // 19-20 COMPROMISSO
      case 19: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Te gustaría tener acceso a un enfoque 100% natural sin cirugías?</h2><OptionCard icon="😍" title="¡Sí, me encantaría!" onClick={() => handleNext()} /><OptionCard icon="💊" title="No, prefiero métodos invasivos" onClick={() => handleNext()} /></div>;
      case 20: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-4">¿Estás dispuesta a dedicar 20 minutos al día para librarte del dolor?</h2><OptionCard icon="😍" title="Sí, quiero librarme del dolor" onClick={() => handleNext()} /><OptionCard icon="😓" title="No, no tengo tiempo" onClick={() => handleNext()} /></div>;

      // 21. PROVA SOCIAL
      case 21:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-2xl font-black text-gray-900">22 días es todo lo que necesitas...</h2>
            <p className="text-gray-600 text-sm">Este fue el resultado real que <strong>Sofía</strong> consiguió aplicando el protocolo.</p>
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500">
                <img src="/sofia.webp" className="w-full" />
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg uppercase tracking-wide mt-4">
                VER MI RESULTADO
            </button>
          </div>
        );

      // 22: PULADO PELO LOADING

      // 23. DIAGNÓSTICO
      case 23:
        return (
          <div className="space-y-6 pb-10">
            <h2 className="text-center text-2xl font-black text-gray-900 leading-tight">Aquí está el resultado de su consulta:</h2>
            <p className="text-center text-xs text-gray-500 uppercase font-bold tracking-widest border-b border-gray-100 pb-4">Nivel de gravedad detectado:</p>
            
            <div className="flex justify-center my-6 relative">
              <div className="w-40 h-40 rounded-full border-[12px] border-[#EF4444] border-t-transparent border-l-[#EF4444] rotate-45 flex items-center justify-center bg-white shadow-inner">
                 <div className="-rotate-45 text-center">
                    <span className="text-5xl font-black text-gray-800 block">91%</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Crítico</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#FEF2F2] text-[#991B1B] p-4 rounded-xl text-center font-bold border border-[#FCA5A5] text-sm shadow-sm mx-2 animate-pulse">
              Resultado: <span className="text-[#DC2626] font-black uppercase">¡Atención Inmediata!</span>
            </div>

            <div className="space-y-5 px-4 pt-2">
               <ResultSlider label="Inflamación" value="82%" color="bg-red-500" />
               <ResultSlider label="Hinchazón" value="62%" color="bg-orange-500" />
               <ResultSlider label="Metabolismo Lento" value="89%" color="bg-red-600" />
               <ResultSlider label="Salud General" value="47%" color="bg-yellow-500" />
            </div>

            <div className="py-6 flex justify-center opacity-90"><img src="/diag-body.webp" className="w-2/3 max-w-[220px]" /></div>

            <div className="bg-[#F0FDF4] border border-[#86EFAC] p-5 rounded-xl text-left space-y-3 shadow-sm mx-2">
              <div className="flex items-center gap-2 font-bold text-[#15803D] text-sm uppercase tracking-wide">
                  <Check size={18} className="text-green-600" strokeWidth={3} /> Perfil Aprobado
              </div>
              <p className="text-sm text-[#166534] leading-relaxed">
                De acuerdo con sus respuestas, su cuerpo tiene una <strong>alta capacidad de respuesta</strong> al protocolo antiinflamatorio.
              </p>
            </div>

            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl shadow-xl text-lg animate-bounce-slow uppercase tracking-wide hover:bg-purple-800 transition">
                ¡QUIERO SABER MÁS! 😍
            </button>
          </div>
        );

      case 24: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Has intentado todo pero nada funciona?</h2><OptionCard icon="😓" title="Lo he intentado todo sin éxito" onClick={() => handleNext()} /><OptionCard icon="🤔" title="Nunca probé un enfoque específico" onClick={() => handleNext()} /></div>;

      case 25:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-black text-gray-900">No más Intentos Frustrados</h2>
            <p className="text-gray-600 text-sm">El protocolo fue creado para atacar la raíz: la inflamación celular.</p>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100"><img src="/alimentos.webp" className="w-full" /></div>
            <button onClick={() => handleNext()} className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase text-sm tracking-wide">
                ¡QUIERO CONOCER EL PROTOCOLO! 🌿
            </button>
          </div>
        );

      case 26: return <div className="space-y-6"><h2 className="text-xl font-black text-center text-gray-900 mb-6">¿Desea reducir la hinchazón de una vez por todas?</h2><OptionCard icon="🤩" title="¡Sí, quiero mucho!" onClick={() => handleNext()} /><OptionCard icon="😁" title="¡Sí, quiero empezar ahora!" onClick={() => handleNext()} /></div>;

      // 27. MEDO/ESCASSEZ (4 BLOCOS)
      case 27:
        return (
          <div className="text-center space-y-6 bg-white pb-6 px-1">
            <h2 className="text-2xl font-black text-gray-900 uppercase leading-none mb-6">Vea lo que sucede si no se trata...</h2>
            
            <FearBlock 
                title="El lipedema solo empeora." 
                text="Sin tratamiento, la grasa se endurece y causa dolor crónico." 
                img="/evolucao.webp" 
            />
            
            <FearBlock 
                title="Su movilidad disminuye." 
                text="El peso en las piernas comienza a limitar sus movimientos diarios." 
                img="/mobilidade.webp" 
            />

            {/* NOVOS BLOCOS (Conforme prints/nomes solicitados) */}
            <FearBlock 
                title="Problemas de Circulación." 
                text="El riesgo de varices y complicaciones vasculares aumenta drásticamente." 
                img="/medo-3.webp" 
            />

            <FearBlock 
                title="Aislamiento Social." 
                text="La vergüenza del cuerpo impide disfrutar momentos en playa o piscina." 
                img="/medo-4.webp" 
            />
            
            <button onClick={() => handleNext()} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl text-sm uppercase shadow-xl tracking-wider animate-pulse mt-4">
                FINALIZAR CONSULTA Y VER PROTOCOLO
            </button>
          </div>
        );

      // 28: PULADO PELO LOADING

      // 29. SALES PAGE
      case 29:
        return (
          <div className="space-y-8 pb-24 animate-fade-in pt-4">
             {/* RESULTADO (Shorts) */}
             <div className="text-center space-y-4 px-2">
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-2">✅ PROTOCOLO GENERADO</div>
                <h2 className="text-3xl font-black text-gray-900 leading-tight">Su plan personalizado está listo.</h2>
                
                <div className="flex justify-center gap-4 text-[10px] font-bold text-white uppercase mt-4 mb-2">
                    <span className="bg-[#EF4444] px-3 py-1 rounded shadow-sm">Antes</span>
                    <span className="bg-[#22C55E] px-3 py-1 rounded shadow-sm">Después (22 días)</span>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 mx-auto max-w-sm">
                    <img src="/final-shorts.webp" className="w-full object-cover" />
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-left px-2 mt-6">
                    <MetricItem label="Hinchazón" bad="Constante" good="Reducida" percent="95%" />
                    <MetricItem label="Dolores" bad="Diarios" good="Raros" percent="92%" />
                    <MetricItem label="Autoestima" bad="Baja" good="Alta" percent="88%" />
                    <MetricItem label="Resultados" bad="Lentos" good="En 21 días" percent="99%" />
                </div>
             </div>

             {/* BENEFÍCIOS */}
             <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 space-y-5 shadow-sm mx-2">
                <h3 className="font-black text-center text-gray-900 text-xl leading-tight">Lo que recibirás en tu Protocolo:</h3>
                <ul className="space-y-4">
                    <BenefitItem title="Clases en Video Paso a Paso" desc="Orientación médica simple de seguir." />
                    <BenefitItem title="Menú Antiinflamatorio" desc="Plan alimentario completo para 4 semanas." />
                    <BenefitItem title="Lista de Compras Económica" desc="Encuentra todo en tu supermercado local." />
                    <BenefitItem title="Planner Diario" desc="Para que no te pierdas ningún día." />
                </ul>
             </div>

             {/* ANCORAGEM E PREÇO */}
             <div className="bg-[#fffbeb] border-2 border-[#FCD34D] rounded-3xl p-6 shadow-xl text-center relative overflow-hidden mx-2 mt-8">
                <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase shadow-sm">Oferta Relámpago</div>
                
                <h3 className="font-bold text-[#92400E] mb-6 uppercase text-sm tracking-widest border-b border-[#FDE68A] pb-4">Resumen del Pedido</h3>
                
                <div className="space-y-3 text-sm text-gray-700 font-medium text-left mx-auto max-w-[240px]">
                    <p className="flex justify-between"><span>📘 Protocolo Lipedema</span> <span className="line-through text-red-400">USD 97</span></p>
                    <p className="flex justify-between"><span>📅 Planner Semanal</span> <span className="line-through text-red-400">USD 37</span></p>
                    <p className="flex justify-between"><span>🥗 Dieta Detox</span> <span className="line-through text-red-400">USD 27</span></p>
                    <p className="flex justify-between"><span>🛒 Lista de Compras</span> <span className="line-through text-red-400">USD 27</span></p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-[#FCD34D] bg-[#FEF3C7]/50 -mx-6 px-6 pb-2">
                    <p className="text-red-500 font-bold line-through text-sm">Total: USD 285</p>
                    <p className="text-xl font-bold text-gray-800 uppercase mt-2">HOY POR SOLO:</p>
                    <p className="text-6xl font-black text-[#15803D] tracking-tighter drop-shadow-sm my-2">9,90</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide bg-white inline-block px-3 py-1 rounded-full shadow-sm">Pago Único - Acceso Vitalicio</p>
                </div>
             </div>

             {/* CTA PRINCIPAL */}
             <div className="px-2 sticky bottom-4 z-40">
                <a href={CHECKOUT_LINK} className="block w-full bg-[#10B981] text-white font-black py-5 rounded-2xl text-xl shadow-2xl text-center uppercase animate-pulse tracking-wide hover:bg-[#059669] transition transform hover:-translate-y-1 border-b-4 border-[#047857]">
                  QUIERO MI PROTOCOLO
                </a>
                <p className="text-center text-[10px] text-gray-400 mt-2 font-medium flex justify-center gap-1 items-center"><Lock size={10}/> Compra 100% Segura vía Hotmart</p>
             </div>

             {/* PROVA SOCIAL FINAL */}
             <div className="space-y-4 px-3 pt-6">
                <h4 className="text-center font-bold text-gray-900 uppercase text-sm">Lo que dicen nuestras alumnas:</h4>
                <Testimonial name="Laura Martínez" text="Nunca pensé que algo tan simple funcionaría. Mi dolor bajó en 3 días y mis piernas se sienten livianas." />
                <Testimonial name="Valentina Gómez" text="Aprendí a controlar la inflamación. Me veo y me siento diferente. Gracias doctora." />
             </div>

             {/* GARANTIA */}
             <div className="text-center pt-10 pb-4 px-6 bg-gray-50 rounded-t-3xl mt-10">
                <img src="/garantia.webp" alt="Garantia" className="w-28 mx-auto drop-shadow-lg mb-4" />
                <h3 className="font-bold text-gray-900">Prueba por 7 Días</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">Si no te gusta el contenido o no ves resultados, te devolvemos el 100% de tu dinero. Sin preguntas.</p>
                <a href={CHECKOUT_LINK} className="block w-full bg-gray-800 text-white font-bold py-4 rounded-xl text-xs uppercase mt-6 shadow-lg tracking-wide hover:bg-black transition">ACCEDER AHORA CON GARANTÍA</a>
             </div>

             <div className="text-[10px] text-center text-gray-300 mt-10 pb-6"><p>© 2026 Protocolo Lipedema Oficial</p></div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 pt-14 pb-0 px-0 md:max-w-md md:mx-auto md:shadow-2xl md:min-h-screen md:bg-white relative overflow-x-hidden">
      <Header />
      <div className="w-full px-4 md:px-6 pb-8 pt-4 animate-fade-in">{renderStep()}</div>
    </div>
  );
}

// --- SUB-COMPONENTES DE ESTILO ---

const ResultSlider = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[11px] font-bold mb-1.5 text-gray-700"><span>{label}</span><span>{value}</span></div>
    <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
      <div className={`absolute top-0 left-0 h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: value }}></div>
    </div>
  </div>
);

const FearBlock = ({ title, text, img }) => (
    <div className="bg-[#FEF2F2] rounded-2xl p-0 text-left border border-[#FEE2E2] shadow-sm overflow-hidden mx-2 mb-4">
        <div className="p-5 pb-2">
            <h3 className="font-black text-[#991B1B] text-sm mb-2 uppercase leading-tight flex items-center gap-2"><AlertTriangle size={16}/> {title}</h3>
            <p className="text-xs text-[#7F1D1D] mb-4 leading-relaxed font-medium">{text}</p>
        </div>
        <img src={img} className="w-full object-cover h-32" />
    </div>
);

const BenefitItem = ({ title, desc }) => (
  <li className="flex gap-4 items-start bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
    <div className="bg-[#DCFCE7] text-[#166534] p-1.5 rounded-full mt-0.5 shrink-0"><Check size={14} strokeWidth={4} /></div>
    <div><span className="block font-bold text-gray-800 text-sm leading-tight">{title}</span><span className="text-[11px] text-gray-500 leading-tight mt-1 block">{desc}</span></div>
  </li>
);

const MetricItem = ({ label, bad, good, percent }) => (
    <div className="space-y-1 mb-3 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
        <p className="text-gray-900 font-bold text-[11px]">{label}</p>
        <div className="flex justify-between text-gray-400 text-[9px]"><span className="text-red-500 font-bold">🔴 {bad}</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[95%]"></div></div>
        <div className="flex justify-between text-gray-400 mt-1 text-[9px]"><span className="text-green-500 font-bold">🟢 {good}</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[10%]"></div></div>
    </div>
);

const Testimonial = ({ name, text }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md relative text-left">
    <div className="flex text-[#FACC15] mb-2 gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
    <p className="text-xs text-gray-600 italic leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-2 mt-3 border-t border-gray-50 pt-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">{name.charAt(0)}</div>
        <p className="text-[10px] font-black text-gray-900 uppercase tracking-wide">{name} <span className="text-green-500 font-normal ml-1 flex inline items-center gap-0.5"><ShieldCheck size={10}/> Compra Verificada</span></p>
    </div>
  </div>
);

export default App;