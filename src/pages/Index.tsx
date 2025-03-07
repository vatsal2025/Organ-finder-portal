
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Phone, FileText, MapPin, AlertCircle } from 'lucide-react';
import { 
  BLOOD_GROUPS, 
  ORGANS, 
  IDENTITY_PROOFS, 
  STATES, 
  validateEmail, 
  validatePhone, 
  showErrorToast,
  initialFormData,
  type FormData
} from '@/lib/utils';
import { useRegistrationNumber } from '@/hooks/use-registration-number';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const registrationNumber = useRegistrationNumber();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Update registration number when it's generated
  useEffect(() => {
    if (registrationNumber) {
      setFormData(prev => ({ ...prev, registrationNumber }));
    }
  }, [registrationNumber]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Patient details validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender selection is required";
    if (formData.requiredOrgans.length === 0) newErrors.requiredOrgans = "Please select at least one organ";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validatePhone(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State selection is required";
    if (!formData.identityProof) newErrors.identityProof = "Identity proof selection is required";
    if (!formData.identityNumber.trim()) newErrors.identityNumber = "Identity number is required";
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    } else if (!validatePhone(formData.emergencyContact)) {
      newErrors.emergencyContact = "Please enter a valid emergency contact number";
    }
    
    // Witness 1 validation
    if (!formData.witness1.firstName.trim()) newErrors["witness1.firstName"] = "First name is required";
    if (!formData.witness1.lastName.trim()) newErrors["witness1.lastName"] = "Last name is required";
    if (!formData.witness1.identityProof) newErrors["witness1.identityProof"] = "Identity proof selection is required";
    if (!formData.witness1.identityNumber.trim()) newErrors["witness1.identityNumber"] = "Identity number is required";
    
    if (!formData.witness1.mobile.trim()) {
      newErrors["witness1.mobile"] = "Mobile number is required";
    } else if (!validatePhone(formData.witness1.mobile)) {
      newErrors["witness1.mobile"] = "Please enter a valid mobile number";
    }
    
    // Witness 2 validation
    if (!formData.witness2.firstName.trim()) newErrors["witness2.firstName"] = "First name is required";
    if (!formData.witness2.lastName.trim()) newErrors["witness2.lastName"] = "Last name is required";
    if (!formData.witness2.identityProof) newErrors["witness2.identityProof"] = "Identity proof selection is required";
    if (!formData.witness2.identityNumber.trim()) newErrors["witness2.identityNumber"] = "Identity number is required";
    
    if (!formData.witness2.mobile.trim()) {
      newErrors["witness2.mobile"] = "Mobile number is required";
    } else if (!validatePhone(formData.witness2.mobile)) {
      newErrors["witness2.mobile"] = "Please enter a valid mobile number";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      showErrorToast("Please correct the errors in the form");
      return false;
    }
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        if (parent === 'witness1' || parent === 'witness2') {
          return {
            ...prev,
            [parent]: {
              ...prev[parent as keyof FormData] as Record<string, unknown>,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        if (parent === 'witness1' || parent === 'witness2') {
          return {
            ...prev,
            [parent]: {
              ...prev[parent as keyof FormData] as Record<string, unknown>,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value as 'Male' | 'Female' }));
  };

  const handleOrganChange = (organName: string, checked: boolean) => {
    setFormData(prev => {
      const currentOrgans = [...prev.requiredOrgans];
      
      if (checked) {
        // Add the organ if it's not already in the array
        if (!currentOrgans.includes(organName)) {
          return { ...prev, requiredOrgans: [...currentOrgans, organName] };
        }
      } else {
        // Remove the organ if it's in the array
        return { 
          ...prev, 
          requiredOrgans: currentOrgans.filter(organ => organ !== organName) 
        };
      }
      
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Navigate to confirmation page with form data
      navigate('/confirmation', { state: formData });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="h-14 w-14 mx-auto mb-4 heart-icon" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Organ Requirement Form</h1>
          <p className="text-lg text-gray-600">
            Submit your organ requirement details to connect with hospitals
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-section col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Registration Information</h2>
                </div>
                <div>
                  <Label htmlFor="registrationNumber" className="label-text">Registration No.</Label>
                  <Input 
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="form-section">
                <Label htmlFor="firstName" className="label-text">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-red-500" : ""}
                  placeholder="Enter first name"
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="lastName" className="label-text">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-red-500" : ""}
                  placeholder="Enter last name"
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label className="label-text">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={handleGenderChange}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.gender}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label className="label-text">
                  Required Organs <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {ORGANS.map((organ) => (
                    <div key={organ} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`organ-${organ}`}
                        checked={formData.requiredOrgans.includes(organ)}
                        onCheckedChange={(checked) => handleOrganChange(organ, checked as boolean)}
                      />
                      <Label htmlFor={`organ-${organ}`}>{organ}</Label>
                    </div>
                  ))}
                </div>
                {errors.requiredOrgans && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.requiredOrgans}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="bloodGroup" className="label-text">
                  Blood Group <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.bloodGroup} 
                  onValueChange={(value) => handleSelectChange(value, 'bloodGroup')}
                >
                  <SelectTrigger id="bloodGroup" className={errors.bloodGroup ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_GROUPS.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bloodGroup && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.bloodGroup}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="email" className="label-text">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="mobile" className="label-text">
                  Mobile No <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.mobile ? "border-red-500" : ""}`}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                {errors.mobile && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.mobile}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label htmlFor="address" className="label-text">
                  Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`pl-10 min-h-[100px] ${errors.address ? "border-red-500" : ""}`}
                    placeholder="Enter your full address"
                    required
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.address}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="city" className="label-text">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "border-red-500" : ""}
                  placeholder="Enter city"
                  required
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.city}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="state" className="label-text">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => handleSelectChange(value, 'state')}
                >
                  <SelectTrigger id="state" className={errors.state ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.state}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="identityProof" className="label-text">
                  Identity Proof <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.identityProof} 
                  onValueChange={(value) => handleSelectChange(value, 'identityProof')}
                >
                  <SelectTrigger id="identityProof" className={errors.identityProof ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Identity Proof" />
                  </SelectTrigger>
                  <SelectContent>
                    {IDENTITY_PROOFS.map((proof) => (
                      <SelectItem key={proof} value={proof}>
                        {proof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.identityProof && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.identityProof}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="identityNumber" className="label-text">
                  Identity Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="identityNumber"
                  name="identityNumber"
                  value={formData.identityNumber}
                  onChange={handleInputChange}
                  className={errors.identityNumber ? "border-red-500" : ""}
                  placeholder="Enter identity number"
                  required
                />
                {errors.identityNumber && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.identityNumber}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label htmlFor="emergencyContact" className="label-text">
                  Emergency Contact No. <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.emergencyContact ? "border-red-500" : ""}`}
                    placeholder="Enter emergency contact number"
                    required
                  />
                </div>
                {errors.emergencyContact && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.emergencyContact}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Witness 1 Details */}
          <div className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-section col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Witness 1 Details</h2>
                </div>
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness1.firstName" className="label-text">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness1.firstName"
                  name="witness1.firstName"
                  value={formData.witness1.firstName}
                  onChange={handleInputChange}
                  className={errors["witness1.firstName"] ? "border-red-500" : ""}
                  placeholder="Enter first name"
                  required
                />
                {errors["witness1.firstName"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness1.firstName"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness1.lastName" className="label-text">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness1.lastName"
                  name="witness1.lastName"
                  value={formData.witness1.lastName}
                  onChange={handleInputChange}
                  className={errors["witness1.lastName"] ? "border-red-500" : ""}
                  placeholder="Enter last name"
                  required
                />
                {errors["witness1.lastName"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness1.lastName"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness1.identityProof" className="label-text">
                  Identity Proof <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.witness1.identityProof} 
                  onValueChange={(value) => handleSelectChange(value, 'witness1.identityProof')}
                >
                  <SelectTrigger 
                    id="witness1.identityProof" 
                    className={errors["witness1.identityProof"] ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Identity Proof" />
                  </SelectTrigger>
                  <SelectContent>
                    {IDENTITY_PROOFS.map((proof) => (
                      <SelectItem key={proof} value={proof}>
                        {proof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["witness1.identityProof"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness1.identityProof"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness1.identityNumber" className="label-text">
                  Identity Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness1.identityNumber"
                  name="witness1.identityNumber"
                  value={formData.witness1.identityNumber}
                  onChange={handleInputChange}
                  className={errors["witness1.identityNumber"] ? "border-red-500" : ""}
                  placeholder="Enter identity number"
                  required
                />
                {errors["witness1.identityNumber"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness1.identityNumber"]}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label htmlFor="witness1.mobile" className="label-text">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="witness1.mobile"
                    name="witness1.mobile"
                    value={formData.witness1.mobile}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors["witness1.mobile"] ? "border-red-500" : ""}`}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                {errors["witness1.mobile"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness1.mobile"]}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Witness 2 Details */}
          <div className="form-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-section col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Witness 2 Details</h2>
                </div>
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness2.firstName" className="label-text">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness2.firstName"
                  name="witness2.firstName"
                  value={formData.witness2.firstName}
                  onChange={handleInputChange}
                  className={errors["witness2.firstName"] ? "border-red-500" : ""}
                  placeholder="Enter first name"
                  required
                />
                {errors["witness2.firstName"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness2.firstName"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness2.lastName" className="label-text">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness2.lastName"
                  name="witness2.lastName"
                  value={formData.witness2.lastName}
                  onChange={handleInputChange}
                  className={errors["witness2.lastName"] ? "border-red-500" : ""}
                  placeholder="Enter last name"
                  required
                />
                {errors["witness2.lastName"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness2.lastName"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness2.identityProof" className="label-text">
                  Identity Proof <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.witness2.identityProof} 
                  onValueChange={(value) => handleSelectChange(value, 'witness2.identityProof')}
                >
                  <SelectTrigger 
                    id="witness2.identityProof" 
                    className={errors["witness2.identityProof"] ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Identity Proof" />
                  </SelectTrigger>
                  <SelectContent>
                    {IDENTITY_PROOFS.map((proof) => (
                      <SelectItem key={proof} value={proof}>
                        {proof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["witness2.identityProof"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness2.identityProof"]}
                  </p>
                )}
              </div>
              
              <div className="form-section">
                <Label htmlFor="witness2.identityNumber" className="label-text">
                  Identity Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="witness2.identityNumber"
                  name="witness2.identityNumber"
                  value={formData.witness2.identityNumber}
                  onChange={handleInputChange}
                  className={errors["witness2.identityNumber"] ? "border-red-500" : ""}
                  placeholder="Enter identity number"
                  required
                />
                {errors["witness2.identityNumber"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness2.identityNumber"]}
                  </p>
                )}
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <Label htmlFor="witness2.mobile" className="label-text">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                  <Input
                    id="witness2.mobile"
                    name="witness2.mobile"
                    value={formData.witness2.mobile}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors["witness2.mobile"] ? "border-red-500" : ""}`}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                {errors["witness2.mobile"] && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors["witness2.mobile"]}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button type="submit" className="button-primary w-full md:w-64 py-6">
              <Heart className="h-5 w-5 mr-2" />
              Submit Organ Requirement
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
