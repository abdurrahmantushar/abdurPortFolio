
import { useEffect, useState } from "react";
import {
  FaAward,
  FaCalendarAlt,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaReact,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { Axios } from "../common/Axios";
import { SummaryApi } from "../common/Summry_api.js";

const emptyForm = {
  title: "",
  subtitle: "",
  issuer: "",
  issueDate: "",
  image: "",
  credentialUrl: "",
  icon: "code",
  accent: "purple",
};

const iconMap = {
  code: FaCode,
  graduation: FaGraduationCap,
  database: FaDatabase,
  react: FaReact,
  google: SiGoogle,
};

const accentStyles = {
  purple: {
    icon: "bg-purple-500/15 text-purple-400",
    border: "hover:border-purple-500/50",
    button: "hover:bg-purple-500/10",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/50",
    button: "hover:bg-emerald-500/10",
  },
  cyan: {
    icon: "bg-cyan-500/15 text-cyan-400",
    border: "hover:border-cyan-500/50",
    button: "hover:bg-cyan-500/10",
  },
  blue: {
    icon: "bg-blue-500/15 text-blue-400",
    border: "hover:border-blue-500/50",
    button: "hover:bg-blue-500/10",
  },
  gray: {
    icon: "bg-white/10 text-white",
    border: "hover:border-white/30",
    button: "hover:bg-white/5",
  },
};

function CertificateCard({
  certificate,
  isAdmin,
  onEdit,
  onDelete,
}) {
  const Icon = iconMap[certificate.icon] || FaAward;
  const accent =
    accentStyles[certificate.accent] || accentStyles.purple;

  const certificateLink =
    certificate.credentialUrl || certificate.image;

  return (
    <article
      className={`group grid grid-cols-1 gap-5 rounded-2xl border border-[#202b40] bg-[#0b1220]/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#10192a] sm:grid-cols-[minmax(130px,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-5 sm:p-5 ${accent.border}`}
    >
      <a
        href={certificateLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${certificate.title} certificate`}
        className="flex h-52 items-center justify-center overflow-hidden rounded-xl border border-[#27334a] bg-[#080d17] p-2 sm:h-48"
      >
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </a>

      <div className="flex min-w-0 flex-col items-start">
        <div
          className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${accent.icon}`}
        >
          <Icon size={20} />
        </div>

        <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-purple-300">
          {certificate.title}
        </h3>

        {certificate.subtitle && (
          <p className="mt-1 text-sm text-gray-400">
            {certificate.subtitle}
          </p>
        )}

        <p className="mt-2 text-sm text-gray-300">
          {certificate.issuer}
        </p>

        {certificate.issueDate && (
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <FaCalendarAlt className="text-indigo-400" />
            {certificate.issueDate}
          </p>
        )}

        <a
          href={certificateLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/80 px-5 py-2 text-sm font-medium text-indigo-200 transition-all duration-300 ${accent.button}`}
        >
          View Certificate
          <FaExternalLinkAlt size={11} />
        </a>

        {isAdmin && (
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => onEdit(certificate)}
              className="flex items-center gap-2 rounded-lg border border-indigo-500/40 px-3 py-2 text-sm text-indigo-300 transition hover:bg-indigo-500/10"
            >
              <FaEdit />
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(certificate._id)}
              className="flex items-center gap-2 rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function CertificateSection() {
  const [certificates, setCertificates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState(null);

  const getCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await Axios({
        ...SummaryApi.hero,
        url: "/api/certificates/",
        method: "get",
      });

      if (res.data.success) {
        setCertificates(res.data.data || []);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load certificates. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    getCertificates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateModal = () => {
    setEditingCertificate(null);
    setFormData({ ...emptyForm });
    setModalOpen(true);
  };

  const openEditModal = (certificate) => {
    setEditingCertificate(certificate);

    setFormData({
      title: certificate.title || "",
      subtitle: certificate.subtitle || "",
      issuer: certificate.issuer || "",
      issueDate: certificate.issueDate || "",
      image: certificate.image || "",
      credentialUrl: certificate.credentialUrl || "",
      icon: certificate.icon || "code",
      accent: certificate.accent || "purple",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCertificate(null);
    setFormData({ ...emptyForm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin || saving) return;

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const config = {
        ...SummaryApi.hero,
        url: editingCertificate
          ? `/api/certificates/update/${editingCertificate._id}`
          : "/api/certificates/create",
        method: editingCertificate ? "put" : "post",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


const payload = new FormData();

Object.entries(formData).forEach(([key, value]) => {
  if (key !== "image" || typeof value === "string") {
    payload.append(key, value);
  }
});

if (selectedImage) {
  payload.set("image", selectedImage);
}

const res = await Axios({
  url: editingCertificate
    ? `/api/certificates/${editingCertificate._id}`
    : "/api/certificates",
  method: editingCertificate ? "put" : "post",
  data: payload,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


      if (res.data.success) {
        if (editingCertificate) {
          setCertificates((prev) =>
            prev.map((certificate) =>
              certificate._id === res.data.data._id
                ? res.data.data
                : certificate
            )
          );
        } else {
          setCertificates((prev) => [
            res.data.data,
            ...prev,
          ]);
        }

        closeModal();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Failed to save certificate."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const res = await Axios({
        ...SummaryApi.hero,
        url: `/api/certificates/delete/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setCertificates((prev) =>
          prev.filter((certificate) => certificate._id !== id)
        );
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Failed to delete certificate."
      );
    }
  };

  return (
    <section
      id="certificates"
      className="relative isolate overflow-hidden bg-[#080d18] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-purple-600/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <header className="relative mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-indigo-400" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-400">
              Certificates
            </span>
            <span className="h-px w-10 bg-indigo-400" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            I believe in continuous learning and growth. Here are
            some of the certifications I&apos;ve earned to enhance
            my skills and knowledge.
          </p>

          {isAdmin && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              <FaPlus />
              Add Certificate
            </button>
          )}
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-[#202b40] bg-[#0b1220]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center text-red-300">
            <p>{error}</p>

            <button
              type="button"
              onClick={getCertificates}
              className="mt-4 rounded-lg border border-red-500/40 px-4 py-2 transition hover:bg-red-500/10"
            >
              Try Again
            </button>
          </div>
        ) : certificates.length === 0 ? (
          <p className="py-12 text-center text-slate-400">
            No certificates available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate._id}
                certificate={certificate}
                isAdmin={isAdmin}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <footer className="mx-auto mt-16 max-w-xl text-center">
          <div className="mb-5 flex items-center justify-center gap-5">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-400" />
            <FaAward className="text-3xl text-purple-400" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
          </div>

          <p className="text-sm leading-7 text-slate-400 sm:text-base">
            These certifications represent my dedication to
            learning and staying up-to-date with modern
            technologies.
          </p>
        </footer>
      </div>

{isAdmin && modalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}
  >
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#27334a] bg-[#0b1220] p-6 shadow-2xl sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
            Admin
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {editingCertificate ? "Edit Certificate" : "Add Certificate"}
          </h3>
        </div>

        <button
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <FaTimes />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["title", "Certificate Title"],
          ["subtitle", "Subtitle"],
          ["issuer", "Issuer"],
          ["issueDate", "Issue Date"],
          ["credentialUrl", "Credential URL"],
        ].map(([name, label]) => (
          <label
            key={name}
            className={`flex flex-col gap-2 text-sm text-slate-300 ${
              name === "credentialUrl" ? "sm:col-span-2" : ""
            }`}
          >
            {label}

            <input
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              required={["title", "issuer"].includes(name)}
              type={name === "credentialUrl" ? "url" : "text"}
              placeholder={label}
              className="w-full rounded-xl border border-[#27334a] bg-[#080d18] px-4 py-3 text-white outline-none transition focus:border-indigo-400"
            />
          </label>
        ))}

        <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
          Certificate Image

          <input
            type="file"
            name="image"
            accept="image/*"
            required={!editingCertificate}
            onChange={(e) =>
              setSelectedImage(e.target.files?.[0] || null)
            }
            className="w-full rounded-xl border border-[#27334a] bg-[#080d18] px-4 py-3 text-white outline-none transition focus:border-indigo-400 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:px-3 file:py-2 file:text-white"
          />

          {selectedImage && (
            <p className="text-xs text-emerald-400">
              Selected: {selectedImage.name}
            </p>
          )}

          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected certificate preview"
              className="mt-2 h-40 w-full rounded-xl border border-[#27334a] bg-[#080d18] object-contain"
            />
          )}

          {!selectedImage && editingCertificate?.image && (
            <div className="mt-2">
              <p className="mb-2 text-xs text-slate-400">
                Current certificate image
              </p>

              <img
                src={editingCertificate.image}
                alt="Current certificate"
                className="h-40 w-full rounded-xl border border-[#27334a] bg-[#080d18] object-contain"
              />
            </div>
          )}

          {!editingCertificate && (
            <p className="text-xs text-slate-500">
              Please select a certificate image to upload.
            </p>
          )}
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Icon

          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="rounded-xl border border-[#27334a] bg-[#080d18] px-4 py-3 text-white outline-none focus:border-indigo-400"
          >
            {Object.keys(iconMap).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Accent

          <select
            name="accent"
            value={formData.accent}
            onChange={handleChange}
            className="rounded-xl border border-[#27334a] bg-[#080d18] px-4 py-3 text-white outline-none focus:border-indigo-400"
          >
            {Object.keys(accentStyles).map((accent) => (
              <option key={accent} value={accent}>
                {accent}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <button
          type="button"
          onClick={closeModal}
          disabled={saving}
          className="rounded-xl border border-[#27334a] px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : editingCertificate
              ? "Update Certificate"
              : "Create Certificate"}
        </button>
      </div>
    </form>
  </div>
)}
    </section>
  );
}
