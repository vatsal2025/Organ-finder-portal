
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const ORGANS = ['Heart', 'Lungs', 'Kidneys', 'Liver', 'Pancreas', 'Intestine'];

export const IDENTITY_PROOFS = ['Passport', 'Driver\'s License', 'National ID', 'Social Security Card'];

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  // Simple validation for phone numbers - at least 10 digits
  const re = /^\d{10,15}$/;
  return re.test(phone.replace(/\D/g, ''));
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showErrorToast(message: string) {
  toast.error(message);
}

export type FormData = {
  registrationNumber: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | '';
  requiredOrgans: string[];
  bloodGroup: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  identityProof: string;
  identityNumber: string;
  emergencyContact: string;
  witness1: {
    firstName: string;
    lastName: string;
    identityProof: string;
    identityNumber: string;
    mobile: string;
  };
  witness2: {
    firstName: string;
    lastName: string;
    identityProof: string;
    identityNumber: string;
    mobile: string;
  };
};

export const initialFormData: FormData = {
  registrationNumber: '',
  firstName: '',
  lastName: '',
  gender: '',
  requiredOrgans: [],
  bloodGroup: '',
  email: '',
  mobile: '',
  address: '',
  city: '',
  state: '',
  identityProof: '',
  identityNumber: '',
  emergencyContact: '',
  witness1: {
    firstName: '',
    lastName: '',
    identityProof: '',
    identityNumber: '',
    mobile: ''
  },
  witness2: {
    firstName: '',
    lastName: '',
    identityProof: '',
    identityNumber: '',
    mobile: ''
  }
};
