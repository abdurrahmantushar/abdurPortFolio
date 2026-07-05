export const Services =()=>{
    return(
    <div className=" text-white">
        <div className=" md:text-6xl text-2xl sm:text-3xl lg:text-7xl  text-white flex justify-center font-bold">
            Look at my <span className=" pl-3 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text "> services</span> 
        </div>
            <div className="justify-center flex mt-8 flex-col text-center text-gray-400">
                <p>I build modern full-stack web applications using the MERN stack with clean, scalable,</p>
                <p>and responsive solutions tailored for real-world needs.</p>
            </div>
       <div className="flex flex-cols-2 gap-8 justify-center mt-10 lg:mr-20">
  <div className="bg-[#1f1f1f] lg:sm:w-[270px] lg:sm:h-[300px] w-[200px] h-[250px] ml-3 lg:rounded rounded-2xl flex flex-col items-center justify-center text-center transform transition-transform duration-400 hover:-translate-y-3 shadow-lg hover:shadow-xl">
    <img 
      className="mb-5 h-[50px]"  
      src="https://cdn.prod.website-files.com/61f03747d8d407ed117df27f/61f15296695f17610b51d4f1_services%20logo%201.svg" 
    />
    <h1 className="font-semibold lg:text-3xl text-x"> Full Stack MERN </h1>
                 <p className="text-gray-400 mt-3 text-xs px-4">
                        Building scalable full-stack web applications using MongoDB, Express.js,
                        React.js, and Node.js with clean code and modern UI.
                </p> 
  </div>

  <div className="bg-[#1f1f1f] lg:sm:w-[270px] lg:sm:h-[300px] w-[200px] h-[250px] mr-3 lg:rounded rounded-2xl flex flex-col items-center justify-center text-center transform transition-transform duration-400 hover:-translate-y-3 shadow-lg hover:shadow-xl">
    <img 
      className="mb-5 h-[50px]"  
      src="https://cdn.prod.website-files.com/61f03747d8d407ed117df27f/61f15296695f17610b51d4f1_services%20logo%201.svg" 
    />
    <h1 className="font-semibold lg:text-3xl text-x"> AI-Driven Full Stack </h1>
    <p className="text-gray-400 mt-3 px-4">Coming Soon...</p>
  </div>
</div>



    </div>
    )
}
