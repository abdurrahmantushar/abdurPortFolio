import React from 'react';
import { FaFileAlt, FaGraduationCap, FaWrench, FaBolt, FaBookOpen } from "react-icons/fa";

const resumeData = {
  header: {
    title: "Resume"
  },
  summary: {
    title: "Summary",
    content: [
      "Passionate React frontend developer with strong foundation in JavaScript and modern UI design.",
      "Eager to contribute to real-world projects, grow technical skills, and build clean, efficient, user-friendly web applications."
    ]
  },
  education: [
    {
      degree: "BA in Bangla",
      period: "2025 - Running",
      institution: "National University"
    }
  ],
  skills: {
    techStack: [
      "Redux, React Query, React Hooks",
      "API & Data Handling, Routing",
      "TanStack Query, Reusable Components",
      "HTML & Tailwind CSS, CSS (Moderate)"
    ],
    languages: "English (Conversation), Bangla (Native), Hindi, Arabic (Conversation)"
  },
  strengths: [
    {
      id: 1,
      title: "Problem Solving",
      description: "Able to analyze issues logically and debug errors effectively during project development."
    },
    {
      id: 2,
      title: "Team Leadership",
      description: "Can collaborate effectively in group projects and communicate clearly."
    },
    {
      id: 3,
      title: "Adaptability",
      description: "Comfortable adopting new tools and technologies fast — learned React ecosystem in a short time."
    }
  ]
};


const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-6 h-6 text-white" />}
    <h2 className="text-xl md:text-2xl font-mono text-white font-bold">
      {title}:
    </h2>
  </div>
);

const GradientText = ({ text, className = "" }) => (
  <span className={`bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-semibold ${className}`}>
    {text}
  </span>
);

const CodeEditorWindow = ({ title, children }) => (
  <div className="w-full rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-2xl my-4">
    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="ml-4 text-xs text-gray-400 font-mono">{title}</span>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="font-mono text-sm md:text-base leading-relaxed text-blue-300">
        {children}
      </pre>
    </div>
  </div>
);


export const  Resume=()=> {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-mono selection:bg-pink-500 selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex items-center gap-3 mb-12 border-b border-gray-800 pb-6">
          <FaFileAlt className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl md:text-4xl font-bold">
            <GradientText text={resumeData.header.title} />
          </h1>
        </header>

        <div className="space-y-12">
          
          <section className="animate-fade-in-up">
            <SectionTitle icon={FaBookOpen} title={resumeData.summary.title} />
            <div className="ml-0 md:ml-8 border-l-2 border-purple-500/30 pl-4">
              {resumeData.summary.content.map((line, index) => (
                <p key={index} className="text-sm md:text-lg leading-relaxed mb-2">
                  <GradientText text={line} />
                </p>
              ))}
            </div>
          </section>


          <section>
            <SectionTitle icon={FaGraduationCap} title="Education" />
            <div className="ml-0 md:ml-8">
              <CodeEditorWindow title="education">
                <span className="text-yellow-400">"education"</span>: [<br/>
                {resumeData.education.map((edu, index) => (
                  <React.Fragment key={index}>
                    {'  '}&#123;<br/>
                    {'    '}<span className="text-blue-400">"degree"</span>: <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">"{edu.degree}"</span>,<br/>
                    {'    '}<span className="text-blue-400">"period"</span>: <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">"{edu.period}"</span>,<br/>
                    {'    '}<span className="text-blue-400">"institution"</span>: <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">"{edu.institution}"</span><br/>
                    {'  '}&#125;{index < resumeData.education.length - 1 ? ',' : ''}<br/>
                  </React.Fragment>
                ))}
                ]
              </CodeEditorWindow>
            </div>
          </section>

          <section>
            <SectionTitle icon={FaWrench} title={resumeData.skills.title} />
            <div className="ml-0 md:ml-8">
              <CodeEditorWindow title="skills">
                <span className="text-yellow-400">"skills"</span>: &#123;<br/>
                {'  '}<span className="text-blue-400">"techStack"</span>: [<br/>
                {resumeData.skills.techStack.map((skill, index) => (
                  <React.Fragment key={index}>
                    {'    '}<span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">"{skill}"</span>
                    {index < resumeData.skills.techStack.length - 1 ? ',' : ''}<br/>
                  </React.Fragment>
                ))}
                {'  '}],<br/>
                {'  '}<span className="text-blue-400">"languages"</span>: <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">"{resumeData.skills.languages}"</span><br/>
                &#125;
              </CodeEditorWindow>
            </div>
          </section>
          <section>
            <SectionTitle icon={FaBolt} title="Strengths" />
            <div className="ml-0 md:ml-8 grid gap-6">
              {resumeData.strengths.map((strength) => (
                <div key={strength.id} className="group">
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                    {strength.title}-
                  </h3>
                  <p className="mt-1 pl-4 text-sm md:text-lg">
                    <GradientText text={strength.description} />
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
        
        
      </div>
    </div>
  );
}