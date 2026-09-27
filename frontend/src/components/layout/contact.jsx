import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  HiOutlineMail,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
} from "react-icons/hi";
import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { ContactAnimation, motion } from "../../animations/ContactAnimation";

export const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_kiljmbi",
        "template_gm7pv7p",
        form.current,
        "rlNObkQbzapq6FvW5"
      );

      await emailjs.sendForm(
        "service_kiljmbi",
        "template_e3pwdyj",
        form.current,
        "rlNObkQbzapq6FvW5"
      );

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-black px-5 py-16 text-white sm:px-8 lg:px-10"
    >
      <motion.div
        className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]"
        {...ContactAnimation.glow}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-pink-600/10 blur-[120px]"
        {...ContactAnimation.glow}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          {...ContactAnimation.header}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
            Get In Touch
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let’s Work <span className="text-purple-400">Together</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Have a project in mind or want to discuss an opportunity?
            Feel free to send me a message.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-2"
            {...ContactAnimation.left}
          >
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Contact Details
              </p>

              <h3 className="mt-4 text-2xl font-bold text-white">
                Let's start a conversation.
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                I'm open to freelance projects, internships, collaborations,
                and full-time opportunities.
              </p>

              <div className="mt-8 space-y-4">
                <motion.a
                  href="mailto:abdurrahmantushar0@gmail.com"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5"
                  {...ContactAnimation.item}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <HiOutlineMail className="text-xl" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm text-gray-300 transition group-hover:text-white">
                      abdurrahmantushar0@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+8801890130921"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/5"
                  {...ContactAnimation.item}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <HiOutlinePhone className="text-xl" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-gray-300 transition group-hover:text-white">
                      +880 189 013 0921
                    </p>
                  </div>
                </motion.a>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-4 text-xs uppercase tracking-wider text-gray-500">
                  Find Me Online
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="https://abdur-port-folio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:text-white"
                    {...ContactAnimation.social}
                  >
                    <HiOutlineGlobeAlt className="text-lg" />
                    Portfolio
                  </motion.a>

                  <motion.a
                    href="https://github.com/abdurrahmantushar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:text-white"
                    {...ContactAnimation.social}
                  >
                    <FaGithubSquare className="text-lg" />
                    GitHub
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/abdur-rahman-tushar-x/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:text-white"
                    {...ContactAnimation.social}
                  >
                    <CiLinkedin className="text-xl" />
                    LinkedIn
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/abdur_rahman_tushar_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:text-white"
                    {...ContactAnimation.social}
                  >
                    <FaInstagram className="text-lg" />
                    Instagram
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            {...ContactAnimation.right}
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <motion.div {...ContactAnimation.item}>
                  <label className="mb-2 block text-xs font-medium text-gray-400">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-purple-500/50 focus:bg-purple-500/5 focus:ring-2 focus:ring-purple-500/10"
                  />
                </motion.div>

                <motion.div {...ContactAnimation.item}>
                  <label className="mb-2 block text-xs font-medium text-gray-400">
                    Your Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-purple-500/50 focus:bg-purple-500/5 focus:ring-2 focus:ring-purple-500/10"
                  />
                </motion.div>
              </div>

              <motion.div
                className="mt-5"
                {...ContactAnimation.item}
              >
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-purple-500/50 focus:bg-purple-500/5 focus:ring-2 focus:ring-purple-500/10"
                />
              </motion.div>

              <motion.div
                className="mt-5"
                {...ContactAnimation.item}
              >
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-purple-500/50 focus:bg-purple-500/5 focus:ring-2 focus:ring-purple-500/10"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-xl hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                {...ContactAnimation.button}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <motion.p
                  className="mt-4 text-center text-sm text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I’ll get back to you soon.
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  className="mt-4 text-center text-sm text-red-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t border-white/10 pt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

        </motion.div>
      </div>
    </footer>
  );
};
