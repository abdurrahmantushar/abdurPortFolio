import { Outlet } from "react-router-dom"
import { About } from "./about"
import { Body } from "./Details"
import { Navbar } from "./navbar"
import { Services } from "./services"
import { Resume } from "./resume"
import { Projects } from "./projects"
import { Contact } from "./contact"

export const Components =()=>{
    return(
        <div>
            <div>
                <Navbar/>
                
                <section id="home">
                 <Body/>
                 
                </section>
                <section id="services" className=" mt-80 pt-[60px] ">
                <Services/>
                </section>
            </div>
            <br/>
            
            <section id="about" className=" pt-[60px]">
                <About/>
            </section>
            <section id="resume" className="  lg:pt-[5px]">
                <Resume/>
            </section>
            <section id="project" className=" lg:pt-[5px]">
                <Projects/>
            </section>
            <section id="contact" className="pt-[60px]">
                <Contact/>
            </section>
        </div>
    )
}