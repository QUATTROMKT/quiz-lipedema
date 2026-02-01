import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, Star, Leaf, AlertTriangle } from 'lucide-react';

// Link do Checkout
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; 

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  const totalSteps = 29; 
  const progress = Math.min(100, Math.max(5, ((currentStep - 1) / (totalSteps - 1)) * 100));

  const scrollToTop = () => window.scrollTo(0, 0);

  // Injeção dos Scripts dos Players VTurb (apenas uma vez)
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/697c366c02e0aee2dde139e2/v4/player.js";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://scripts.converteai.net/b6a53cb5-aa1a-47b3-af2b-b93c7fe8b86c/players/697c36775c7f3683791b5a5a/v4/player.js";
    script2.async = true;
    document.head.appendChild(script2);
  }, []);

  // Lógica de Navegação e Loadings
  const handleNext = (nextStepOverride) => {
    scrollToTop();
    const next = nextStepOverride || currentStep + 1;

    // Loading Diagnóstico
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

    // Loading Protocolo
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

  const renderStep = () => {
    if (isLoading) return <LoadingScreen />;

    switch(currentStep) {
      // ETAPA 1: CAPA
      case 1:
        return (
          <div className="text-center space-y-6">
            {/* Headline Roxa conforme pedido */}
            <h1 className="text-2xl md:text-3xl font-black text-purple-800 leading-tight uppercase">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600">
              Responde este test rápido de 2 minutos para recibir tu protocolo personalizado.
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm">
              <img src="/capa.webp" alt="Antes e Depois" className="w-full" />
            </div>
            <button onClick={() => handleNext()} className="btn-primary">
              INICIAR CONSULTA
            </button>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3 text-left text-sm text-red-800">
              <AlertTriangle className="shrink-0 text-red-500" size={20} />
              <p><strong>Atención:</strong> Solo una consulta está disponible. Si sales de esta página, perderás esta oportunidad.</p>
            </div>
          </div>
        );

      case 2: return <QuizStep question="¿Cuántos vasos de agua sueles beber al día?" subtitle="Elige la opción que mejor te represente." options={[{icon:"🌵", text:"Menos de 2 vasos al día", sub:"(Casi no bebo agua)"}, {icon:"💧", text:"Entre 2 y 4 vasos al día", sub:"(Bebo agua, pero sé que es poco)"}, {icon:"💦", text:"Entre 5 y 7 vasos al día", sub:"(Intento beber más)"}, {icon:"🚰", text:"Entre 8 y 10 vasos al día", sub:"(Bebo bastante)"}, {icon:"🌊", text:"Más de 10 vasos al día", sub:"(Bebo todo el día)"}]} onNext={handleNext} />;
      
      case 3: return <QuizStep question="¿Cómo es tu rutina de actividad física hoy?" subtitle="Selecciona la opción que mejor te describa:" options={[{icon:"🐌", text:"Sedentaria, no hago ejercicio", sub:"La falta de movimiento empeora el lipedema"}, {icon:"🚶‍♀️", text:"Camino regularmente", sub:"Caminar es positivo"}, {icon:"🏋️‍♀️", text:"Hago ejercicio al menos 3 veces", sub:"Mantenerte activa ayuda"}, {icon:"💪", text:"Entreno casi todos los días", sub:"Incluso siendo activa, sin el protocolo..."}]} onNext={handleNext} />;

      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">¿En qué etapa está tu lipedema hoy?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => handleNext()} className="option-card">
                <img src="/estagio-1.webp" className="w-full mb-3" alt="Estagio 1 e 2" />
                <h3 className="font-bold text-gray-800">Estadio 1 | 2</h3>
                <p className="text-xs text-gray-500 mt-1">Actuar a tiempo es clave.</p>
              </div>
              <div onClick={() => handleNext()} className="option-card">
                <img src="/estagio-2.webp" className="w-full mb-3" alt="Estagio 3 e 4" />
                <h3 className="font-bold text-gray-800">Estadio 3 | 4</h3>
                <p className="text-xs text-gray-500 mt-1">Lipedema avanzado.</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-700 text-white px-4 py-3 font-bold text-sm flex justify-between items-center"><span>SALUD | LIPEDEMA</span><span>🔍</span></div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-bold text-gray-900 leading-snug">Especialistas en Salud revelan: Nuevo protocolo elimina grasa inflamada en hasta 22 días.</h2>
              <div className="text-xs text-gray-400 border-b pb-2">Por Sofia Ramirez | 2025</div>
              <img src="/noticia.webp" className="w-full rounded-lg" alt="Noticia" />
              <p className="text-sm text-gray-700 leading-relaxed">Un nuevo enfoque que combina <strong>alimentos anti-inflamatorios</strong> está revolucionando el tratamiento. Elimina hasta 4kg sin cirugía.</p>
              <button onClick={() => handleNext()} className="btn-primary mt-2">CONTINUAR CONSULTA</button>
            </div>
          </div>
        );

      case 6: return <QuizStep question="¿Conoces los alimentos y suplementos antilipedema?" options={[{icon:"🥱", text:"No, nunca he escuchado hablar"}, {icon:"😛", text:"Sí, pero no sé cuáles son"}, {icon:"🤔", text:"Conozco un poco, pero no lo aplico"}, {icon:"🥗", text:"Sí, conozco y ya he probado"}]} onNext={handleNext} />;

      case 7:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-black text-purple-800 uppercase">¿LO SABÍAS?</h2>
            <div className="bg-gray-50 p-4 rounded-xl text-left text-gray-700 space-y-3"><p>Sin una <strong>alimentación adecuada</strong>, las células de grasa siguen empeorando.</p><p className="font-medium text-red-600">Cirugías y drenajes no curan la causa raíz.</p></div>
            <img src="/prova.webp" className="w-full rounded-xl shadow-md" alt="Prova" />
            <button onClick={() => handleNext()} className="btn-primary">CONTINUAR CONSULTA</button>
          </div>
        );

      // ETAPA 8: VSL 1 (DRA LILIAN) - SMARTPLAYER
      case 8:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold text-gray-900">Antes de continuar, déjame presentarme…</h2>
            {/* VTURB SMARTPLAYER 1 */}
            <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>
              <vturb-smartplayer id="vid-697c366c02e0aee2dde139e2" style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px'}}></vturb-smartplayer>
            </div>
            <button onClick={() => handleNext()} className="btn-primary mt-4 animate-pulse">CONTINUAR CONSULTA</button>
          </div>
        );

      case 9: return <QuizStep question="¿Hace cuánto tiempo convives con el lipedema?" options={[{icon:"⏳", text:"Lo descubrí hace poco"}, {icon:"📅", text:"Entre 1 y 3 años"}, {icon:"⚠", text:"Entre 3 y 5 años"}, {icon:"🫀", text:"Hace más de 5 años"}]} onNext={handleNext} />;
      case 10: return <QuizStep question="¿Frecuencia de incomodidad?" options={[{icon:"😢", text:"Casi todos los días"}, {icon:"🙂", text:"En general, me siento bien"}]} onNext={handleNext} />;
      case 11: return <QuizStep question="¿Frecuencia de dolor?" options={[{icon:"😭", text:"Dolor casi todo el tiempo"}, {icon:"🦵", text:"No siento dolor"}]} onNext={handleNext} />;
      case 12: return <QuizStep question="¿Restricción alimentaria?" options={[{icon:"🍽️", text:"Sí, tengo restricciones"}, {icon:"❌", text:"No tengo"}]} onNext={handleNext} />;
      case 13: return <QuizStep question="¿Dificultad con ropa?" options={[{icon:"👗", text:"Sí, casi nunca encuentro"}, {icon:"🙂", text:"No, compro sin problemas"}]} onNext={handleNext} />;
      case 14: return <QuizStep question="¿Hinchazón?" options={[{icon:"😲", text:"Sí, muy hinchadas"}, {icon:"🙂", text:"No, se sienten bien"}]} onNext={handleNext} />;
      case 15: return <QuizStep question="¿Dolor al toque?" options={[{icon:"😭", text:"Sí, mucho dolor"}, {icon:"🙂", text:"No, no siento dolor"}]} onNext={handleNext} />;

      case 16:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900">¿Notas marcas profundas al quitarte la ropa?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg w-full max-w-sm mx-auto" alt="Marcas" />
            <div className="grid gap-3">
              <button onClick={() => handleNext()} className="option-button">Sí, muy parecidas</button>
              <button onClick={() => handleNext()} className="option-button">A veces</button>
              <button onClick={() => handleNext()} className="option-button">No me sucede</button>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-red-600 font-black text-3xl tracking-widest animate-pulse">⚠️ ATENCIÓN</h2>
            <p className="text-lg text-gray-700">Las próximas preguntas definirán si estás lista para <strong>reducir medidas en 22 días</strong>.</p>
            <img src="/transicao.webp" className="rounded-xl shadow-lg w-full" alt="Transicao" />
            <button onClick={() => handleNext()} className="btn-primary">CONTINUAR CONSULTA</button>
          </div>
        );

      case 18: return <QuizStep question="¿Te gustaría un enfoque natural sin cirugías?" options={[{icon:"😍", text:"¡Sí, me encantaría!"}, {icon:"💊", text:"No, prefiero cirugías"}]} onNext={handleNext} />;
      case 19: return <QuizStep question="¿Quieres perder medidas?" options={[{icon:"😍", text:"Sí, quiero librarme del dolor"}, {icon:"😓", text:"No, prefiero seguir así"}]} onNext={handleNext} />;

      case 20:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-bold text-gray-900">22 días es todo lo que necesitas...</h2>
            <p className="text-gray-600 text-sm">Mira el resultado de <strong>Sofía</strong>:</p>
            <img src="/sofia.webp" className="rounded-xl shadow-lg w-full" alt="Sofia" />
            <button onClick={() => handleNext()} className="btn-success">VER MI RESULTADO</button>
          </div>
        );

      case 21:
        return (
          <div className="space-y-6 pb-10">
            <h2 className="text-center text-2xl font-bold text-gray-900">Resultado de su consulta:</h2>
            <p className="text-center text-sm text-gray-500 font-medium">Nivel de gravedad de su caso:</p>
            <div className="flex justify-center my-4">
              <div className="w-40 h-40 rounded-full border-[12px] border-red-500 flex items-center justify-center bg-white shadow-xl relative">
                <span className="text-5xl font-black text-red-600 tracking-tighter">91%</span>
              </div>
            </div>
            <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center font-bold border border-red-200">Resultado: <span className="text-red-600">Preocupante!</span></div>
            <div className="space-y-6 px-2 pt-4">
              <ResultSlider label="Inflamación" value="82%" />
              <ResultSlider label="Hinchazón" value="62%" />
              <ResultSlider label="Salud" value="47%" />
              <ResultSlider label="Empoderamiento" value="92%" />
            </div>
            <div className="py-4"><img src="/diag-body.webp" className="mx-auto w-3/4 max-w-xs" alt="Corpo" /></div>
            <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-left space-y-3">
              <div className="flex items-center gap-2 font-bold text-green-700 text-lg"><div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>Tiene un perfil adecuado</div>
              <p className="text-sm text-green-800">Estás lista para desinflamar su lipedema a través de una alimentación natural.</p>
            </div>
            <button onClick={() => handleNext()} className="btn-primary">¡QUIERO SABER MÁS! 😍</button>
          </div>
        );

      case 22: return <QuizStep question="¿Has intentado todo?" options={[{icon:"😓", text:"Lo he intentado todo"}, {icon:"🤔", text:"Nunca he probado nada"}]} onNext={handleNext} />;

      // ETAPA 23: SOLUÇÃO (LAYOUT IGUAL PRINT)
      case 23:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">No más Intentos Frustrados: Conozca el Protocolo que Ataca el Lipedema en la Raíz</h2>
            <p className="text-gray-600 text-sm">La unión de alimentación antiinflamatoria y suplementación específica transforma su salud.</p>
            <img src="/alimentos.webp" className="rounded-xl shadow-lg border border-gray-100" alt="Alimentos" />
            <button onClick={() => handleNext()} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 transition touch-manipulation">
              <Leaf className="fill-current" /> ¡QUIERO CONOCER EL PROTOCOLO!
            </button>
          </div>
        );

      case 24: return <QuizStep question="¿Desea reducir la hinchazón en 22 días?" options={[{icon:"☺️", text:"¡Sí, quiero mucho!"}, {icon:"😁", text:"¡Sí, quiero empezar ahora!"}]} onNext={handleNext} />;

      case 25:
        return (
          <div className="text-center space-y-6 bg-white pb-6">
            <h2 className="text-xl font-black text-gray-900 uppercase">Vea lo que sucede cuando el lipedema no se trata a tiempo…</h2>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-left shadow-sm">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle size={16}/> El lipedema solo empeora</h3>
              <p className="text-sm text-red-700">Las piernas están cada vez más hinchadas y doloridas.</p>
            </div>
            <img src="/evolucao.webp" className="rounded-xl w-full" alt="Evolucao" />
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-left shadow-sm mt-4">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle size={16}/> Su movilidad disminuye</h3>
              <p className="text-sm text-red-700">Tornando hasta el caminar un desafío diario.</p>
            </div>
            <img src="/mobilidade.webp" className="rounded-xl w-2/3 mx-auto" alt="Mobilidade" />
            <button onClick={() => handleNext()} className="btn-primary text-sm uppercase">FINALIZAR CONSULTA Y ACCEDER</button>
          </div>
        );

      case 26:
        return (
          <div className="text-center space-y-6 animate-fade-in">
             <div className="bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 text-sm mx-auto border border-green-200">
                <Check size={18} strokeWidth={3} /> Protocolo generado!
             </div>
             <h2 className="text-xl font-bold text-gray-900">Método personalizado listo.</h2>
             <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
               <div className="grid grid-cols-2">
                 <div className="bg-red-500 text-white text-xs font-bold py-1">Antes</div>
                 <div className="bg-green-500 text-white text-xs font-bold py-1">Después de 22 días</div>
               </div>
               <img src="/final-shorts.webp" className="w-full object-cover" alt="Resultado Shorts" />
             </div>
             <button onClick={() => handleNext()} className="btn-success animate-pulse">QUIERO GARANTIZAR MI PROTOCOLO</button>
          </div>
        );

      // ETAPA 27: BENEFÍCIOS (BOX AMARELO IGUAL PRINT)
      case 27:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-center leading-tight text-gray-900">Beneficios al adquirir el Protocolo Lipedema:</h2>
            <ul className="space-y-4">
              <BenefitItem title="Clases en video" desc="Orientación médica paso a paso." />
              <BenefitItem title="Protocolo Alimentario" desc="Menú para 22 días." />
              <BenefitItem title="Lista VIP de compras" desc="Compra con estrategia." />
              <BenefitItem title="Planner semanal" desc="Organiza tu rutina." />
            </ul>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-200 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg">OFERTA</div>
              <h3 className="text-center font-bold text-yellow-900 mb-4 uppercase text-sm">Resumen de lo que vas a recibir</h3>
              <div className="space-y-3 text-sm">
                <PriceRow item="Protocolo Lipedema" price="USD 97" />
                <PriceRow item="Planner semanal" price="USD 37" />
                <PriceRow item="Dieta antiinflamatoria" price="USD 27" />
                <PriceRow item="Lista VIP de compras" price="USD 27" />
                <PriceRow item="Desafío guiado" price="USD 97" />
              </div>
              <div className="mt-6 pt-4 border-t border-yellow-200 text-center space-y-1">
                 <p className="text-red-400 font-bold line-through text-sm">Valor real: USD 285</p>
                 <p className="text-lg font-bold text-gray-700">Hoy solo:</p>
                 <p className="text-5xl font-black text-green-600 tracking-tighter">USD 9,90</p>
                 <p className="text-xs text-gray-500">Menos de un café al día ☕</p>
              </div>
            </div>
            <button onClick={() => handleNext()} className="btn-primary hover:scale-105 transition">QUIERO GARANTIZAR MI PROTOCOLO</button>
          </div>
        );

      // ETAPA 28: VSL 2 (VENDAS) - SMARTPLAYER
      case 28:
         return (
           <div className="text-center space-y-6">
             <div className="bg-red-600 text-white text-xs font-bold py-1 px-4 rounded-full inline-block mb-2">ATENCIÓN: ÚLTIMO PASO</div>
             <h2 className="text-2xl font-black uppercase text-gray-900 leading-none">Vea cómo funciona el protocolo</h2>
             
             {/* VTURB SMARTPLAYER 2 */}
             <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>
                <vturb-smartplayer id="vid-697c36775c7f3683791b5a5a" style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px'}}></vturb-smartplayer>
             </div>

             <button onClick={() => handleNext()} className="btn-success text-xl animate-bounce-slow shadow-xl">
               QUIERO ADELGAZAR AHORA
             </button>
           </div>
         );

      // ETAPA 29: OFERTA FINAL + GARANTIA (IGUAL PRINT)
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

            <a href={CHECKOUT_LINK} className="btn-primary text-xl py-5 hover:-translate-y-1 animate-bounce-slow">
              QUIERO GARANTIZAR MI CUPO
            </a>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-6 shadow-inner">
               <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider text-center">Lo que dicen nuestras alumnas</h3>
               <Testimonial name="Laura Martínez" text="Nunca pensé que algo tan simple funcionaría. Mi dolor bajó." />
               <Testimonial name="Valentina Gómez" text="Aprendí a controlar la inflamación. Me veo y me siento diferente." />
            </div>

            <div className="pt-2">
              <img src="/garantia.webp" alt="Garantia 7 Dias" className="w-48 mx-auto hover:scale-105 transition duration-300" />
              <p className="text-xs text-gray-400 mt-4 max-w-xs mx-auto leading-relaxed">
                Prueba el protocolo por 7 días. Si no estás satisfecha, te devolvemos el 100% de tu dinero.
              </p>
            </div>
            
            <a href={CHECKOUT_LINK} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide hover:bg-green-600 shadow-lg block touch-manipulation">
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
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20 pb-10 px-4 md:px-0">
      <Header />
      <div className="max-w-md mx-auto w-full">
        {renderStep()}
      </div>
    </div>
  );
}

// Subcomponentes CSS e Lógica
const QuizStep = ({ question, subtitle, options, onNext }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{question}</h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
    <div className="grid gap-3">
      {options.map((opt, idx) => (
        <button key={idx} onClick={() => onNext()} className="option-button flex items-center gap-4 text-left group">
          <span className="text-2xl bg-gray-50 p-2 rounded-lg group-hover:bg-white transition">{opt.icon}</span>
          <div>
            <span className="block font-bold text-gray-800 text-lg leading-tight">{opt.text}</span>
            {opt.sub && <span className="text-xs text-gray-400 mt-1 block">{opt.sub}</span>}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const ResultSlider = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1 text-gray-700"><span>{label}</span><span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px]">{value}</span></div>
    <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative mt-1">
      <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-purple-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-md z-10" style={{ left: `calc(${value} - 12px)` }}>TÚ</div>
    </div>
    <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-medium uppercase tracking-wider"><span>Bajo</span><span>Medio</span><span>Alto</span></div>
  </div>
);

const BenefitItem = ({ title, desc }) => (
  <li className="flex gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm items-start">
    <div className="bg-green-100 text-green-600 p-1 rounded-full mt-0.5"><Check size={14} strokeWidth={4} /></div>
    <div><span className="block font-bold text-gray-800 text-sm leading-tight">{title}</span><span className="text-xs text-gray-500 leading-tight mt-1 block">{desc}</span></div>
  </li>
);

const PriceRow = ({ item, price }) => (
  <div className="flex justify-between items-center border-b border-yellow-200 pb-2 border-dashed last:border-0 last:pb-0">
    <span className="text-gray-700 font-medium text-xs pr-2">{item}</span><span className="text-gray-400 font-bold line-through text-xs whitespace-nowrap">{price}</span>
  </div>
);

const Testimonial = ({ name, text }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative">
    <div className="flex text-yellow-400 mb-2 gap-0.5"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
    <p className="text-sm text-gray-600 italic leading-relaxed">"{text}"</p>
    <p className="text-xs font-bold text-gray-900 mt-3 border-t pt-2 border-gray-100 block">{name}</p>
  </div>
);

export default App;