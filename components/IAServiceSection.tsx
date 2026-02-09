
import React, { useState, useRef, useEffect } from 'react';

// Declaraciones para librerías globales cargadas via CDN en index.html
declare const pdfjsLib: any;
declare const mammoth: any;

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  isSummary?: boolean;
}

/**
 * IAServiceSection: Componente que gestiona el análisis documental local.
 * Implementa procesamiento de archivos (PDF, Word) y un algoritmo de resumen heurístico.
 */
export const IAServiceSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Bienvenido al Asistente Lógico de EduDigital!\n\n**Guía de uso:**\n1. Sube un archivo (PDF, Word o TXT).\n2. Escribe "Resumen".\n3. Analizaré el texto localmente.\n\n¿En qué puedo ayudarte?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentTextData, setCurrentTextData] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  /**
   * Mantiene el scroll del chat siempre al final cuando hay nuevos mensajes.
   */
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Algoritmo Heurístico de Resumen (Extracción de Sentencias Clave).
   * 
   * @description Este algoritmo no utiliza IA generativa externa para el resumen,
   * garantizando la privacidad del documento. Utiliza una técnica de puntuación 
   * de frases basada en la frecuencia de palabras significativas.
   * 
   * @param {string} text - El texto completo a resumir.
   * @returns {string[]} Lista de las frases más representativas.
   */
  const getHeuristicSummary = (text: string): string[] => {
    if (!text.trim()) return [];
    
    // 1. Limpieza y segmentación en oraciones
    const cleanText = text.replace(/\s+/g, ' ');
    const sentences = cleanText.match(/[^\.!\?]+[\.!\?]+/g) || [cleanText];
    if (sentences.length <= 4) return [cleanText];

    // 2. Definición de StopWords (palabras comunes que ignoramos)
    const stopWords = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'y', 'o', 'pero', 'si', 'no', 'del', 'al', 'en', 'por', 'con', 'que', 'como', 'para', 'este', 'esta', 'son', 'han', 'una', 'para', 'está']);
    
    // 3. Conteo de frecuencia de palabras significativas (longitud > 4)
    const wordCounts: Record<string, number> = {};
    const words = cleanText.toLowerCase().match(/\b(\w+)\b/g) || [];
    
    words.forEach(word => {
      if (word.length > 4 && !stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // 4. Puntuación de cada oración basada en sus palabras
    const scores = sentences.map(sentence => {
      let score = 0;
      const sentenceWords = sentence.toLowerCase().match(/\b(\w+)\b/g) || [];
      sentenceWords.forEach(word => {
        if (wordCounts[word]) score += wordCounts[word];
      });
      // Normalización por longitud de frase para evitar sesgo a frases excesivamente largas
      return { sentence, score: score / (sentenceWords.length || 1) };
    });

    // 5. Retornar las 5 oraciones con mayor puntaje
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.sentence.trim());
  };

  /**
   * Maneja el envío de mensajes en el chat.
   * @param {string} textOverride - Texto opcional para forzar una consulta específica.
   */
  const handleSendMessage = (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    const userMsg = textToSend.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date() }]);
    setInputText('');
    
    setIsProcessing(true);
    
    // Simulación de "latencia de pensamiento" para feedback de UX
    setTimeout(() => {
      let response = '';
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('hola')) {
        response = '¡Hola! Estoy listo para procesar tus documentos.';
      } else if (lowerMsg.includes('resumen') || lowerMsg.includes('resume')) {
        if (currentTextData) {
          const summaryPoints = getHeuristicSummary(currentTextData);
          response = `**Resumen Lógico de: ${fileName}**\n\n` + summaryPoints.map(p => `• ${p}`).join('\n\n');
        } else {
          response = 'Por favor, sube un archivo antes de solicitar un resumen.';
        }
      } else if (lowerMsg.includes('limpiar')) {
        setMessages([{ role: 'assistant', content: 'Memoria reiniciada.', timestamp: new Date() }]);
        setCurrentTextData('');
        setFileName('');
        setIsProcessing(false);
        return;
      } else {
        response = 'Si deseas que analice un documento, súbelo y pídeme un "resumen".';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
      setIsProcessing(false);
    }, 800);
  };

  /**
   * Gestiona la carga de archivos y extracción de texto según la extensión.
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    
    try {
      const extension = file.name.split('.').pop()?.toLowerCase();
      let text = '';

      if (extension === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          text += textContent.items.map((item: any) => item.str).join(' ') + '\n';
        }
      } else if (extension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        text = await file.text();
      }

      setCurrentTextData(text);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `✅ Documento cargado: **${file.name}**. Ya puedes solicitar el **Resumen Lógico**.`, 
        timestamp: new Date() 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error al leer el archivo.', timestamp: new Date() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="pt-40 pb-40 px-6 md:px-12 bg-slate-50 flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 reveal active">
          <div className="inline-block py-1 px-4 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Análisis Documental • Local Only
          </div>
          <h2 className="text-4xl md:text-6xl font-brand text-slate-900 mb-4 tracking-tighter leading-none">
            Asistente <span className="text-purple-600 italic">Inteligente</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panel Izquierdo: Herramientas de Carga */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl reveal active">
              <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Panel de Carga
              </h3>
              
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-slate-50 transition-all group mb-6 overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center px-4">
                  <svg className="w-10 h-10 mb-3 text-slate-300 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest truncate max-w-[180px]">{fileName || 'Subir PDF o Word'}</p>
                </div>
                <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
              </label>

              <div className="space-y-3">
                <button 
                  onClick={() => handleSendMessage('Resume el documento')} 
                  className="w-full py-4 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 disabled:opacity-50"
                  disabled={isProcessing || !currentTextData}
                >
                  Ejecutar Resumen
                </button>
                <button 
                  onClick={() => handleSendMessage('Limpiar chat')} 
                  className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-all border border-slate-100"
                >
                  Limpiar Memoria
                </button>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Interface de Conversación */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 reveal active min-h-[600px]">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">Consola Lógica de Análisis</h4>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">EduDigital v3.1</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-50/20 max-h-[500px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[90%] p-6 rounded-[2.5rem] text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none shadow-xl' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-md'
                  }`}>
                    <div className="whitespace-pre-line font-medium prose prose-purple max-w-none text-balance">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-full flex gap-2 shadow-sm">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-white border-t border-slate-100 mt-auto shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-4">
                <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-slate-800 outline-none focus:border-purple-300 transition-all font-medium"
                  placeholder="Haz una pregunta o pide un resumen..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="bg-slate-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 disabled:opacity-50" disabled={isProcessing}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
