import React, { useState, useEffect } from 'react';
import { quizSteps } from './data/quizData';
import { ChevronLeft, AlertTriangle, CheckCircle2, Star, Lock, ShieldCheck, Menu, Search } from 'lucide-react';

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const currentStep = quizSteps[stepIndex];

  const next = () => {
    window.scrollTo(0, 0);
    if (stepIndex < quizSteps.length - 1) setStepIndex(stepIndex + 1);
  };

  // Lógica de Loading (Passo 22 e 28)
  useEffect(() => {
    if (currentStep.type === 'loading') {
      let val = 0;
      const interval = setInterval(() => {
        val += Math.floor(Math.random() * 15);
        if (val >= 100) {
          setLoadingProgress(100);
          clearInterval(interval);
          setTimeout(next, 800);
        } else {
          setLoadingProgress(val);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [stepIndex]);

  // Componente de Opção de Pergunta
  const Option = ({ opt }) => (
    <button onClick={next} className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-4 hover:border-purple-500 transition-all text-left group">
      <span className="text-3xl">{opt.icon}</span>
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 text-lg leading-tight">{opt.label}</span>
        <span className="text-xs text-gray-500 mt-1">{opt.sub}</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-10">
      {/* Barra de Progresso Superior */}
      <div className="fixed top-0 w-full h-1.5 bg-purple-50 z-50">
        <div 
          className="h-full bg-purple-600 transition-all duration-500" 
          style={{ width: `${((stepIndex + 1) / quizSteps.length) * 100}%` }}
        />
      </div>

      <div className="max-w-md mx-auto px-5 pt-10">
        
        {/* TELA: INTRO (Print 1) */}
        {currentStep.type === 'intro' && (
          <div className="text-center animate-fade-in">
            <img src="/logo.webp" className="h-8 mx-auto mb-8" alt="Logo" />
            <h1 className="text-xl font-black text-purple-700 leading-tight mb-4 uppercase">{currentStep.headline}</h1>
            <p className="text-sm text-gray-600 mb-8">{currentStep.subheadline}</p>
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">
              <img src={currentStep.imgSrc} className="w-full" />
            </div>
            <button onClick={next} className="w-full bg-purple-600 text-white font-black py-5 rounded-2xl text-lg shadow-xl uppercase tracking-wider animate-pulse">
              {currentStep.buttonText}
            </button>
            <div className="mt-6 bg-red-50 p-4 rounded-2xl border border-red-100 text-left">
              <p className="text-xs text-red-800 font-medium leading-relaxed flex gap-2">
                <AlertTriangle size={16} className="shrink-0" /> {currentStep.footerAlert}
              </p>
            </div>
          </div>
        )}

        {/* TELA: PERGUNTA PADRÃO (Prints 2, 3, 6, 9, etc) */}
        {currentStep.type === 'question' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-center mb-2">{currentStep.headline}</h2>
            <p className="text-center text-gray-500 mb-10 text-sm">{currentStep.subheadline}</p>
            {currentStep.options.map((opt, i) => <Option key={i} opt={opt} />)}
          </div>
        )}

        {/* TELA: ESTÁDIOS (Print 4) */}
        {currentStep.type === 'comparison' && (
          <div className="animate-fade-in text-center">
            <h2 className="text-2xl font-black mb-2">{currentStep.headline}</h2>
            <p className="text-sm text-gray-500 mb-8">{currentStep.subheadline}</p>
            <div className="grid grid-cols-2 gap-4">
              {currentStep.options.map(opt => (
                <button key={opt.id} onClick={next} className="bg-white border border-gray-100 p-3 rounded-3xl shadow-sm hover:border-purple-500 transition-all">
                  <img src={opt.img} className="rounded-2xl mb-4" />
                  <span className="font-black text-gray-800 block mb-2">{opt.label}</span>
                  <p className="text-[10px] text-gray-500 leading-tight">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TELA: ADVERTORIAL (Print 5) */}
        {currentStep.type === 'advertorial' && (
          <div className="animate-fade-in border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-red-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 font-black"><Menu size={20}/> {currentStep.category}</div>
              <Search size={20}/>
            </div>
            <div className="p-6">
              <span className="text-red-600 font-bold text-xs tracking-widest">{currentStep.tag}</span>
              <h2 className="text-xl font-black mt-2 leading-tight">{currentStep.headline}</h2>
              <p className="text-[10px] text-gray-400 italic mb-4">Por {currentStep.author}</p>
              {currentStep.content.map((p, i) => <p key={i} className="text-sm text-gray-600 mb-4 leading-relaxed">{p}</p>)}
              <img src={currentStep.imgSrc} className="rounded-xl mb-6" />
              <button onClick={next} className="w-full bg-purple-600 text-white font-black py-4 rounded-xl uppercase shadow-lg">
                {currentStep.buttonText}
              </button>
            </div>
          </div>
        )}

        {/* TELA: LOADING (Print 22 e 28) */}
        {currentStep.type === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-xl font-black mb-2">{currentStep.headline}</h2>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden my-6">
              <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
            </div>
            <p className="text-sm text-gray-500">{currentStep.subheadline}</p>
          </div>
        )}

        {/* TELA: SEQUÊNCIA DE MEDO (Print 27) */}
        {currentStep.type === 'fear_sequence' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-xl font-black text-center">{currentStep.headline}</h2>
            {currentStep.blocks.map((block, i) => (
              <div key={i} className="bg-red-50 rounded-3xl overflow-hidden border border-red-100">
                <div className="p-5">
                  <h3 className="font-black text-red-700 text-sm mb-2 uppercase">{block.title}</h3>
                  <p className="text-xs text-red-900 leading-relaxed mb-4">{block.text}</p>
                </div>
                <img src={block.img} className="w-full h-40 object-cover" />
              </div>
            ))}
            <button onClick={next} className="w-full bg-purple-700 text-white font-black py-5 rounded-2xl shadow-xl uppercase text-xs">
              {currentStep.buttonText}
            </button>
          </div>
        )}

      </div>
      
      {/* Footer padrão inlead */}
      <footer className="text-center text-[10px] text-gray-300 mt-20">
        © 2026 - Criado via inlead.digital | Central de anúncios
      </footer>
    </div>
  );
}

export default App;