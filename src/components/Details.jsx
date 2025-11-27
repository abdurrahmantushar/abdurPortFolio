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
<div className="flex-1 flex justify-center items-center">
  <div className="relative">
    <div cstyle={{
        display: "inline-block",
        animation: "pulseScale 10s ease-in-out infinite",
      }}>
    <img
      src={picture1}
      alt="profile"
      className="lg:w-[300px] lg:h-[350px] lg:mr-15 w-[330px] h-[410px] mr- object-cover rounded shadow-sm"
      style={{
        filter: `
          drop-shadow(0 -4px 4px rgba(236,72,153,0.7))   /* Top pink glow */
          drop-shadow(2px 0 4px rgba(59,130,246,0.7))    /* Right blue glow */
          drop-shadow(0 1px 4px rgba(34,197,94,0.7))     /* Bottom green glow */
          drop-shadow(-4px 0 4px rgba(250,204,21,0.7))   /* Left yellow glow */
        `
      }}
    />
    </div>
  </div>
</div>










        </div>
    )
}