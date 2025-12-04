import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Copy, Download, X } from 'lucide-react';

interface DeployModalProps {
  onClose: () => void;
  siteName: string;
}

const DeployModal: React.FC<DeployModalProps> = ({ onClose, siteName }) => {
  const [status, setStatus] = useState<'building' | 'deploying' | 'completed'>('building');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate build process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('completed');
          return 100;
        }
        if (prev > 40 && status === 'building') setStatus('deploying');
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [status]);

  const mockUrl = `https://${siteName.toLowerCase().replace(/\s+/g, '-')}.vercel.app`;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">发布网站</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          {status !== 'completed' ? (
            <div className="text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                    className="text-indigo-600 transition-all duration-300 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {progress}%
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                  {status === 'building' ? '正在构建资源...' : '正在部署到边缘网络...'}
                </h4>
                <p className="text-slate-500 text-sm">优化图片与生成静态页面中</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">部署成功！</h4>
                <p className="text-slate-500 text-sm">您的个人简历网站现已上线。</p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-3 flex items-center justify-between border border-slate-200">
                <span className="text-sm text-slate-600 truncate mr-2">{mockUrl}</span>
                <button 
                  className="text-indigo-600 hover:text-indigo-700 p-1 rounded hover:bg-indigo-50"
                  onClick={() => alert('链接已复制！')}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                 <a 
                   href="#" 
                   className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                   onClick={(e) => {e.preventDefault(); alert("下载源代码包功能仅供演示。");}}
                 >
                   <Download className="w-4 h-4" /> 下载源码
                 </a>
                 <a 
                   href="#" 
                   className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                   onClick={(e) => {e.preventDefault(); window.open('', '_blank'); alert("跳转到演示链接");}}
                 >
                   访问网站
                 </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeployModal;