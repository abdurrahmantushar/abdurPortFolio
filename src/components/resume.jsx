
import { RxResume } from "react-icons/rx";
import { PiStudentBold } from "react-icons/pi";
import { GiSkills } from "react-icons/gi";

import exam from  '../assets/exam.png'
import determination from  '../assets/determination.png'
export const Resume =()=>{

    return(
        <div className="lg:h-[915px] bg-zinc-900 ">
            <div className=" text-x flex text-yellow-400  p-5 gap-1 ">
                <RxResume className=" mt-1"/>
                <p className="  font-mono gap-5 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"> Resume</p>
            </div>
            <div className=" font-mono ml-10">
                <h1 className="flex text-white font-mono text-xl"> 
                <img src={exam}
                className="w-[20px] h-[20px] mt-1 object-cover rounded shadow-sm filter invert text-white"
                alt="photo"
                />
                Summary:</h1>
                <p className=" text-emerald-400 lg:text-[17px] text-[11px]">Passionate React frontend developer with strong foundation in JavaScript and modern UI design. </p>
                <p className=" text-emerald-400 lg:text-[17px] text-[11px]">Eager to contribute to real-world projects, grow technical skills, and build clean, efficient, user-friendly web applications.</p>
            </div>
            <div className=" mt-10 font-mono" >
                <h1 className="gap-1 flex ml-10 text-xl text-white  font-mono  pb-2">
                <PiStudentBold  className=" mt-1"/>
                Education:</h1>
                <div className="grid md:grid-cols-2 gap-6">               
                    <div className="bg-gray-800 w-[300px] ml-10 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    <h2 className="text-x  text-emerald-400 mb-2">BA in Bangla</h2>
                    <p className="text-emerald-400">Government City Collge, Chattogram</p>
                    <p className="text-emerald-400">2025 - runnig</p>
                    </div>
                </div>
            </div>
            <div className=" font-mono text-emerald-400 mt-8">
                <h1 className=" text-white text-xl ml-11 flex gap-1">
                    <GiSkills className=" mt-1"/>
                    Skills:</h1>
                 <div >               
                    <div className="bg-gray-800 lg:w-[480px] ml-10 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    <h2 className="lg:text-[16px]  text-[12px]  text-emerald-400 mb-2 lg:ml-0 ml-0 "> - Redux,React Query,React Hooks,API & Data Handling,Routing,TanStack Query,Reusable Components</h2>
                    <p className="lg:text-[16px] text-[12px] text-emerald-400 lg:ml-0 ml-0">HTML &</p>
                    <p className="lg:text-[16px]  text-[12px] text-emerald-400 lg:ml-0 ml-0">Tailwind css , Css (modarate)</p>
                    <p className="lg:text-[16px]  text-[12px] text-emerald-400 lg:ml-0 ml-0">English(conversation level),Bangla(Mother Toungue),Hindi,Arabic(conversation level)</p>
                    </div>
                </div>
            </div>
                        
            <div className=" font-mono ml-10 mt-8">
                <h1 className="flex text-white font-mono text-xl"> 
                <img src={determination}
                className="w-[20px] h-[20px] mt-1 object-cover rounded shadow-sm filter invert text-white pr-1"
                alt="photo"
                />
                Strengths:</h1>
                <p className=" text-white">Problem Solving-</p>
                <p className=" text-emerald-400">Able to analyze issues logically and debug errors effectively during 
                project development.</p>
                <p className=" text-white">Team Leadership-</p>
                <p className=" text-emerald-400">Can collaborate effectively in group projects and communicate clearly.</p>
                <p className=" text-white">Adaptability-</p>
                <p className=" text-emerald-400">Comfortable adopting new tools and technologies fast — learned 
                React ecosystem in a short time.</p>
            </div>
        </div>
    )
}