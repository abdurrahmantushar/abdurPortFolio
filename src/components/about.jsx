export const About =()=>{
    return(
        <div className=" h-1px lg:h-[500px] bg-gray-100 flex flex-col items-center py-20 ">
            
            <div className=" w-full max-w-6xl px-6"> 
                <div className=" grid grid-cols-12 gap-08 items-start"> 
                    <div className="col-span-3 flex items-start">
                        <h1 className=" md:text-6xl lg:ml-10 lg:text-3xl text-xl font-bold leading-none tracking-tight text-black ">
                            ABDUR
                            <br/>
                            RAHMAN
                        </h1> 
                        </div>
                             <div className="col-span-9 lg:pl-30 pl-0 ">
                            <div className="grid grid-cols-2 gap-8 lg:gap-0 text-sm text-gray-700">
                            <p className=" lg:leading-7 leading-5  text-x"> I am a passionate Frontend Developer specializing in React.js.  
                As a fresher developer, I focus on creating clean, responsive,  
                and user-friendly interfaces. I enjoy turning ideas into  
                interactive web experiences and constantly improving my skills  
                through practical projects and real-world problem solving. </p>
                            <p className=" lg:leading-7 leading-5 text-x lg:text-xs">
                                My goal is to build modern, optimized, and user-friendly applications using React, Tailwind CSS, and JavaScript. I am passionate about exploring new technologies, writing clean and maintainable code, and collaborating to create meaningful digital products that deliver real value. I am eager to quickly master backend development to broaden my skill set, develop unique and innovative solutions, and continuously stay ahead by learning the latest trends and tools in web development.
                            </p>
                            </div>
                        <div className=" mt-8">
                            <div className="flex gap-6 text-center items-center">
                                <div>

                                    <div  className=" lg:text-4xl text-3xl font-bold "> 10+ </div>
                                    <div className=" text-x font-medium text-black mt-1"> Project Done </div>
                                </div>
                                <div>

                                    <div  className=" lg:text-4xl text-3xl font-bold"> 01 </div>
                                    <div className=" text-x font-medium text-black mt-1"> Experience </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}