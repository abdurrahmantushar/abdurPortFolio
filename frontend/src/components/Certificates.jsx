import { useEffect, useMemo, useState } from "react";
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
    icon: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
    bar: "from-purple-500 to-fuchsia-500",
    border: "hover:border-purple-500/50",
    link: "text-purple-300 group-hover/link:text-purple-200",
  },
  green: {
    icon: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    bar: "from-emerald-500 to-teal-400",
    border: "hover:border-emerald-500/50",
    link: "text-emerald-300 group-hover/link:text-emerald-200",
  },
  cyan: {
    icon: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    bar: "from-cyan-500 to-sky-400",
    border: "hover:border-cyan-500/50",
    link: "text-cyan-300 group-hover/link:text-cyan-200",
  },
  blue: {
    icon: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    bar: "from-blue-500 to-indigo-400",
    border: "hover:border-blue-500/50",
    link: "text-blue-300 group-hover/link:text-blue-200",
  },
  gray: {
    icon: "bg-white/10 text-white ring-white/20",
    bar: "from-slate-400 to-slate-200",
    border: "hover:border-white/30",
    link: "text-slate-200 group-hover/link:text-white",
  },
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#070b14] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20";

function CertificateCard({ certificate, isAdmin, onEdit, onDelete }) {
  const Icon = iconMap[certificate.icon] || FaAward;
  const accent = accentStyles[certificate.accent] || accentStyles.purple;
  const certificateLink = certificate.credentialUrl || certificate.image;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c1322] transition-colors duration-300 hover:bg-[#101a2e] ${accent.border}`}
    >
      {/* accent bar */}
      <span
        className={`absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r ${accent.bar}`}
      />

      {/* certificate preview */}
      <div className="relative p-3 pb-0">
        <a
          href={certificateLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${certificate.title} certificate`}
          className="block aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#f4f5f8] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
        >
          <img
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>

        {isAdmin && (
          <div className="absolute right-6 top-6 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(certificate)}
              aria-label="Edit certificate"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0c1322]/90 text-indigo-300 shadow-lg backdrop-blur transition hover:bg-indigo-500 hover:text-white"
            >
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={() => onDelete(certificate._id)}
              aria-label="Delete certificate"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0c1322]/90 text-red-400 shadow-lg backdrop-blur transition hover:bg-red-500 hover:text-white"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-0">
        <div
          className={`-mt-5 mb-4 flex h-10 w-10 items-center justify-center rounded-xl ring-1 backdrop-blur ${accent.icon} bg-[#0c1322]`}
        >
          <Icon size={18} />
        </div>

        <h3 className="text-lg font-semibold leading-snug text-white">
          {certificate.title}
        </h3>

        {certificate.subtitle && (
          <p className="mt-1 text-sm text-slate-400">{certificate.subtitle}</p>
        )}

        <p className="mt-3 mb-5 text-sm font-medium text-slate-200">
          {certificate.issuer}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          {certificate.issueDate ? (
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <FaCalendarAlt className="text-slate-500" size={12} />
              {certificate.issueDate}
            </span>
          ) : (
            <span />
          )}

          <a
            href={certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/link inline-flex items-center gap-2 text-sm font-medium transition ${accent.link}`}
          >
            View certificate
            <FaExternalLinkAlt
              size={11}
              className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
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

  const previewUrl = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : null),
    [selectedImage]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingCertificate(null);
    setSelectedImage(null);
    setFormData({ ...emptyForm });
    setModalOpen(true);
  };

  const openEditModal = (certificate) => {
    setEditingCertificate(certificate);
    setSelectedImage(null);

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
    setSelectedImage(null);
    setFormData({ ...emptyForm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin || saving) return;

    try {
      setSaving(true);

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
          setCertificates((prev) => [res.data.data, ...prev]);
        }

        closeModal();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to save certificate."
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
        error.response?.data?.message || "Failed to delete certificate."
      );
    }
  };

  return (
    <section
      id="certificates"
      className="relative isolate overflow-hidden bg-[#070b14] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Certifications
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
              Courses and credentials I&apos;ve completed to sharpen my skills
              and keep up with modern technologies.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {!loading && !error && certificates.length > 0 && (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <FaAward className="text-2xl text-indigo-400" />
                <div className="leading-tight">
                  <p className="text-2xl font-bold">{certificates.length}</p>
                  <p className="text-xs text-slate-400">
                    {certificates.length === 1 ? "Certificate" : "Certificates"}
                  </p>
                </div>
              </div>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
              >
                <FaPlus />
                Add certificate
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl border border-white/10 bg-[#0c1322]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center text-red-300">
            <p>{error}</p>

            <button
              type="button"
              onClick={getCertificates}
              className="mt-4 rounded-lg border border-red-500/40 px-4 py-2 transition hover:bg-red-500/10"
            >
              Try again
            </button>
          </div>
        ) : certificates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
            <FaAward className="mx-auto mb-3 text-3xl text-slate-600" />
            <p className="text-slate-400">No certificates added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
            className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c1322] p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-semibold text-white">
                {editingCertificate ? "Edit certificate" : "Add certificate"}
              </h3>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["title", "Certificate title"],
                ["subtitle", "Subtitle"],
                ["issuer", "Issuer"],
                ["issueDate", "Issue date"],
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
                    className={inputClass}
                  />
                </label>
              ))}

              <label className="flex flex-col gap-2 text-sm text-slate-300 sm:col-span-2">
                Certificate image

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required={!editingCertificate}
                  onChange={(e) =>
                    setSelectedImage(e.target.files?.[0] || null)
                  }
                  className={`${inputClass} file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-500 file:px-3 file:py-2 file:text-white`}
                />

                {selectedImage && (
                  <>
                    <p className="text-xs text-emerald-400">
                      Selected: {selectedImage.name}
                    </p>
                    <img
                      src={previewUrl}
                      alt="Selected certificate preview"
                      className="mt-1 h-40 w-full rounded-xl border border-white/10 bg-[#f4f5f8] object-contain p-1"
                    />
                  </>
                )}

                {!selectedImage && editingCertificate?.image && (
                  <div className="mt-1">
                    <p className="mb-2 text-xs text-slate-400">
                      Current image
                    </p>
                    <img
                      src={editingCertificate.image}
                      alt="Current certificate"
                      className="h-40 w-full rounded-xl border border-white/10 bg-[#f4f5f8] object-contain p-1"
                    />
                  </div>
                )}

                {!editingCertificate && !selectedImage && (
                  <p className="text-xs text-slate-500">
                    Select an image to upload.
                  </p>
                )}
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Icon
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {Object.keys(iconMap).map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Accent color
                <select
                  name="accent"
                  value={formData.accent}
                  onChange={handleChange}
                  className={inputClass}
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
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-60"
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
                    ? "Save changes"
                    : "Add certificate"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}