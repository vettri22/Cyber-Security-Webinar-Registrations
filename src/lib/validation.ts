export interface RegistrationFormData {
  name: string;
  email: string;
  department: string;
  section: string;
  year: string;
}

export type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(
  field: keyof RegistrationFormData,
  value: string
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!/[a-zA-Z]/.test(trimmed)) return "Please enter a valid name.";
      return undefined;

    case "email":
      if (!trimmed) return "Email address is required.";
      if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid email address.";
      return undefined;

    case "department":
      if (!trimmed) return "Please select your department.";
      return undefined;

    case "section":
      if (!trimmed) return "Please select your section.";
      return undefined;

    case "year":
      if (!trimmed) return "Please select your year.";
      return undefined;

    default:
      return undefined;
  }
}

export function validateForm(data: RegistrationFormData): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(data) as (keyof RegistrationFormData)[]).forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

export function isFormValid(data: RegistrationFormData): boolean {
  return Object.keys(validateForm(data)).length === 0;
}
