import { Outlet } from "react-router-dom"
import { About } from "./about"
import { Body } from "./Details"
import { Navbar } from "./navbar"
import { Services } from "./services"
import { Projects } from "./projects"
import { Contact } from "./contact"
import {Resume} from './resume'
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
            <section id="resume" className="  ">
                <Resume/>
            </section>
            <section id="project" className=" ">
                <Projects/>
            </section>
            <section id="contact" className="">
                <Contact/>
            </section>
        </div>
    )
}