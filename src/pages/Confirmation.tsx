
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, ArrowLeft, Phone, Mail, MapPin, File, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type FormData } from '@/lib/utils';
import { showSuccessToast } from '@/lib/utils';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state as FormData | undefined;
  
  useEffect(() => {
    // If no form data was passed, redirect to the home page
    if (!formData) {
      navigate('/', { replace: true });
      return;
    }
    
    // Show success toast when the page loads
    showSuccessToast('Organ requirement submitted successfully!');
  }, [formData, navigate]);
  
  // If no form data was passed, don't render anything (we'll redirect)
  if (!formData) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse-soft"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Request Submitted</h1>
          <p className="text-lg text-gray-600 mb-4">
            Your organ requirement has been submitted successfully
          </p>
          <div className="py-1 px-4 bg-blue-100 text-blue-800 rounded-full inline-flex items-center">
            <span className="font-medium">Registration No:</span>
            <span className="ml-2">{formData.registrationNumber}</span>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Patient Information */}
          <div className="form-card">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Patient Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="form-section">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{formData.gender}</p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{formData.bloodGroup}</p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500">Required Organs</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.requiredOrgans.map((organ) => (
                    <span 
                      key={organ} 
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {organ}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-3 w-3" /> Email
                </p>
                <p className="font-medium">{formData.email}</p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="h-3 w-3" /> Mobile
                </p>
                <p className="font-medium">{formData.mobile}</p>
              </div>
              
              <div className="form-section col-span-1 md:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Address
                </p>
                <p className="font-medium">
                  {formData.address}, {formData.city}, {formData.state}
                </p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <File className="h-3 w-3" /> Identity
                </p>
                <p className="font-medium">{formData.identityProof}: {formData.identityNumber}</p>
              </div>
              
              <div className="form-section">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="h-3 w-3" /> Emergency Contact
                </p>
                <p className="font-medium">{formData.emergencyContact}</p>
              </div>
            </div>
          </div>
          
          {/* Witness Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Witness 1 */}
            <div className="form-card mb-0">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Witness 1</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{formData.witness1.firstName} {formData.witness1.lastName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <File className="h-3 w-3" /> Identity
                  </p>
                  <p className="font-medium">{formData.witness1.identityProof}: {formData.witness1.identityNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Mobile
                  </p>
                  <p className="font-medium">{formData.witness1.mobile}</p>
                </div>
              </div>
            </div>
            
            {/* Witness 2 */}
            <div className="form-card mb-0">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Witness 2</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{formData.witness2.firstName} {formData.witness2.lastName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <File className="h-3 w-3" /> Identity
                  </p>
                  <p className="font-medium">{formData.witness2.identityProof}: {formData.witness2.identityNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> Mobile
                  </p>
                  <p className="font-medium">{formData.witness2.mobile}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Card */}
          <div className="glass-card bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-green-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Request Status</h3>
                <p className="text-green-700">
                  Your request has been successfully registered. Hospitals will be notified of your requirement.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/')}
              variant="outline" 
              className="button-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
