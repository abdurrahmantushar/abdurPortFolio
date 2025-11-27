export const Services =()=>{
    return(
    <div className=" text-white">
        <div className=" md:text-6xl text-2xl sm:text-3xl lg:text-7xl  text-white flex justify-center font-bold">
            Look at my <span className=" pl-3 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text "> services</span> 
        </div>
        <div className="justify-center flex mt-8 flex-col text-center text-gray-400">
            <p>If you’re searching for a web developer who can turn your ideas into a beautiful, functional website</p>
            <p>then you’re in the right place!</p>
        </div>
       <div className="flex flex-cols-2 gap-8 justify-center mt-10 lg:mr-20">
  <div className="bg-[#1f1f1f] lg:sm:w-[270px] lg:sm:h-[300px] w-[230px] h-[280px] flex flex-col items-center justify-center text-center transform transition-transform duration-400 hover:-translate-y-3 shadow-lg hover:shadow-xl">
    <img 
      className="mb-5 h-[50px]"  
      src="https://cdn.prod.website-files.com/61f03747d8d407ed117df27f/61f15296695f17610b51d4f1_services%20logo%201.svg" 
    />
    <h1 className="font-semibold text-3xl">Front-end Develope</h1>
    <p className="text-gray-400 mt-3 px-4">Building a clean and responsive web interface using modern React concepts</p>
  </div>

  <div className="bg-[#1f1f1f] lg:sm:w-[270px] lg:sm:h-[300px] w-[230px] h-[280px] flex flex-col items-center justify-center text-center transform transition-transform duration-400 hover:-translate-y-3 shadow-lg hover:shadow-xl">
    <img 
      className="mb-5 h-[50px]"  
      src="https://cdn.prod.website-files.com/61f03747d8d407ed117df27f/61f15296695f17610b51d4f1_services%20logo%201.svg" 
    />
    <h1 className="font-semibold text-3xl">Backend Develope</h1>
    <p className="text-gray-400 mt-3 px-4">Coming Soon...</p>
  </div>
</div>



    </div>
    )
}