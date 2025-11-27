import { CgDanger } from "react-icons/cg";

import picture2 from '../assets/picture2.png'

export const Projects =()=>{
    return(
    <div>
        
        <div className=" h-[780px] sm:h-[810px] md:h-[800px] bg-white text-black pt-8 font-mono">
            <h1 className=' text-black ml-10 mb-10 sm:ml-10 sm:mb-10 lg:mt-1 font-semibold text-x lg:text-[20px] sm:text-3xl md:text-3xl flex'>
            <CgDanger className="  mr-1 w-9 h-9"/>

            I’ve created 10+ practice projects, and I’ll be deploying them one by one very soon.</h1>
           <div className="w-full max-w-[300px] lg:ml-11 ml-11 xs:h-[400px] sm:h-[630px] bg-gray-800 p-5 rounded-2xl shadow-lg text-white">
             <h4 className=' font-mono text-[10px]'>project-01</h4> 
             <img 
             className=' rounded-2xl mt-2'
             src={picture2}              
             alt="photo2" />
             <h2> Details:</h2>
             <ui className='text-xs '>
               <p className='pb-2 pl'> Designed and developed a responsive e-commerce UI using React and JavaScript.</p>
               <p className='pb-2'> Built reusable, component-based architecture to handle product listing.</p>
               <p className='pb-2'> Implemented dynamic state and props logic to manage UI interactions.</p>
               <p className='pb-2'>  Deployed the project on Netlify, gaining experience with real-world hosting workflow.</p>
               <p className='pb-2'>Implemented pagination, filtering, and dynamic product rendering.</p>
               <p className='pb-2'>  Used React hooks (useState, useEffect) for state management and handling side effects.</p>
               <p className='pb-2'>  Integrated REST API for data fetching</p>
               <a 
                href="https://abdurpractice.netlify.app/" 
                className="cursor-pointer inline-block transition-transform duration-300 hover:scale-110 border-2 border-white 0  text-emerald-400"
                >
                Click here to live
                </a>
                <h4 className='mt-2 text-[10px]'> Notice: This is a practice website. Some design elements are still incomplete, but the full version will be updated soon.</h4>
             </ui>
           </div>
        </div>
    </div>    
    )
}