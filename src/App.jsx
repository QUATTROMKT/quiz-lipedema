import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, Star, Leaf, AlertTriangle, PlayCircle, ShieldCheck } from 'lucide-react';

// LINKS E VÍDEOS
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; 

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  // Total de etapas exatas do funil
  const totalSteps = 29; 
  const progress = Math.min(100, Math.max(5, ((currentStep - 1) / (totalSteps - 1)) * 100));

  const scrollToTop = () => window.scrollTo(0, 0);

  // --- FORÇAR CARREGAMENTO DOS VÍDEOS VTURB ---
  useEffect(() => {
    const loadScript = (src) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (!existing) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      }
    };
    // Carrega scripts dos players (Dra Lilian e Vendas)
    loadScript("https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/697c366c02e0aee2dde139e2/v4/player.js");
    loadScript("https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/697c36775c7f3683791b5a5a/v4/player.js");
  }, []);

  // --- NAVEGAÇÃO E LOADING INTELIGENTE ---
  const handleNext = (nextStepOverride) => {
    scrollToTop();
    const next = nextStepOverride || currentStep + 1;

    // Loading 1: Antes do Diagnóstico (De 20 para 21)
    if (currentStep === 20) {
      setLoadingText("Analizando sus respuestas y calculando perfil de inflamación...");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(21);
        scrollToTop();
      }, 3000);
      return;
    }

    // Loading 2: Antes do Protocolo (De 25 para 26)
    if (currentStep === 25) {
      setLoadingText("Generando su protocolo personalizado de 22 días...");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(26);
        scrollToTop();
      }, 3000);
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

  // --- COMPONENTES VISUAIS (HEADER E LOADING) ---
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

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in px-6">
      <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <h2 className="text-xl font-bold text-gray-800 animate-pulse">{loadingText}</h2>
      <p className="text-sm text-gray-500">Por favor, no cierre la página...</p>
    </div>
  );

  // --- RENDERIZAÇÃO DAS ETAPAS ---
  const renderStep = () => {
    if (isLoading) return <LoadingScreen />;

    switch(currentStep) {
      
      // ---------------- ETAPA 1: CAPA ----------------
      case 1:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-3xl font-black text-purple-900 leading-tight uppercase px-2">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600 px-2 font-medium">
              Responde este test rápido de 2 minutos para recibir tu protocolo personalizado.
            </p>
            <div className="rounded-xl overflow-hidden shadow-xl mx-auto max-w-sm w-full border-4 border-white">
              <img src="/capa.webp" alt="Antes e Depois" className="w-full h-auto" />
            </div>
            
            <button 
              onClick={() => handleNext()} 
              className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-xl shadow-lg hover:bg-purple-700 transition active:scale-95 animate-bounce-slow"
            >
              INICIAR CONSULTA
            </button>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3 text-left text-sm text-red-800">
              <AlertTriangle className="shrink-0 text-red-500" size={20} />
              <p><strong>Atención:</strong> Solo una consulta está disponible. Si sales de esta página, perderás esta oportunidad.</p>
            </div>
          </div>
        );

      // ---------------- ETAPA 2: ÁGUA ----------------
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">¿Cuántos vasos de agua sueles beber al día?</h2>
              <p className="text-gray-500 text-sm">Elige la opción que mejor te represente.</p>
            </div>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🌵</span>
                <div><span className="block font-bold text-gray-800 text-lg">Menos de 2 vasos al día</span><span className="text-xs text-gray-400 mt-1 block">(Casi no bebo agua)</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">💧</span>
                <div><span className="block font-bold text-gray-800 text-lg">Entre 2 y 4 vasos al día</span><span className="text-xs text-gray-400 mt-1 block">(Bebo agua, pero sé que es poco)</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">💦</span>
                <div><span className="block font-bold text-gray-800 text-lg">Entre 5 y 7 vasos al día</span><span className="text-xs text-gray-400 mt-1 block">(Intento beber más)</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🚰</span>
                <div><span className="block font-bold text-gray-800 text-lg">Entre 8 y 10 vasos al día</span><span className="text-xs text-gray-400 mt-1 block">(Bebo bastante)</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🌊</span>
                <div><span className="block font-bold text-gray-800 text-lg">Más de 10 vasos al día</span><span className="text-xs text-gray-400 mt-1 block">(Bebo todo el día)</span></div>
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 3: ATIVIDADE ----------------
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">¿Cómo es tu rutina de actividad física hoy?</h2>
              <p className="text-gray-500 text-sm">Selecciona la opción que mejor te describa:</p>
            </div>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🐌</span>
                <div><span className="block font-bold text-gray-800 text-lg">Sedentaria, no hago ejercicio</span><span className="text-xs text-gray-400 mt-1 block">La falta de movimiento empeora el lipedema</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🚶‍♀️</span>
                <div><span className="block font-bold text-gray-800 text-lg">Camino regularmente</span><span className="text-xs text-gray-400 mt-1 block">Caminar es positivo</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">🏋️‍♀️</span>
                <div><span className="block font-bold text-gray-800 text-lg">Hago ejercicio 3x semana</span><span className="text-xs text-gray-400 mt-1 block">Mantenerte activa ayuda</span></div>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95 group">
                <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">💪</span>
                <div><span className="block font-bold text-gray-800 text-lg">Entreno casi todos los días</span><span className="text-xs text-gray-400 mt-1 block">Rutina intensa</span></div>
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 4: ESTÁGIOS ----------------
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">¿En qué etapa está tu lipedema hoy?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border-2 border-gray-100 rounded-xl p-3 hover:border-purple-500 transition shadow-sm active:scale-95">
                <img src="/estagio-1.webp" className="w-full mb-3 rounded" alt="Estagio 1 e 2" />
                <h3 className="font-bold text-gray-800">Estadio 1 | 2</h3>
                <p className="text-xs text-gray-500 mt-1">Actuar a tiempo es clave.</p>
              </div>
              <div onClick={() => handleNext()} className="cursor-pointer bg-white border-2 border-gray-100 rounded-xl p-3 hover:border-purple-500 transition shadow-sm active:scale-95">
                <img src="/estagio-2.webp" className="w-full mb-3 rounded" alt="Estagio 3 e 4" />
                <h3 className="font-bold text-gray-800">Estadio 3 | 4</h3>
                <p className="text-xs text-gray-500 mt-1">Lipedema avanzado.</p>
              </div>
            </div>
          </div>
        );

      // ---------------- ETAPA 5: ADVERTORIAL ----------------
      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-700 text-white px-4 py-3 font-bold text-sm flex justify-between items-center">
              <span>SALUD | LIPEDEMA</span>
              <span>🔍</span>
            </div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                Especialistas revelan: Nuevo protocolo elimina grasa inflamada en hasta 22 días.
              </h2>
              <div className="text-xs text-gray-400 border-b pb-2">Por Sofia Ramirez | 2026</div>
              <img src="/noticia.webp" className="w-full rounded-lg" alt="Noticia" />
              <p className="text-sm text-gray-700 leading-relaxed">
                Un nuevo enfoque que combina <strong>alimentos anti-inflamatorios</strong> está revolucionando el tratamiento. Elimina hasta 4kg sin cirugía.
              </p>
              <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow mt-2">
                CONTINUAR CONSULTA
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 6: CONHECIMENTO ----------------
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center text-gray-900">¿Conoces los alimentos y suplementos antilipedema?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95">
                <span className="text-2xl">🥱</span> <span className="font-bold text-gray-800">No, nunca he escuchado hablar</span>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95">
                <span className="text-2xl">😛</span> <span className="font-bold text-gray-800">Sí, pero no sé cuáles son</span>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95">
                <span className="text-2xl">🤔</span> <span className="font-bold text-gray-800">Conozco un poco, pero no lo aplico</span>
              </button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95">
                <span className="text-2xl">🥗</span> <span className="font-bold text-gray-800">Sí, conozco y ya he probado</span>
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 7: EDUCACIONAL ----------------
      case 7:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-black text-purple-800 uppercase">¿LO SABÍAS?</h2>
            <div className="bg-gray-50 p-4 rounded-xl text-left text-gray-700 space-y-3">
              <p>Sin una <strong>alimentación adecuada</strong>, las células de grasa siguen empeorando.</p>
              <p className="font-medium text-red-600">Cirugías y drenajes no curan la causa raíz.</p>
            </div>
            <img src="/prova.webp" className="w-full rounded-xl shadow-md" alt="Prova" />
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPA 8: VSL DRA LILIAN (VÍDEO 1) ----------------
      case 8:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-gray-900">Antes de continuar, déjame presentarme…</h2>
            {/* VÍDEO VTURB 1 */}
            <div className="w-full max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200">
               <vturb-smartplayer id="vid-697c366c02e0aee2dde139e2" style={{width: '100%', display: 'block'}}></vturb-smartplayer>
            </div>
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg mt-4 animate-pulse shadow-lg">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPAS 9 a 15 (SINTOMAS) ----------------
      case 9:
        return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Hace cuánto tiempo convives con el lipedema?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">⏳</span> <span className="font-bold text-gray-800">Lo descubrí hace poco</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">📅</span> <span className="font-bold text-gray-800">Entre 1 y 3 años</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">⚠</span> <span className="font-bold text-gray-800">Entre 3 y 5 años</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🫀</span> <span className="font-bold text-gray-800">Hace más de 5 años</span></button>
            </div>
          </div>
        );

      case 10:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Frecuencia de incomodidad?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😢</span> <span className="font-bold text-gray-800">Casi todos los días</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🙂</span> <span className="font-bold text-gray-800">En general, me siento bien</span></button>
            </div>
          </div>
        );

      case 11:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Frecuencia de dolor?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😭</span> <span className="font-bold text-gray-800">Dolor casi todo el tiempo</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🦵</span> <span className="font-bold text-gray-800">No siento dolor</span></button>
            </div>
          </div>
        );

      case 12:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Restricción alimentaria?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🍽️</span> <span className="font-bold text-gray-800">Sí, tengo restricciones</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">❌</span> <span className="font-bold text-gray-800">No tengo</span></button>
            </div>
          </div>
        );

      case 13:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Dificultad para encontrar ropa?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">👗</span> <span className="font-bold text-gray-800">Sí, casi nunca encuentro</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🙂</span> <span className="font-bold text-gray-800">No, compro sin problemas</span></button>
            </div>
          </div>
        );

      case 14:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Sientes hinchazón?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😲</span> <span className="font-bold text-gray-800">Sí, muy hinchadas</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🙂</span> <span className="font-bold text-gray-800">No, se sienten bien</span></button>
            </div>
          </div>
        );

      case 15:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Sientes dolor al tocarte?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😭</span> <span className="font-bold text-gray-800">Sí, mucho dolor</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🙂</span> <span className="font-bold text-gray-800">No, no siento dolor</span></button>
            </div>
          </div>
        );

      // ---------------- ETAPA 16: MARCAS NA PELE ----------------
      case 16:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900">¿Notas marcas profundas al quitarte la ropa?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg w-full max-w-sm mx-auto" alt="Marcas" />
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition shadow-sm active:scale-95">Sí, muy parecidas</button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition shadow-sm active:scale-95">A veces</button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition shadow-sm active:scale-95">No me sucede</button>
            </div>
          </div>
        );

      // ---------------- ETAPA 17: ATENÇÃO ----------------
      case 17:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-red-600 font-black text-3xl tracking-widest animate-pulse">⚠️ ATENCIÓN</h2>
            <p className="text-lg text-gray-700">Las próximas preguntas definirán si estás lista para <strong>reducir medidas en 22 días</strong>.</p>
            <img src="/transicao.webp" className="rounded-xl shadow-lg w-full" alt="Transicao" />
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPAS 18-19: COMPROMISSO ----------------
      case 18:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Te gustaría un enfoque natural sin cirugías?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😍</span> <span className="font-bold text-gray-800">¡Sí, me encantaría!</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">💊</span> <span className="font-bold text-gray-800">No, prefiero cirugías</span></button>
            </div>
          </div>
        );

      case 19:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Quieres controlar el lipedema y perder medidas?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😍</span> <span className="font-bold text-gray-800">Sí, quiero librarme del dolor</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😓</span> <span className="font-bold text-gray-800">No, prefiero seguir así</span></button>
            </div>
          </div>
        );

      // ---------------- ETAPA 20: PROVA SOCIAL ----------------
      case 20:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-bold text-gray-900">22 días es todo lo que necesitas...</h2>
            <p className="text-gray-600 text-sm">Mira el resultado de <strong>Sofía</strong>:</p>
            <img src="/sofia.webp" className="rounded-xl shadow-lg w-full" alt="Sofia" />
            <button onClick={() => handleNext()} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:bg-green-600 animate-bounce-slow">
              VER MI RESULTADO
            </button>
          </div>
        );

      // ---------------- ETAPA 21: DIAGNÓSTICO (LAYOUT COMPLEXO) ----------------
      case 21:
        return (
          <div className="space-y-6 pb-10">
            <h2 className="text-center text-2xl font-bold text-gray-900">Aquí está el resultado de su consulta:</h2>
            <p className="text-center text-sm text-gray-500 font-medium">Nivel de gravedad de su caso:</p>
            
            {/* Círculo 91% */}
            <div className="flex justify-center my-4">
              <div className="w-40 h-40 rounded-full border-[12px] border-red-500 flex items-center justify-center bg-white shadow-xl relative">
                <span className="text-5xl font-black text-red-600 tracking-tighter">91%</span>
              </div>
            </div>

            <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center font-bold border border-red-200 shadow-sm">
              Resultado: <span className="text-red-600">Preocupante, necesita actuar rápidamente!</span>
            </div>

            {/* Barras Coloridas */}
            <div className="space-y-6 px-2 pt-4">
               {/* Inflamacion */}
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700"><span>Nivel de inflamación</span><span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px]">82%</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative mt-1">
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md z-10" style={{ left: '82%' }}>TÚ</div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-wider"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
               </div>
               
               {/* Hinchazon */}
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700"><span>Nivel de hinchazón</span><span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px]">62%</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative mt-1">
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md z-10" style={{ left: '62%' }}>TÚ</div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-wider"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
               </div>

               {/* Salud */}
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700"><span>Nivel de salud</span><span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px]">47%</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative mt-1">
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md z-10" style={{ left: '47%' }}>TÚ</div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-wider"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
               </div>

               {/* Empoderamiento */}
               <div>
                  <div className="flex justify-between text-xs font-bold mb-1 text-gray-700"><span>Nivel de empoderamiento</span><span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px]">92%</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative mt-1">
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md z-10" style={{ left: '92%' }}>TÚ</div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-wider"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
               </div>
            </div>

            <div className="py-4">
              <img src="/diag-body.webp" className="mx-auto w-3/4 max-w-xs" alt="Corpo" />
            </div>

            <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-left space-y-3">
              <div className="flex items-center gap-2 font-bold text-green-700 text-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Tiene un perfil adecuado
              </div>
              <p className="text-sm text-green-800">
                De acuerdo con sus respuestas, encontramos que está lista para desinflamar su lipedema a través de una alimentación natural.
              </p>
            </div>

            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-xl text-lg animate-bounce-slow">
              ¡QUIERO SABER MÁS! 😍
            </button>
          </div>
        );

      // ---------------- ETAPA 22: TENTATIVAS ----------------
      case 22:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Has intentado todo para tratar el lipedema, pero nada funciona?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😓</span> <span className="font-bold text-gray-800">Lo he intentado todo y nunca tuve resultado</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">🤔</span> <span className="font-bold text-gray-800">Nunca he probado ningún enfoque antilipedema</span></button>
            </div>
          </div>
        );

      // ---------------- ETAPA 23: SOLUÇÃO ----------------
      case 23:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">No más Intentos Frustrados: Conozca el Protocolo que Ataca el Lipedema en la Raíz</h2>
            <p className="text-gray-600 text-sm">La unión de alimentación antiinflamatoria y suplementación específica transforma su salud.</p>
            <img src="/alimentos.webp" className="rounded-xl shadow-lg border border-gray-100" alt="Alimentos" />
            <button onClick={() => handleNext()} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 transition active:scale-95">
              <Leaf className="fill-current" /> ¡QUIERO CONOCER EL PROTOCOLO!
            </button>
          </div>
        );

      // ---------------- ETAPA 24: CONFIRMAÇÃO ----------------
      case 24:
         return (
           <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-center">¿Desea reducir la hinchazón en 22 días?</h2>
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">☺️</span> <span className="font-bold text-gray-800">¡Sí, quiero mucho!</span></button>
              <button onClick={() => handleNext()} className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition text-left shadow-sm active:scale-95"><span className="text-2xl">😁</span> <span className="font-bold text-gray-800">¡Sí, quiero empezar ahora!</span></button>
            </div>
          </div>
        );

      // ---------------- ETAPA 25: MEDO E EVOLUÇÃO ----------------
      case 25:
        return (
          <div className="text-center space-y-6 bg-white pb-6">
            <h2 className="text-xl font-black text-gray-900 uppercase">Vea lo que sucede cuando el lipedema no se trata a tiempo…</h2>
            
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-left shadow-sm">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle size={16}/> El lipedema solo empeora</h3>
              <p className="text-sm text-red-700">Las piernas están cada vez más hinchadas, desproporcionadas y doloridas.</p>
            </div>
            <img src="/evolucao.webp" className="rounded-xl w-full border border-gray-100 shadow-sm" alt="Evolucao" />
            
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-left shadow-sm mt-4">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle size={16}/> Su movilidad disminuye</h3>
              <p className="text-sm text-red-700">El peso limita los movimientos, tornando hasta el caminar un desafío diario.</p>
            </div>
            <img src="/mobilidade.webp" className="rounded-xl w-2/3 mx-auto border border-gray-100 shadow-sm" alt="Mobilidade" />
            
            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-sm uppercase shadow-lg hover:scale-105 transition">
              FINALIZAR CONSULTA Y ACCEDER AL PROTOCOLO
            </button>
          </div>
        );

      // ---------------- ETAPA 26: PROTOCOLO GERADO ----------------
      case 26:
        return (
          <div className="text-center space-y-6 animate-fade-in">
             <div className="bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 text-sm mx-auto border border-green-200">
                <Check size={18} strokeWidth={3} /> Protocolo personalizado generado!
             </div>
             <h2 className="text-xl font-bold text-gray-900">Analizando su perfil, desarrollamos un método personalizado.</h2>
             
             <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
               <div className="grid grid-cols-2">
                 <div className="bg-red-500 text-white text-xs font-bold py-1">Antes</div>
                 <div className="bg-green-500 text-white text-xs font-bold py-1">Después de 22 días</div>
               </div>
               <img src="/final-shorts.webp" className="w-full object-cover" alt="Resultado Shorts" />
             </div>

             <button onClick={() => handleNext()} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-xl animate-pulse">
               QUIERO GARANTIZAR MI PROTOCOLO
             </button>
          </div>
        );

      // ---------------- ETAPA 27: BENEFÍCIOS + ANCORAGEM ----------------
      case 27:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-center leading-tight text-gray-900">Beneficios que vas a tener al adquirir el Protocolo Lipedema:</h2>
            
            <ul className="space-y-4">
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm items-start">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5"><Check size={14} strokeWidth={4} /></div>
                <div><span className="block font-bold text-gray-800 text-sm leading-tight">Clases en video</span><span className="text-xs text-gray-500 leading-tight mt-1 block">Orientación médica paso a paso.</span></div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm items-start">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5"><Check size={14} strokeWidth={4} /></div>
                <div><span className="block font-bold text-gray-800 text-sm leading-tight">Protocolo Alimentario</span><span className="text-xs text-gray-500 leading-tight mt-1 block">Menú para 22 días.</span></div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm items-start">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5"><Check size={14} strokeWidth={4} /></div>
                <div><span className="block font-bold text-gray-800 text-sm leading-tight">Lista VIP de compras</span><span className="text-xs text-gray-500 leading-tight mt-1 block">Compra con estrategia.</span></div>
              </li>
              <li className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm items-start">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5"><Check size={14} strokeWidth={4} /></div>
                <div><span className="block font-bold text-gray-800 text-sm leading-tight">Planner semanal</span><span className="text-xs text-gray-500 leading-tight mt-1 block">Organiza tu rutina.</span></div>
              </li>
            </ul>

            {/* Box Amarelo */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-200 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg">OFERTA ESPECIAL</div>
              <h3 className="text-center font-bold text-yellow-900 mb-4 uppercase text-sm tracking-wide">Resumen de lo que vas a recibir</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed"><span className="text-gray-700 font-medium text-xs">Protocolo Lipedema</span><span className="text-gray-400 font-bold line-through text-xs">USD 97</span></div>
                <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed"><span className="text-gray-700 font-medium text-xs">Planner semanal</span><span className="text-gray-400 font-bold line-through text-xs">USD 37</span></div>
                <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed"><span className="text-gray-700 font-medium text-xs">Dieta antiinflamatoria</span><span className="text-gray-400 font-bold line-through text-xs">USD 27</span></div>
                <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed"><span className="text-gray-700 font-medium text-xs">Lista VIP de compras</span><span className="text-gray-400 font-bold line-through text-xs">USD 27</span></div>
                <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed"><span className="text-gray-700 font-medium text-xs">Desafío guiado</span><span className="text-gray-400 font-bold line-through text-xs">USD 97</span></div>
              </div>

              <div className="mt-6 pt-4 border-t border-yellow-200 text-center space-y-1">
                 <p className="text-red-400 font-bold line-through text-sm">Valor real: USD 285</p>
                 <p className="text-lg font-bold text-gray-700">Hoy solo:</p>
                 <p className="text-5xl font-black text-green-600 tracking-tighter">USD 9,90</p>
                 <p className="text-xs text-gray-500">Menos de un café al día ☕</p>
              </div>
            </div>

            <button onClick={() => handleNext()} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition">
              QUIERO GARANTIZAR MI PROTOCOLO
            </button>
          </div>
        );

      // ---------------- ETAPA 28: VSL VENDAS (VÍDEO 2) ----------------
      case 28:
         return (
           <div className="text-center space-y-6">
             <div className="bg-red-600 text-white text-xs font-bold py-1 px-4 rounded-full inline-block mb-2">ATENCIÓN: ÚLTIMO PASO</div>
             <h2 className="text-2xl font-black uppercase text-gray-900 leading-none">Vea cómo funciona el protocolo</h2>
             
             {/* VÍDEO VTURB 2 */}
             <div className="w-full max-w-[400px] mx-auto bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <vturb-smartplayer id="vid-697c36775c7f3683791b5a5a" style={{width: '100%', display: 'block'}}></vturb-smartplayer>
             </div>

             <button onClick={() => handleNext()} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-xl animate-bounce-slow shadow-xl">
               QUIERO ADELGAZAR AHORA
             </button>
           </div>
         );

      // ---------------- ETAPA 29: OFERTA FINAL + GARANTIA ----------------
      case 29:
        return (
          <div className="text-center space-y-8 pb-10">
            <div className="space-y-2">
              <div className="bg-red-600 text-white text-xs font-bold py-1 px-4 rounded-full inline-block animate-pulse">OFERTA POR TIEMPO LIMITADO</div>
              <h1 className="text-5xl font-black text-gray-900 leading-tight">
                <span className="block text-gray-400 text-xl font-medium line-through mb-1">de USD 285</span>
                <span className="text-green-600">USD 9,90</span>
              </h1>
            </div>

            <a href={CHECKOUT_LINK} className="w-full bg-purple-600 text-white font-black py-5 rounded-xl text-xl shadow-xl block hover:-translate-y-1 animate-bounce-slow">
              QUIERO GARANTIZAR MI CUPO
            </a>

            {/* Depoimentos */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-6 shadow-inner">
               <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider text-center">Lo que dicen nuestras alumnas</h3>
               
               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex text-yellow-400 mb-2 gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <p className="text-sm text-gray-600 italic">"Nunca pensé que algo tan simple funcionaría. Mi dolor bajó."</p>
                  <p className="text-xs font-bold text-gray-900 mt-2">- Laura Martínez</p>
               </div>

               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex text-yellow-400 mb-2 gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <p className="text-sm text-gray-600 italic">"Aprendí a controlar la inflamación. Me veo y me siento diferente."</p>
                  <p className="text-xs font-bold text-gray-900 mt-2">- Valentina Gómez</p>
               </div>
            </div>

            {/* Garantia */}
            <div className="pt-2">
              <img src="/garantia.webp" alt="Garantia 7 Dias" className="w-48 mx-auto hover:scale-105 transition duration-300" />
              <p className="text-xs text-gray-400 mt-4 max-w-xs mx-auto leading-relaxed">
                Prueba el protocolo por 7 días. Si no estás satisfecha, te devolvemos el 100% de tu dinero.
              </p>
            </div>
            
            <a href={CHECKOUT_LINK} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-green-600 shadow-lg block">
              QUIERO ACCEDER CON GARANTÍA
            </a>

            <div className="text-[10px] text-gray-300 mt-12 pt-8 border-t border-gray-100 space-y-2">
              <p>© 2026 Protocolo Lipedema: Adiós en 22 Días</p>
              <p>Este sitio no es parte del sitio web de Facebook o Facebook Inc.</p>
              <p>Criado via inlead.digital | Central de anúncios</p>
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

export default App;