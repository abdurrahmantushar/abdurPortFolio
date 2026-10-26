
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  X,
  Trash2,
  User,
  ExternalLink,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const suggestions = [
  "Tell me about this developer",
  "How many projects are in the portfolio?",
  "What are his technical skills?",
  "How can I contact him?",
];

const initialMessage = {
  role: "assistant",
  content:
    "Hey there! 👋 I'm your AI portfolio assistant. Ask me about projects, skills, experience, or how to get in touch.",
};


function MessageContent({ content }) {
  return (
    <div className="min-w-0 max-w-full text-[13px] leading-6 [overflow-wrap:anywhere] [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-white [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:font-semibold [&_h3]:text-white [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_li]:pl-1 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-violet-400 [&_blockquote]:pl-3 [&_blockquote]:text-gray-400 [&_hr]:my-3 [&_hr]:border-white/10">
      <ReactMarkdown
        components={{
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="my-0.5 inline-flex max-w-full items-start gap-1 break-all text-violet-300 underline decoration-violet-400/40 underline-offset-4 transition hover:text-violet-200"
            >
              <span className="break-all">{children}</span>
              <ExternalLink
                size={12}
                className="mt-1 shrink-0"
              />
            </a>
          ),
          code: ({ children }) => (
            <code className="break-all rounded-md border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[12px] text-violet-200">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-3 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#0c0c12] p-3 text-xs leading-5">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


export default function FloatingPortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(
        () => inputRef.current?.focus(),
        200
      );

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = async (question = input) => {
    const message = question.trim();

    if (!message || isLoading) return;

    if (!API_URL) {
      setError(
        "API URL is missing. Please check your frontend environment variables."
      );
      return;
    }

    setInput("");
    setError("");

    setMessages((previous) => [
      ...previous,
      { role: "user", content: message },
    ]);

    setIsLoading(true);

    try {
      const baseUrl = API_URL.replace(/\/+$/, "");

      const response = await fetch(
        `${baseUrl}/api/portfolio-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json().catch(() => null);

      if (
        !response.ok ||
        !data?.success ||
        typeof data.reply !== "string"
      ) {
        throw new Error(
          data?.message ||
            data?.error ||
            "The assistant couldn't answer right now. Please try again."
        );
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the assistant. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    setError("");
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="AI portfolio chat"
          className="mb-4 flex h-[min(650px,calc(100dvh-120px))] w-[calc(100vw-40px)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101018] shadow-[0_24px_100px_rgba(0,0,0,0.65)]"
        >
          <header className="relative overflow-hidden border-b border-white/10 bg-[#171421] px-4 py-4">
            <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/40">
                <Bot size={23} className="text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold tracking-tight text-white">
                  Portfolio AI
                </h2>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-gray-400">
                    Ask me anything
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <Trash2 size={17} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-5 overflow-x-hidden overflow-y-auto bg-[#0d0d14] px-4 py-5 [scrollbar-color:#393047_transparent] [scrollbar-width:thin]">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex min-w-0 items-start gap-2.5 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    message.role === "user"
                      ? "bg-white/10 text-gray-200"
                      : "bg-violet-500/15 text-violet-300"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Sparkles size={16} />
                  )}
                </div>


              <div
                className={`min-w-0 max-w-[85%] overflow-hidden rounded-2xl px-4 py-3.5 shadow-sm ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
                    : "rounded-tl-sm border border-white/[0.08] bg-gradient-to-br from-[#1c1b27] to-[#171720] text-gray-200"
                }`}
              >
                <MessageContent content={message.content} />
              </div>

              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="min-w-0 pl-10">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Try asking
                </p>

                <div className="flex flex-col items-start gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="max-w-full break-words rounded-xl border border-violet-400/20 bg-violet-500/[0.06] px-3 py-2 text-left text-xs text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/15"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex min-w-0 items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Sparkles size={16} />
                </div>

                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-[#191922] px-4 py-4">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
                </div>
              </div>
            )}

            {error && (
              <div className="ml-10 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-xs leading-5 text-red-300">
                {error}

                <button
                  type="button"
                  onClick={() =>
                    sendMessage(
                      messages.at(-1)?.role === "user"
                        ? messages.at(-1).content
                        : input
                    )
                  }
                  disabled={
                    isLoading ||
                    messages.at(-1)?.role !== "user"
                  }
                  className="ml-2 font-semibold underline underline-offset-2 disabled:opacity-50"
                >
                  Retry
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="border-t border-white/10 bg-[#12121a] p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#1a1a25] p-2 transition focus-within:border-violet-400/50 focus-within:ring-2 focus-within:ring-violet-500/10">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills..."
                aria-label="Your message"
                disabled={isLoading}
                maxLength={2000}
                className="max-h-28 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-2 text-center text-[10px] text-gray-600">
              AI responses may not always be accurate
            </p>
          </form>
        </section>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={
            isOpen ? "Close portfolio chat" : "Open portfolio chat"
          }
          className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 text-white shadow-[0_8px_35px_rgba(124,58,237,0.4)] transition duration-300 hover:scale-105 hover:shadow-[0_10px_45px_rgba(124,58,237,0.55)] active:scale-95"
        >
          <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition group-hover:opacity-100" />

          {isOpen ? (
            <X size={25} className="relative" />
          ) : (
            <MessageCircle size={25} className="relative" />
          )}

          {!isOpen && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0d0d14] bg-emerald-400" />
          )}
        </button>
      </div>
    </div>
  );
}
