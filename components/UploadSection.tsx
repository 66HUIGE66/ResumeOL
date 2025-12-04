import React, { useRef, useState } from 'react';
import { FileText, Upload, AlertCircle, Loader2 } from 'lucide-react';

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
  onBack: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, isProcessing, onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndUpload = (file: File) => {
    setError(null);
    if (file.type !== 'application/pdf') {
      setError("仅支持 PDF 格式的文件");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("文件大小不能超过 5MB");
      return;
    }
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-slate-500 hover:text-slate-800 font-medium transition-colors"
      >
        ← 返回
      </button>

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">上传您的简历</h2>
          <p className="text-slate-500">我们将使用 AI 自动解析内容并生成网站</p>
        </div>

        <div 
          className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' 
              : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept=".pdf" 
            onChange={handleChange}
          />
          
          <div className="mb-4 p-4 bg-white rounded-full shadow-sm">
            <Upload className={`w-8 h-8 text-indigo-500 ${isProcessing ? 'animate-bounce' : ''}`} />
          </div>
          
          <p className="text-slate-700 font-medium mb-1">
            点击或拖拽 PDF 文件到此处
          </p>
          <p className="text-xs text-slate-400">
            最大支持 5MB
          </p>

          {dragActive && (
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
              <p className="text-indigo-700 font-bold bg-white px-4 py-2 rounded-lg shadow-sm">松开以上传</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-pulse">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {isProcessing && (
          <div className="mt-8 text-center">
             <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium mb-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>正在分析简历内容...</span>
             </div>
             <p className="text-xs text-slate-400">这可能需要几秒钟，请稍候</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;