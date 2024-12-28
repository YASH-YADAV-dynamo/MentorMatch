import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/forms/AuthForm';

export default function Login() {
  const { signIn } = useAuth();

  return (
    <div className="h-fit overflow-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 m-2">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="text-center relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          </div>
          
          <h1 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-3 text-base text-blue-700/80">
            Sign in to continue your mentorship journey
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-inner">
            <AuthForm 
              type="login" 
              onSubmit={signIn}
            />
          </div>
        </div>

        <div className="mt-6 text-center space-y-3">
          <p className="text-blue-700/80">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 border-b border-transparent hover:border-blue-700"
            >
              Sign up
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