import React, { useState } from 'react';
import { ResumeData } from '../types';
import { Mail, MapPin, Globe, Github, Linkedin, ExternalLink, Briefcase, GraduationCap, Award, Edit2, Trophy } from 'lucide-react';
import SectionEditor from './SectionEditor';

interface ResumePreviewProps {
  data: ResumeData;
  onUpdate: (newData: ResumeData) => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onUpdate }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleEditClick = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = (sectionData: any) => {
    let newData = { ...data };
    
    switch (editingSection) {
      case 'basic':
        newData = { ...newData, ...sectionData };
        break;
      case 'summary':
        newData.summary = sectionData;
        break;
      case 'skills':
        newData.skills = sectionData;
        break;
      case 'experience':
        newData.experience = sectionData;
        break;
      case 'education':
        newData.education = sectionData;
        break;
      case 'projects':
        newData.projects = sectionData;
        break;
      case 'awards':
        newData.awards = sectionData;
        break;
    }
    
    onUpdate(newData);
    setEditingSection(null);
  };

  const getInitialDataForEditor = () => {
     switch (editingSection) {
      case 'basic':
        return {
           fullName: data.fullName,
           title: data.title,
           email: data.email,
           phone: data.phone,
           location: data.location,
           socialLinks: data.socialLinks
        };
      case 'summary': return data.summary;
      case 'skills': return data.skills;
      case 'experience': return data.experience;
      case 'education': return data.education;
      case 'projects': return data.projects;
      case 'awards': return data.awards || [];
      default: return null;
    }
  };

  const EditButton = ({ section, className = "" }: { section: string, className?: string }) => (
    <button 
      onClick={() => handleEditClick(section)}
      className={`opacity-0 group-hover:opacity-100 transition-opacity absolute text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded-full ${className}`}
      title="编辑此板块"
    >
      <Edit2 className="w-4 h-4" />
    </button>
  );

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      {/* Header / Hero */}
      <header className="bg-slate-900 text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden group">
        <EditButton section="basic" className="top-6 right-6 bg-white/10 hover:bg-white/20 text-white hover:text-white" />
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{data.fullName}</h1>
          <p className="text-xl md:text-2xl text-indigo-300 mb-8 font-light">{data.title}</p>
          
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base text-slate-300">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> {data.email}
              </a>
            )}
            {data.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {data.location}
              </span>
            )}
            {data.socialLinks?.github && (
               <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                 <Github className="w-4 h-4" /> GitHub
               </a>
            )}
            {data.socialLinks?.linkedin && (
               <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                 <Linkedin className="w-4 h-4" /> LinkedIn
               </a>
            )}
             {data.socialLinks?.portfolio && (
               <a href={data.socialLinks.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                 <Globe className="w-4 h-4" /> Portfolio
               </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About */}
            <section className="relative group">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-6">
                 <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-8 h-1 bg-indigo-600 rounded-full"></span> 关于我
                </h2>
                <EditButton section="summary" className="static opacity-0 group-hover:opacity-100" />
              </div>
             
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {data.summary}
              </p>
            </section>

            {/* Experience */}
            <section className="relative group">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-8">
                 <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-8 h-1 bg-indigo-600 rounded-full"></span> 
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  工作经历
                </h2>
                <EditButton section="experience" className="static opacity-0 group-hover:opacity-100" />
              </div>

              <div className="space-y-10">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                      <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit mt-1 md:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium mb-4">{exp.company}</p>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

             {/* Projects */}
             <section className="relative group">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-8">
                 <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-8 h-1 bg-indigo-600 rounded-full"></span> 
                  <Award className="w-5 h-5 text-indigo-600" />
                  项目经验
                </h2>
                <EditButton section="projects" className="static opacity-0 group-hover:opacity-100" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{project.name}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    {project.role && <p className="text-sm text-indigo-600 mb-2 font-medium">{project.role}</p>}
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-12">
            
            {/* Skills */}
            <section className="relative group">
               <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-6">
                 <h2 className="text-xl font-bold text-slate-900">
                    技能专长
                  </h2>
                <EditButton section="skills" className="static opacity-0 group-hover:opacity-100" />
              </div>
             
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="relative group">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-slate-400" />
                    教育背景
                  </h2>
                <EditButton section="education" className="static opacity-0 group-hover:opacity-100" />
              </div>
              
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-800">{edu.school}</h3>
                    <p className="text-indigo-600 text-sm mb-1">{edu.degree}</p>
                    <p className="text-slate-400 text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards */}
            <section className="relative group">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-slate-400" />
                    荣誉奖项
                  </h2>
                <EditButton section="awards" className="static opacity-0 group-hover:opacity-100" />
              </div>

              {(!data.awards || data.awards.length === 0) ? (
                 <div className="text-sm text-slate-400 italic">
                   暂无奖项信息，点击编辑添加。
                 </div>
              ) : (
                <div className="space-y-4">
                  {data.awards.map((award, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-slate-800">{award.name}</h3>
                      <p className="text-indigo-600 text-sm mb-1">{award.issuer}</p>
                      <p className="text-slate-400 text-xs">{award.year}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      <footer className="bg-slate-50 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} {data.fullName}. Powered by ResumeCraft AI.
        </p>
      </footer>

      {editingSection && (
        <SectionEditor
          section={editingSection}
          initialData={getInitialDataForEditor()}
          onSave={handleSave}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  );
};

export default ResumePreview;