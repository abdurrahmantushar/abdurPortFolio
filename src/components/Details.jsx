import picture1 from  '../assets/picture1.png'
export const Body =()=>{
    return(
        <div className=" text-white px-6 md:px-16 lg:px-24 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className=" flex-1">
                <h1 className=" text-5xl md:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                        Front-end Developer
                    </span>
                    <br/>
                    I build modern &
                    <br/>
                    high-performance web interfaces
                </h1>
                <p className=" mt-6 text-gray-300" > “I’m Abdur — a React Developer passionate about building innovative web apps, aiming to grow into a Full-Stack Developer and create complete solutions.” </p>
            </div>
              <style>
        {`
          @keyframes pulseGlow {
            0% { 
              transform: scale(1); 
              /* Pink and Purple glow */
              filter: drop-shadow(0 0 6px #EC4899) drop-shadow(0 0 10px #A855F7); 
            }
            50% { 
              transform: scale(1.02); 
              /* Deeper Pink and Purple glow */
              filter: drop-shadow(0 0 10px #EC4899) drop-shadow(0 0 20px #A855F7); 
            }
            100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 6px #EC4899) drop-shadow(0 0 10px #A855F7); 
            }
          }
          .image-glow-container {
            animation: pulseGlow 5s ease-in-out infinite;
          }
        `}
      </style>
<div className="flex justify-center items-center mb-16">
          <div className="relative">

            <div className="image-glow-container inline-block rounded-xl shadow-lg">
              <img
                src={picture1}
                alt="profile"
                className="w-[240px] h-[290px] md:w-[350px] md:h-[400px] mr-50 mt-10 object-cover ml-10  rounded-xl border-4 border-transparent"
                
              />
            </div>
          </div>
        </div>










        </div>
    )
}