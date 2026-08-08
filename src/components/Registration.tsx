import RegistrationForm from "./RegistrationForm";

export default function Registration() {
  return (
    <section id="register" className="relative py-24 px-5 sm:px-10">
      <div className="text-center mb-12">
        <p className="eyebrow mb-3">SECURE REGISTRATION</p>
        <h2 className="font-display text-2xl sm:text-4xl font-black text-ink text-neon mb-3">
          REGISTER FOR THE EVENT
        </h2>
        <p className="text-sm sm:text-base text-muted">
          Secure your participation in the Cyber Security Club webinar.
        </p>
      </div>
      <RegistrationForm />
    </section>
  );
}
