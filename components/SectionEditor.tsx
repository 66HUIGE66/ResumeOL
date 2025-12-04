import React, { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { WorkExperience, Education, Project } from '../types';

interface SectionEditorProps {
  section: string;
  initialData: any;
  onSave: (newData: any) => void;
  onClose: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, initialData, onSave, onClose }) => {
  const [data, setData] = useState(initialData);

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  const renderBasicInfoEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">职位头衔</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">地点</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
      
      <div className="border-t border-slate-100 pt-4 mt-4">
         <h4 className="text-sm font-bold text-slate-900 mb-3">社交链接</h4>
         <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">GitHub</label>
              <input
                type="text"
                value={data.socialLinks?.github || ''}
                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, github: e.target.value } })}
                className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">LinkedIn</label>
              <input
                type="text"
                value={data.socialLinks?.linkedin || ''}
                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })}
                className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">个人网站 / Portfolio</label>
              <input
                type="text"
                value={data.socialLinks?.portfolio || ''}
                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, portfolio: e.target.value } })}
                className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                placeholder="https://..."
              />
            </div>
         </div>
      </div>
    </div>
  );

  const renderSummaryEditor = () => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">个人简介</label>
      <textarea
        value={data || ''}
        onChange={(e) => setData(e.target.value)}
        rows={6}
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
      />
      <p className="text-xs text-slate-500 mt-2">建议保持在 2-3 句话以内，突出核心竞争力。</p>
    </div>
  );

  const renderSkillsEditor = () => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">技能列表 (使用逗号分隔)</label>
      <textarea
        value={Array.isArray(data) ? data.join(', ') : ''}
        onChange={(e) => setData(e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
        rows={4}
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {Array.isArray(data) && data.map((skill: string, idx: number) => (
          <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs border border-slate-200">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const renderExperienceEditor = () => {
    const experiences = data as WorkExperience[];
    return (
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
            <button 
              onClick={() => {
                const newExp = [...experiences];
                newExp.splice(index, 1);
                setData(newExp);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">公司/组织</label>
                <input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...experiences];
                    newExp[index].company = e.target.value;
                    setData(newExp);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
               <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">职位</label>
                <input
                  value={exp.role}
                  onChange={(e) => {
                    const newExp = [...experiences];
                    newExp[index].role = e.target.value;
                    setData(newExp);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">时间段</label>
                <input
                  value={exp.period}
                  onChange={(e) => {
                    const newExp = [...experiences];
                    newExp[index].period = e.target.value;
                    setData(newExp);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
               <label className="block text-xs font-medium text-slate-500 mb-1">工作内容 (每行一点)</label>
               <textarea
                  value={Array.isArray(exp.description) ? exp.description.join('\n') : exp.description}
                  onChange={(e) => {
                    const newExp = [...experiences];
                    newExp[index].description = e.target.value.split('\n');
                    setData(newExp);
                  }}
                  rows={4}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
               />
            </div>
          </div>
        ))}
        <button
          onClick={() => setData([...experiences, { company: '新公司', role: '职位', period: '2024 - Present', description: ['工作职责...'] }])}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> 添加经历
        </button>
      </div>
    );
  };

  const renderEducationEditor = () => {
    const education = data as Education[];
    return (
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
             <button 
              onClick={() => {
                const newEdu = [...education];
                newEdu.splice(index, 1);
                setData(newEdu);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 gap-3">
               <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">学校</label>
                <input
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[index].school = e.target.value;
                    setData(newEdu);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">学位/专业</label>
                <input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[index].degree = e.target.value;
                    setData(newEdu);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
               <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">年份</label>
                <input
                  value={edu.year}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[index].year = e.target.value;
                    setData(newEdu);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        ))}
         <button
          onClick={() => setData([...education, { school: '学校名称', degree: '学士学位', year: '2020 - 2024' }])}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> 添加教育背景
        </button>
      </div>
    );
  };

  const renderProjectsEditor = () => {
    const projects = data as Project[];
    return (
      <div className="space-y-6">
        {projects.map((proj, index) => (
           <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
             <button 
              onClick={() => {
                const newProj = [...projects];
                newProj.splice(index, 1);
                setData(newProj);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="space-y-3">
               <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">项目名称</label>
                <input
                  value={proj.name}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[index].name = e.target.value;
                    setData(newProj);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">担任角色</label>
                  <input
                    value={proj.role || ''}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[index].role = e.target.value;
                      setData(newProj);
                    }}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                 <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">链接</label>
                  <input
                    value={proj.link || ''}
                    onChange={(e) => {
                      const newProj = [...projects];
                      newProj[index].link = e.target.value;
                      setData(newProj);
                    }}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
               <label className="block text-xs font-medium text-slate-500 mb-1">项目描述</label>
               <textarea
                  value={proj.description}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[index].description = e.target.value;
                    setData(newProj);
                  }}
                  rows={3}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
               />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">技术栈 (逗号分隔)</label>
                <input
                  value={proj.technologies ? proj.technologies.join(', ') : ''}
                  onChange={(e) => {
                    const newProj = [...projects];
                    newProj[index].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setData(newProj);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
           </div>
        ))}
        <button
          onClick={() => setData([...projects, { name: '新项目', description: '项目描述...', technologies: [] }])}
          className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> 添加项目
        </button>
      </div>
    );
  };

  const getTitle = () => {
    switch(section) {
      case 'basic': return '编辑基本信息';
      case 'summary': return '编辑个人简介';
      case 'skills': return '编辑技能专长';
      case 'experience': return '编辑工作经历';
      case 'education': return '编辑教育背景';
      case 'projects': return '编辑项目经验';
      default: return '编辑内容';
    }
  };

  const renderContent = () => {
    switch(section) {
      case 'basic': return renderBasicInfoEditor();
      case 'summary': return renderSummaryEditor();
      case 'skills': return renderSkillsEditor();
      case 'experience': return renderExperienceEditor();
      case 'education': return renderEducationEditor();
      case 'projects': return renderProjectsEditor();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">{getTitle()}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
           {renderContent()}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> 保存更改
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
