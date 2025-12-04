import React from 'react';
import { UploadCloud, Zap, ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 flex flex-col overflow-hidden relative">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
            智
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">智绘简历</span>
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
          GitHub
        </a>
      </nav>

      <main className="flex-grow flex flex-col justify-center px-6 max-w-7xl mx-auto w-full z-10 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-indigo-100 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-indigo-900 tracking-wide uppercase">AI 驱动 · 智能解析 · 一键部署</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              让简历 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">会说话，更出彩</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              上传 PDF 简历，Gemini AI 自动解析并生成精美的在线个人主页。无需编码，支持一键模拟部署，让机会主动找上门。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={onStart}
                className="group bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                开始制作 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-lg px-8 py-4 rounded-xl font-medium transition-all hover:border-slate-300 flex items-center justify-center gap-2">
                查看演示
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-medium text-slate-500">
               <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-indigo-500" />
                 <span>智能 PDF 解析</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-indigo-500" />
                 <span>自适应响应式设计</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-indigo-500" />
                 <span>SEO 友好架构</span>
               </div>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative order-1 lg:order-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                   <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                   <div className="space-y-2">
                      <div className="w-32 h-4 bg-slate-200 rounded"></div>
                      <div className="w-24 h-3 bg-slate-100 rounded"></div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="w-full h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                   <div className="w-full h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                   <div className="w-full h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-50 animate-bounce" style={{animationDuration: '3s'}}>
                   <UploadCloud className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-indigo-600 p-4 rounded-xl shadow-xl shadow-indigo-200">
                   <Zap className="w-8 h-8 text-white" />
                </div>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-3xl transform -rotate-6 -z-10 scale-105 opacity-60"></div>
          </div>

        </div>
      </main>
    </div>
  );
}