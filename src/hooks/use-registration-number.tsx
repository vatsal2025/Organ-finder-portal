
import { useState, useEffect } from 'react';

// Generate a random registration number with format D + 6 digits
export function useRegistrationNumber() {
  const [registrationNumber, setRegistrationNumber] = useState<string>('');

  useEffect(() => {
    // Generate a random 6-digit number
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    // Add timestamp to ensure uniqueness for each new user
    const timestamp = Date.now().toString().slice(-4);
    setRegistrationNumber(`D ${randomDigits}-${timestamp}`);
  }, []);

  return registrationNumber;
}
