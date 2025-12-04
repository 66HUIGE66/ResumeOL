import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResumePreview from './components/ResumePreview';
import DeployModal from './components/DeployModal';
import { AppStep, ResumeData } from './types';
import { parseResumeWithGemini } from './services/geminiService';
import { AlertTriangle, Rocket, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:application/pdf;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleUpload = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      const data = await parseResumeWithGemini(base64);
      setResumeData(data);
      setStep(AppStep.PREVIEW_EDIT);
    } catch (err) {
      console.error(err);
      setError("解析简历失败，请确保 API Key 正确且 PDF 可读。");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleRestart = () => {
    setResumeData(null);
    setStep(AppStep.LANDING);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <AlertTriangle className="w-5 h-5" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 font-bold">✕</button>
        </div>
      )}

      {/* Step 1: Landing */}
      {step === AppStep.LANDING && (
        <Hero onStart={() => setStep(AppStep.UPLOADING)} />
      )}

      {/* Step 2: Upload */}
      {step === AppStep.UPLOADING && (
        <UploadSection 
          onUpload={handleUpload} 
          isProcessing={isProcessing} 
          onBack={() => setStep(AppStep.LANDING)}
        />
      )}

      {/* Step 3: Preview (Combined with ResumeDisplay) */}
      {step === AppStep.PREVIEW_EDIT && resumeData && (
        <div className="relative">
          {/* Toolbar */}
          <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-4 flex justify-between items-center">
             <div className="flex items-center gap-4">
               <button 
                 onClick={handleRestart}
                 className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium transition-colors"
               >
                 <ChevronLeft className="w-4 h-4" /> 重新开始
               </button>
               <span className="h-6 w-px bg-slate-300 hidden md:block"></span>
               <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">AI 生成</span>
                 <span>预览模式</span>
               </div>
             </div>
             
             <div className="flex gap-3">
               <button 
                 onClick={() => setShowDeployModal(true)}
                 className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all hover:-translate-y-0.5"
               >
                 <Rocket className="w-4 h-4" /> 一键部署
               </button>
             </div>
          </div>

          <ResumePreview 
            data={resumeData} 
            onUpdate={(newData) => setResumeData(newData)}
          />

          {showDeployModal && (
            <DeployModal 
              siteName={resumeData.fullName} 
              onClose={() => setShowDeployModal(false)} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;