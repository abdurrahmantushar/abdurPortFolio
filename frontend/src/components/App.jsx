import { About } from "./about"
import { Body } from "./Details"
import { Services } from "./services"
import { Resume } from "./resume"
import { Navbar } from "./layout/navbar"
import { Contact } from "./layout/contact"
import { ProjectPage } from "./projects"
import { Footer } from "./layout/Footer"
import PageLines from "../animations/FallingParticles"

export const Components = () => {
    return (
        <div>
            <PageLines />

            <div>
                <Navbar />

                <section id="home">
                    <Body />
                </section>

                <section id="services" className="mt-80 pt-[60px]">
                    <Services />
                </section>

                <section id="about" className="pt-[60px]">
                    <About />
                </section>

                <section id="resume">
                    <Resume />
                </section>

                <section id="project">
                    <ProjectPage />
                </section>

                <section id="contact">
                    <Contact />
                </section>

                <Footer />
            </div>
        </div>
    )
}