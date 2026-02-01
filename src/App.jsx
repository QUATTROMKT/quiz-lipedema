import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, AlertTriangle, Lock, Star, Leaf } from 'lucide-react';

// ID do Pixel e Links
const CHECKOUT_LINK = "https://pay.hotmart.com/W104185322U?off=4g4k4k4k"; // Seu link Hotmart aqui

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 29;
  
  // Calcula progresso: Começa em 0 na capa, vai até 100 no final
  const progress = Math.min(100, Math.max(5, ((currentStep - 1) / (totalSteps - 1)) * 100));

  const nextStep = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Componente de Cabeçalho (Barra de Progresso)
  const Header = () => (
    <div className="w-full fixed top-0 left-0 bg-white z-50 shadow-sm">
      <div className="h-2 bg-gray-100 w-full">
        <div 
          className="h-full bg-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-center p-3 relative">
        {currentStep > 1 && currentStep < 29 && (
          <button onClick={prevStep} className="absolute left-4 text-gray-400 hover:text-gray-600">
            <ChevronLeft size={28} />
          </button>
        )}
        <img src="/logo.webp" alt="Logo" className="h-8 md:h-10 object-contain" />
      </div>
    </div>
  );

  // Renderização das Etapas
  const renderStep = () => {
    switch(currentStep) {
      // ---------------- ETAPA 1: CAPA ----------------
      case 1:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              ELIMINA LA GRASA INFLAMADA DEL LIPEDEMA Y REDUCE LA HINCHAZÓN DE LAS PIERNAS EN HASTA 22 DÍAS
            </h1>
            <p className="text-gray-600">
              Responde este test rápido de 2 minutos para recibir tu protocolo personalizado.
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-sm">
              <img src="/capa.webp" alt="Antes e Depois" className="w-full" />
            </div>
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-xl shadow-lg hover:bg-purple-700 transition animate-bounce-slow">
              INICIAR CONSULTA
            </button>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3 text-left text-sm text-red-800">
              <AlertTriangle className="shrink-0 text-red-500" size={20} />
              <p><strong>Atenção:</strong> Solo una consulta está disponible. Si sales de esta página, perderás esta oportunidad.</p>
            </div>
          </div>
        );

      // ---------------- ETAPA 2: ÁGUA ----------------
      case 2:
        return (
          <QuizStep 
            question="¿Cuántos vasos de agua sueles beber al día?"
            subtitle="Elige la opción que mejor te represente."
            options={[
              { icon: "🌵", text: "Menos de 2 vasos al día", sub: "(Casi no bebo agua)" },
              { icon: "💧", text: "Entre 2 y 4 vasos al día", sub: "(Bebo poco)" },
              { icon: "💦", text: "Entre 5 y 7 vasos al día", sub: "(Intento beber más)" },
              { icon: "🚰", text: "Entre 8 y 10 vasos al día", sub: "(Bebo bastante)" },
              { icon: "🌊", text: "Más de 10 vasos al día", sub: "(Bebo agua todo el día)" },
            ]}
            onNext={nextStep}
          />
        );

      // ---------------- ETAPA 3: ATIVIDADE ----------------
      case 3:
        return (
          <QuizStep 
            question="¿Cómo es tu rutina de actividad física hoy?"
            subtitle="Selecciona la opción que mejor te describa:"
            options={[
              { icon: "🐌", text: "Sedentaria", sub: "No hago ejercicio" },
              { icon: "🚶‍♀️", text: "Camino regularmente", sub: "Caminar es positivo" },
              { icon: "🏋️‍♀️", text: "Ejercicio 3x semana", sub: "Mantenerte activa ayuda" },
              { icon: "💪", text: "Entreno casi todos los días", sub: "Rutina intensa" },
            ]}
            onNext={nextStep}
          />
        );

      // ---------------- ETAPA 4: ESTÁGIOS (Visual) ----------------
      case 4:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">¿En qué etapa está tu lipedema hoy?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={nextStep} className="cursor-pointer border-2 border-gray-200 rounded-xl p-3 hover:border-purple-500 transition">
                <img src="/estagio-1.webp" className="w-full mb-3" />
                <h3 className="font-bold">Estadio 1 | 2</h3>
                <p className="text-xs text-gray-500">Actuar a tiempo es clave.</p>
              </div>
              <div onClick={nextStep} className="cursor-pointer border-2 border-gray-200 rounded-xl p-3 hover:border-purple-500 transition">
                <img src="/estagio-2.webp" className="w-full mb-3" />
                <h3 className="font-bold">Estadio 3 | 4</h3>
                <p className="text-xs text-gray-500">El lipedema ya está avanzado.</p>
              </div>
            </div>
          </div>
        );

      // ---------------- ETAPA 5: ADVERTORIAL (Fake News) ----------------
      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-red-700 text-white px-4 py-2 font-bold text-sm flex justify-between">
              <span>SALUD | LIPEDEMA</span>
              <span>🔍</span>
            </div>
            <div className="p-5 space-y-4 text-left">
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                Especialistas en Salud revelan: Un nuevo protocolo puede eliminar la grasa inflamada en hasta 22 días.
              </h2>
              <p className="text-xs text-gray-400">Por Sofia Ramirez | 23 de mar de 2025</p>
              <img src="/noticia.webp" className="w-full rounded-lg" />
              <p className="text-sm text-gray-700">
                Un nuevo enfoque que combina <strong>alimentos anti-inflamatórios</strong> está revolucionando el tratamiento. Elimina hasta 4kg sin cirugía ni drenajes.
              </p>
              <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg mt-2">
                CONTINUAR CONSULTA
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 6: CONHECIMENTO ----------------
      case 6:
        return (
          <QuizStep 
            question="¿Conoces los alimentos y suplementos que reducen la hinchazón?"
            options={[
              { icon: "🥱", text: "No, nunca escuché hablar" },
              { icon: "😛", text: "He oído, pero no sé cuáles son" },
              { icon: "🤔", text: "Sé un poco, pero no aplico" },
              { icon: "🥗", text: "Sí, ya he probado cambios" },
            ]}
            onNext={nextStep}
          />
        );

      // ---------------- ETAPA 7: EDUCACIONAL (Você Sabia) ----------------
      case 7:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-black text-purple-700 uppercase">¿LO SABÍAS?</h2>
            <p className="text-gray-700">
              Sin una <strong>alimentación adecuada</strong>, las células de grasa siguen empeorando. <br/><br/>
              <span className="text-red-600 font-bold">Cirugías y drenajes NO curan la causa raíz.</span>
            </p>
            <img src="/prova.webp" className="w-full rounded-xl shadow-md" />
            <p className="text-sm text-gray-500">Resultado real del Protocolo.</p>
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPA 8: VÍDEO DRA LILIAN ----------------
      case 8:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold">Antes de continuar, déjame presentarme…</h2>
            <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
              {/* VÍDEO APRESENTAÇÃO */}
              <iframe 
                id="vturb"
                src="https://scripts.converteai.net/26338784-0652-47e2-a39c-b26a623722a5/players/679bd5804599a073ab253f58/embed.html" 
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            {/* O botão pode aparecer depois de um tempo se quiser, aqui deixei direto */}
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg mt-4 animate-pulse">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPAS 9-16: COLETA DE SINTOMAS ----------------
      case 9:
        return <QuizStep question="¿Hace cuánto tiempo convives con el lipedema?" options={[{icon:"⏳", text:"Lo descubrí hace poco"}, {icon:"📅", text:"Entre 1 y 3 años"}, {icon:"⚠", text:"Entre 3 y 5 años"}, {icon:"🫀", text:"Hace más de 5 años"}]} onNext={nextStep} />;
      
      case 10:
        return <QuizStep question="¿Con qué frecuencia te sientes incómoda con tus piernas?" options={[{icon:"😢", text:"Casi todos los días"}, {icon:"🙁", text:"Frecuentemente"}, {icon:"😐", text:"A veces"}, {icon:"🙂", text:"En general me siento bien"}]} onNext={nextStep} />;
      
      case 11:
        return <QuizStep question="¿Con qué frecuencia sientes dolor en las piernas?" options={[{icon:"😭", text:"Dolor casi todo el tiempo"}, {icon:"😫", text:"Dolor al final del día"}, {icon:"🤕", text:"Solo cuando me toco"}, {icon:"🦵", text:"No siento dolor"}]} onNext={nextStep} />;

      case 12:
        return <QuizStep question="¿Tienes alguna restricción alimentaria?" options={[{icon:"🍽️", text:"Sí, evito algunos alimentos"}, {icon:"🥗", text:"Soy vegetariana/vegana"}, {icon:"🤢", text:"Tengo intolerancias"}, {icon:"🤔", text:"No estoy segura"}]} onNext={nextStep} />;

      case 13:
        return <QuizStep question="¿Tienes dificultad para encontrar ropa?" options={[{icon:"👗", text:"Sí, casi nunca encuentro"}, {icon:"👖", text:"Cuesta encontrar pantalones"}, {icon:"💔", text:"Me frustra ir de compras"}, {icon:"🙂", text:"Compro sin problemas"}]} onNext={nextStep} />;

      case 14:
        return <QuizStep question="¿Sientes hinchazón en piernas, brazos o caderas?" options={[{icon:"😲", text:"Sí, muy hinchadas"}, {icon:"😣", text:"Sí, hinchazón y dolor"}, {icon:"🦵", text:"Solo en los tobillos"}, {icon:"🙂", text:"No siento hinchazón"}]} onNext={nextStep} />;

      case 15:
        return <QuizStep question="¿Sientes dolor al tocar tus piernas?" options={[{icon:"😭", text:"Sí, mucho dolor"}, {icon:"😣", text:"Un poco de molestia"}, {icon:"😕", text:"Solo si presiono fuerte"}, {icon:"🙂", text:"No siento dolor"}]} onNext={nextStep} />;

      case 16: // Marcas na pele com foto
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">¿Notas marcas profundas al quitarte la ropa?</h2>
            <img src="/marcas.webp" className="rounded-xl shadow-lg mx-auto w-full max-w-sm" />
            <div className="grid gap-3">
              <button onClick={nextStep} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition">
                Sí, quedan muy parecidas a la imagen
              </button>
              <button onClick={nextStep} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition">
                A veces noto algunas marcas
              </button>
              <button onClick={nextStep} className="bg-white border-2 border-gray-100 p-4 rounded-xl font-semibold hover:border-purple-500 hover:bg-purple-50 text-left transition">
                No, esto no me sucede
              </button>
            </div>
          </div>
        );

      // ---------------- ETAPA 17: TRANSIÇÃO/ATENÇÃO ----------------
      case 17:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-red-600 font-black text-3xl tracking-widest animate-pulse">⚠️ ATENCIÓN</h2>
            <p className="text-lg text-gray-700">
              Las próximas preguntas son vitales para evaluar si estás lista para <strong>reducir medidas en 22 días</strong>.
            </p>
            <div className="relative">
              <img src="/transicao.webp" className="rounded-xl shadow-lg w-full" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30 bg-purple-900 rounded-xl"></div>
            </div>
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-xl">
              CONTINUAR CONSULTA
            </button>
          </div>
        );

      // ---------------- ETAPAS 18-19: COMPROMISSO ----------------
      case 18:
        return <QuizStep question="¿Te gustaría un enfoque natural sin cirugías?" options={[{icon:"😍", text:"¡Sí, me encantaría!"}, {icon:"💊", text:"No, prefiero cirugías y remedios"}]} onNext={nextStep} />;

      case 19:
        return <QuizStep question="¿Quieres controlar el lipedema y perder medidas?" options={[{icon:"😍", text:"Sí, quiero librarme del dolor"}, {icon:"😓", text:"No, prefiero seguir así"}]} onNext={nextStep} />;

      // ---------------- ETAPA 20: PROVA SOCIAL SOFIA ----------------
      case 20:
        return (
          <div className="text-center space-y-5">
            <h2 className="text-xl font-bold text-gray-900">22 días es todo lo que necesitas...</h2>
            <p className="text-gray-600 text-sm">Mira el resultado de <strong>Sofia</strong>:</p>
            <img src="/sofia.webp" className="rounded-xl shadow-lg w-full" />
            <button onClick={nextStep} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:bg-green-600 animate-bounce-slow">
              VER MI RESULTADO
            </button>
          </div>
        );

      // ---------------- ETAPA 21: RESULTADO (GRÁFICOS) ----------------
      case 21:
        return (
          <div className="space-y-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h2 className="text-center text-2xl font-bold text-gray-800">Resultado de su consulta:</h2>
            
            {/* Gravidade */}
            <div className="flex justify-center my-4">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-red-500 bg-white shadow-xl">
                <div className="text-center">
                  <span className="block text-3xl font-black text-red-600">91%</span>
                  <span className="text-xs text-gray-500 font-bold uppercase">Gravidade</span>
                </div>
              </div>
            </div>

            <div className="bg-red-100 text-red-800 p-3 rounded-lg text-center font-bold text-sm">
              🚨 Resultado: Preocupante, necesita actuar rápidamente!
            </div>

            {/* Barras */}
            <div className="space-y-4 pt-2">
              <ProgressBar label="Nivel de inflamación" percent="82%" color="bg-red-500" />
              <ProgressBar label="Nivel de hinchazón" percent="62%" color="bg-orange-400" />
              <ProgressBar label="Salud General" percent="47%" color="bg-yellow-400" />
              <ProgressBar label="Potencial de Mejora" percent="92%" color="bg-green-500" />
            </div>

            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4">
              ¡QUIERO SABER MÁS! 😍
            </button>
          </div>
        );

      // ---------------- ETAPA 22: TENTATIVAS ----------------
      case 22:
        return <QuizStep question="¿Has intentado todo pero nada funciona?" options={[{icon:"😓", text:"Lo he intentado todo sin éxito"}, {icon:"🤔", text:"Nunca probé un enfoque específico"}]} onNext={nextStep} />;

      // ---------------- ETAPA 23: SOLUÇÃO ----------------
      case 23:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900">No más Intentos Frustrados</h2>
            <p className="text-gray-600 text-sm">Conozca el protocolo que ataca la raíz con alimentação específica.</p>
            <img src="/alimentos.webp" className="rounded-xl shadow-md" />
            <button onClick={nextStep} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
              <Leaf /> ¡QUIERO CONOCER EL PROTOCOLO!
            </button>
          </div>
        );

      // ---------------- ETAPA 24: CONFIRMAÇÃO ----------------
      case 24:
        return <QuizStep question="¿Desea reducir la hinchazón en 22 días?" options={[{icon:"☺️", text:"¡Sí, quiero mucho!"}, {icon:"😁", text:"¡Sí, quiero empezar ahora!"}]} onNext={nextStep} />;

      // ---------------- ETAPA 25: MEDO (EVOLUÇÃO) ----------------
      case 25:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-red-600">Vea lo que sucede si no tratas el lipedema...</h2>
            <img src="/evolucao.webp" className="rounded-xl shadow-sm border border-gray-200" />
            <div className="bg-red-50 p-4 rounded-lg text-left text-sm text-red-800 space-y-2">
              <p>❌ <strong>Empeora con el tiempo:</strong> Piernas más desproporcionadas.</p>
              <p>❌ <strong>Movilidad reducida:</strong> Dolor insoportable.</p>
            </div>
            <img src="/mobilidade.webp" className="rounded-xl shadow-sm w-2/3 mx-auto" />
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-sm uppercase">
              Finalizar Consulta y Acceder al Protocolo
            </button>
          </div>
        );

      // ---------------- ETAPA 26: GERAÇÃO DO PROTOCOLO ----------------
      case 26:
        return (
          <div className="text-center space-y-5 animate-fade-in">
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold flex items-center gap-2">
                <Check size={20} /> Protocolo Generado!
              </div>
            </div>
            <h2 className="text-2xl font-bold">Su plan personalizado está listo.</h2>
            
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase tracking-wider">Proyección en 22 días</h3>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="text-red-500 font-bold text-sm">
                  <p>Antes</p>
                  <div className="h-20 bg-gray-200 rounded-lg mt-2 flex items-center justify-center text-xs text-gray-400">Hoy</div>
                </div>
                <div className="text-green-500 font-bold text-sm">
                  <p>Después</p>
                  <img src="/final-shorts.webp" className="h-20 w-full object-cover rounded-lg mt-2 shadow-sm" />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-left text-sm">
                <div className="flex justify-between border-b pb-1"><span>Hinchazón</span> <span className="text-green-600 font-bold">📉 -90%</span></div>
                <div className="flex justify-between border-b pb-1"><span>Dolores</span> <span className="text-green-600 font-bold">✨ Desapareciendo</span></div>
                <div className="flex justify-between border-b pb-1"><span>Autoestima</span> <span className="text-green-600 font-bold">🚀 Elevada</span></div>
              </div>
            </div>

            <button onClick={nextStep} className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition transform">
              VER MI PLAN
            </button>
          </div>
        );

      // ---------------- ETAPA 27: BENEFÍCIOS ----------------
      case 27:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Beneficios que vas a tener:</h2>
            <ul className="space-y-3">
              {[
                "Clases en video con Dra. Lilian",
                "Protocolo Alimentario Antiinflamatorio",
                "Lista VIP de compras saludables",
                "Planner semanal personalizado"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <div className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={16} /></div>
                  <span className="font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl space-y-2 text-sm">
              <div className="flex justify-between text-gray-400 line-through"><span>Protocolo</span> <span>$97</span></div>
              <div className="flex justify-between text-gray-400 line-through"><span>Planner</span> <span>$37</span></div>
              <div className="flex justify-between text-gray-400 line-through"><span>Dieta</span> <span>$27</span></div>
              <div className="border-t border-yellow-200 pt-2 flex justify-between font-bold text-gray-900 text-lg">
                <span>Total Real:</span> <span>$188</span>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl">
              VER OFERTA ESPECIAL
            </button>
          </div>
        );

      // ---------------- ETAPA 28 & 29: OFERTA FINAL ----------------
      case 28:
      case 29:
        return (
          <div className="text-center space-y-6 pb-10">
            <div className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full inline-block animate-pulse">
              OFERTA POR TIEMPO LIMITADO
            </div>
            <h1 className="text-4xl font-black text-gray-900">
              <span className="text-gray-400 text-xl font-normal line-through block">de $285</span>
              USD 9,90
            </h1>
            <p className="text-gray-500 text-sm">Menos que un café al día ☕</p>

            <a 
              href={CHECKOUT_LINK}
              className="block w-full bg-green-500 text-white font-black py-5 rounded-xl text-xl shadow-xl hover:bg-green-600 transition transform hover:-translate-y-1 animate-bounce-slow"
            >
              QUIERO ADELGAZAR AHORA
            </a>

            {/* Garantia */}
            <div className="flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="bg-yellow-400 text-yellow-900 font-black rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-sm">7</div>
              <div className="text-left">
                <p className="font-bold text-gray-900">GARANTÍA TOTAL</p>
                <p className="text-xs text-gray-500">7 días o te devolvemos tu dinero.</p>
              </div>
            </div>

            {/* Depoimentos Rápidos */}
            <div className="space-y-4 pt-4">
              <Testimonial name="Laura M." text="Mi dolor bajó, mis piernas se sienten más livianas..." />
              <Testimonial name="Valentina G." text="Me veo y me siento diferente. ¡Gracias!" />
            </div>

            <p className="text-xs text-gray-300 mt-10">© 2026 Protocolo Lipedema</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20 pb-10 px-4">
      <Header />
      <div className="max-w-md mx-auto">
        {renderStep()}
      </div>
    </div>
  );
}

// Subcomponentes para limpar o código principal
const QuizStep = ({ question, subtitle, options, onNext }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center space-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{question}</h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
    <div className="grid gap-3">
      {options.map((opt, idx) => (
        <button 
          key={idx} 
          onClick={onNext}
          className="bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center gap-4 hover:border-purple-500 hover:bg-purple-50 transition group text-left shadow-sm"
        >
          <span className="text-3xl bg-gray-50 p-2 rounded-lg group-hover:bg-white">{opt.icon}</span>
          <div>
            <span className="block font-bold text-gray-800">{opt.text}</span>
            {opt.sub && <span className="text-xs text-gray-400">{opt.sub}</span>}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const ProgressBar = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1">
      <span>{label}</span>
      <span>{percent}</span>
    </div>
    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: percent }}></div>
    </div>
  </div>
);

const Testimonial = ({ name, text }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-50 text-left">
    <div className="flex text-yellow-400 mb-2"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
    <p className="text-sm text-gray-600 mb-2">"{text}"</p>
    <p className="text-xs font-bold text-gray-900">- {name}</p>
  </div>
);

export default App;