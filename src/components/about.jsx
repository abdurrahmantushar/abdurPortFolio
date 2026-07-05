export const About =()=>{
    return(
        <div className=" h-1px lg:h-[500px] bg-black flex flex-col items-center py-20 ">
            
            <div className=" w-full max-w-6xl px-6"> 
                <div className=" grid grid-cols-12 gap-08 items-start"> 
                    <div className="col-span-3 flex items-start">
                        <h1 className=" md:text-6xl lg:ml-10 lg:text-4xl text-xl  text-white font-bold leading-none tracking-tight text-black ">
                            ABDUR
                            <br/>
                            RAHMAN
                        </h1> 
                        
                        </div>
                             <div className="col-span-9 lg:pl-9 pl-5 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-5 text-sm  text-white">
                            <p className="lg:leading-7 leading-4 text-x">
  I am a passionate Full Stack MERN Developer with hands-on experience building
  modern web applications using MongoDB, Express.js, React.js, and Node.js.
  I enjoy creating responsive user interfaces, developing scalable RESTful APIs,
  and solving real-world problems through clean, efficient, and maintainable code.
  I continuously improve my skills by building practical projects and exploring
  modern web technologies.
</p>
                            <p className="lg:leading-7 leading-5 text-x lg:text-xs">
  My goal is to build scalable, high-performance, and user-centric web
  applications using the MERN stack. I am passionate about writing clean code,
  designing efficient backend systems, integrating APIs, and delivering seamless
  user experiences. I am also exploring AI-powered applications and continuously
  learning modern tools and best practices to grow as a professional Full Stack
  Software Engineer.
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
