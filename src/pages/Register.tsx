import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/forms/AuthForm';
import { CheckCircle, XCircle } from 'lucide-react';

export default function Register() {
  const { signUp } = useAuth();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signUp(email, password);
      setIsSuccess(true);
      setMessage('Check your Gmail and verify your Gmail.');
    } catch (error) {
      setIsSuccess(false);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="h-fit overflow-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 m-2">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="text-center relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          </div>
          
          <h1 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-3 text-base text-blue-700/80">
            Join our mentorship community today
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-inner">
            <AuthForm 
              type="register" 
              onSubmit={handleSignUp}
            />
          </div>
        </div>

        {message && (
          <div className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-lg ${
            isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <p className="text-sm font-medium">
              {message}
            </p>
          </div>
        )}

        <div className="mt-6 text-center space-y-3">
          <p className="text-blue-700/80">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 border-b border-transparent hover:border-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 group transition-colors duration-300"
          >
            <span className="border-b border-transparent group-hover:border-blue-700">Back to home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}