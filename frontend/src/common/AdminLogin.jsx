import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SummaryApi } from "./Summry_api";
import { Axios } from "./Axios";


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...SummaryApi.adminLogin,
        data: {
          email,
          password,
        },
      });

      if (res.data.success) {
        const { token, role } = res.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 via-gray-950 to-black px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            Admin
          </p>

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Login to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/20"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;