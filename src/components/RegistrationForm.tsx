import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { EVENT_CONFIG } from "../config";
import {
  type FormErrors,
  type RegistrationFormData,
  validateField,
  validateForm,
} from "../lib/validation";
import { submitRegistration } from "../lib/googleSheets";

const initialData: RegistrationFormData = {
  name: "",
  email: "",
  department: "",
  section: "",
  year: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm() {
  const [data, setData] = useState<RegistrationFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const { departments, sections, years } = EVENT_CONFIG.formOptions;

  const handleChange = (field: keyof RegistrationFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: keyof RegistrationFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, data[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(data);
    setErrors(formErrors);
    setTouched({ name: true, email: true, department: true, section: true, year: true });

    if (Object.keys(formErrors).length > 0 || status === "submitting") return;

    setStatus("submitting");
    const result = await submitRegistration(data);

    if (result.success) {
      setStatus("success");
      setData(initialData);
      setTouched({});
    } else {
      setStatus("error");
      setStatusMessage(
        result.duplicate
          ? "This email address has already been registered."
          : result.message || "Registration could not be completed. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secgreen/10 border border-secgreen/40 shadow-neon-green"
        >
          <CheckCircle2 className="text-secgreen" size={32} />
        </motion.div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3">
          REGISTRATION SUCCESSFUL
        </h3>
        <p className="text-sm sm:text-base text-ink/80">
          Your registration has been received successfully.
        </p>
        <p className="text-sm sm:text-base text-ink/80 mt-1">
          See you at the Cyber Security Webinar.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-mono text-xs tracking-widest text-cyan underline underline-offset-4"
        >
          REGISTER ANOTHER STUDENT
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      noValidate
      className="glass rounded-3xl p-6 sm:p-10 max-w-xl mx-auto"
    >
      <div className="space-y-5">
        <Field
          label="Name"
          error={touched.name ? errors.name : undefined}
        >
          <input
            id="reg-name"
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Your full name"
            className={inputClass(Boolean(touched.name) && Boolean(errors.name))}
            aria-invalid={touched.name && !!errors.name}
          />
        </Field>

        <Field label="Email Address" error={touched.email ? errors.email : undefined}>
          <input
            id="reg-email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@example.com"
            className={inputClass(Boolean(touched.email) && Boolean(errors.email))}
            aria-invalid={touched.email && !!errors.email}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Department" error={touched.department ? errors.department : undefined}>
            <select
              id="reg-department"
              value={data.department}
              onChange={(e) => handleChange("department", e.target.value)}
              onBlur={() => handleBlur("department")}
              className={inputClass(Boolean(touched.department) && Boolean(errors.department))}
              aria-invalid={touched.department && !!errors.department}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Section" error={touched.section ? errors.section : undefined}>
            <select
              id="reg-section"
              value={data.section}
              onChange={(e) => handleChange("section", e.target.value)}
              onBlur={() => handleBlur("section")}
              className={inputClass(Boolean(touched.section) && Boolean(errors.section))}
              aria-invalid={touched.section && !!errors.section}
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Year" error={touched.year ? errors.year : undefined}>
          <select
            id="reg-year"
            value={data.year}
            onChange={(e) => handleChange("year", e.target.value)}
            onBlur={() => handleBlur("year")}
            className={inputClass(Boolean(touched.year) && Boolean(errors.year))}
            aria-invalid={touched.year && !!errors.year}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </Field>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            role="alert"
          >
            <ShieldAlert size={16} className="mt-0.5 shrink-0" />
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={status !== "submitting" ? { scale: 1.02 } : undefined}
        whileTap={status !== "submitting" ? { scale: 0.98 } : undefined}
        className="mt-8 w-full rounded-full border border-cyan/60 bg-cyan/10 py-3.5 font-mono text-xs sm:text-sm tracking-widest text-cyan shadow-neon hover:bg-cyan/15 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> REGISTERING...
          </>
        ) : (
          "REGISTER NOW"
        )}
      </motion.button>
    </motion.form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`reg-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="block font-mono text-[11px] tracking-widest text-muted mb-2"
      >
        {label.toUpperCase()}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl bg-panel2/80 border px-4 py-3 text-sm text-ink placeholder:text-muted/60",
    "focus:outline-none focus:ring-2 focus:ring-cyan/50 transition-colors",
    hasError ? "border-red-500/60" : "border-line focus:border-cyan/50",
  ].join(" ");
}
