
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const ORGANS = ['Heart', 'Lungs', 'Kidneys', 'Liver', 'Pancreas', 'Intestine'];

export const IDENTITY_PROOFS = ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID', 'Driving License'];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh'
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada', 'Tirupati', 'Rajahmundry', 'Kadapa', 'Anantapur'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Namsai', 'Tawang', 'Bomdila', 'Aalo', 'Tezu', 'Ziro', 'Roing'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Karimganj', 'Sivasagar', 'Diphu'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Arrah', 'Biharsharif', 'Begusarai', 'Katihar', 'Munger'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Ambikapur', 'Dhamtari', 'Raigarh'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Canacona', 'Cuncolim', 'Curchorem', 'Quepem'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Dharamshala', 'Solan', 'Kullu', 'Palampur', 'Baddi', 'Nahan', 'Chamba', 'Hamirpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Phusro', 'Chirkunda'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam', 'Malappuram'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Kakching', 'Ukhrul', 'Churachandpur', 'Senapati', 'Tamenglong', 'Chandel', 'Jiribam'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Baghmara', 'Williamnagar', 'Resubelpara', 'Khliehriat', 'Mawkyrwat', 'Nongpoh'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saitual', 'Khawzawl', 'Hnahthial', 'Mamit', 'Lawngtlai'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Mon', 'Peren', 'Kiphire'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot', 'Hoshiarpur', 'Batala', 'Moga'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Bhilwara', 'Sikar', 'Sri Ganganagar'],
  'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Rangpo', 'Singtam', 'Jorethang', 'Naya Bazar', 'Ravangla', 'Chungthang'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar', 'Ambassa', 'Belonia', 'Khowai', 'Teliamura', 'Sabroom', 'Amarpur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Meerut', 'Varanasi', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Ramnagar', 'Pithoragarh', 'Kotdwar'],
  'West Bengal': ['Kolkata', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Jalpaiguri', 'Kharagpur'],
  'Delhi': ['New Delhi', 'Delhi', 'Najafgarh', 'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri', 'Vasant Kunj', 'Saket', 'Karol Bagh'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Kathua', 'Sopore', 'Udhampur', 'Poonch', 'Kupwara', 'Pulwama'],
  'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Zanskar', 'Drass', 'Sankoo', 'Khaltse', 'Shey', 'Chuchot', 'Nyoma'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe', 'Villianur', 'Ozhukarai', 'Ariyankuppam', 'Bahour', 'Mannadipet', 'Nettapakkam'],
  'Chandigarh': ['Chandigarh', 'Manimajra', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar', 'Mullanpur', 'Dera Bassi', 'Kurali', 'Banur']
};

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  // Simple validation for phone numbers - at least 10 digits
  const re = /^\d{10,15}$/;
  return re.test(phone.replace(/\D/g, ''));
}

export function validateName(name: string): boolean {
  // Name should only contain alphabets (no spaces, numbers, or special characters)
  const re = /^[a-zA-Z]+$/;
  return re.test(name);
}

// Identity proof validation functions
export function validateAadhaar(aadhaar: string): boolean {
  // Aadhaar is a 12-digit number
  const re = /^\d{12}$/;
  return re.test(aadhaar.replace(/\D/g, ''));
}

export function validatePAN(pan: string): boolean {
  // PAN is a 10-character alphanumeric string in format ABCDE1234F
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return re.test(pan.toUpperCase());
}

export function validatePassport(passport: string): boolean {
  // Indian passport is typically 8 characters - letter followed by 7 digits
  const re = /^[A-Z]{1}[0-9]{7}$/;
  return re.test(passport.toUpperCase());
}

export function validateVoterID(voterId: string): boolean {
  // Voter ID in India typically has 10 characters
  const re = /^[A-Z]{3}[0-9]{7}$/;
  return re.test(voterId.toUpperCase());
}

export function validateDrivingLicense(license: string): boolean {
  // Driving license varies by state but typically has 15 alphanumeric characters
  const re = /^[A-Z0-9]{9,16}$/;
  return re.test(license.toUpperCase());
}

// Function to validate identity number based on selected ID proof
export function validateIdentityNumber(idType: string, idNumber: string): { isValid: boolean; errorMessage: string } {
  if (!idNumber.trim()) {
    return { isValid: false, errorMessage: "Identity number is required" };
  }

  switch (idType) {
    case 'Aadhaar Card':
      return {
        isValid: validateAadhaar(idNumber),
        errorMessage: "Aadhaar must be a 12-digit number"
      };
    case 'PAN Card':
      return {
        isValid: validatePAN(idNumber),
        errorMessage: "PAN must be in format ABCDE1234F"
      };
    case 'Passport':
      return {
        isValid: validatePassport(idNumber),
        errorMessage: "Passport must be a letter followed by 7 digits, e.g., A1234567"
      };
    case 'Voter ID':
      return {
        isValid: validateVoterID(idNumber),
        errorMessage: "Voter ID must be in format AAA1234567"
      };
    case 'Driving License':
      return {
        isValid: validateDrivingLicense(idNumber),
        errorMessage: "Driving license must be 9-16 alphanumeric characters"
      };
    default:
      return { isValid: true, errorMessage: "" };
  }
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
