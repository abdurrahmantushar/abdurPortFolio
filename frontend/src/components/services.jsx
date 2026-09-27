import {
  FaCode,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import {
  ServiceCardAnimation,
  ServiceIconAnimation,
} from "../animations/ServicesAnimation";

export const Services = () => {
  const services = [
    {
      number: "01",
      icon: <FaCode />,
      title: "Full Stack MERN",
      description:
        "Building modern full-stack web applications with clean architecture, responsive interfaces, secure APIs, and scalable backend systems.",
      features: [
        "Responsive Web Applications",
        "REST API Development",
        "Authentication & Authorization",
      ],
      accent: "purple",
    },
    {
      number: "02",
      icon: <FaRobot />,
      title: "AI-Driven Full Stack",
      description:
        "Exploring intelligent web applications by combining modern full-stack technologies with AI-powered features and API integrations.",
      features: [
        "AI API Integration",
        "Intelligent Web Features",
        "AI-Powered Experiences",
      ],
      accent: "pink",
      comingSoon: true,
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="absolute left-[-150px] top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute bottom-10 right-[-150px] h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 sm:text-sm">
            What I Do
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            I build modern digital experiences using full-stack technologies,
            focusing on clean code, responsive design, and real-world
            solutions.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCardAnimation
              key={service.number}
              delay={index * 0.2}
            >
              <div
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.065] sm:p-7"
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-all duration-500 ${
                    service.accent === "pink"
                      ? "bg-pink-500/10 group-hover:bg-pink-500/20"
                      : "bg-purple-500/10 group-hover:bg-purple-500/20"
                  }`}
                />

                <div className="relative flex items-start justify-between">
                  <ServiceIconAnimation>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        service.accent === "pink"
                          ? "border-pink-500/20 bg-pink-500/10 text-pink-400"
                          : "border-purple-500/20 bg-purple-500/10 text-purple-400"
                      } text-xl`}
                    >
                      {service.icon}
                    </div>
                  </ServiceIconAnimation>

                  <span className="text-4xl font-bold text-white/[0.06]">
                    {service.number}
                  </span>
                </div>

                <div className="relative mt-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {service.title}
                    </h3>

                    {service.comingSoon && (
                      <span className="rounded-full border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-[10px] font-medium text-pink-300">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <FaCheckCircle
                        className={
                          service.accent === "pink"
                            ? "text-pink-400"
                            : "text-purple-400"
                        }
                        size={14}
                      />

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-7 border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-gray-600">
                      Service
                    </span>

                    <span
                      className={`flex items-center gap-2 text-xs font-medium transition-all duration-300 ${
                        service.accent === "pink"
                          ? "text-pink-400"
                          : "text-purple-400"
                      }`}
                    >
                      Explore
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${
                    service.accent === "pink"
                      ? "from-pink-500 to-purple-500"
                      : "from-purple-500 to-pink-500"
                  }`}
                />
              </div>
            </ServiceCardAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};