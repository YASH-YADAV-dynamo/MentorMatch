import ProfileForm from '../components/profile/ProfileForm';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="min-h-fit m-5 bg-gradient-to-br from-blue-50 via-blue-100 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 relative">
          <div className="text-center m-5">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className="mt-2 text-blue-700/80">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="bg-white/50 rounded-lg p-6 shadow-inner">
              <ProfileForm />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-blue-700/80">
          <p>Need help updating your profile?{' '}
            <Link 
              to="/support" 
              className="text-blue-600 hover:text-blue-700 transition-colors duration-300 border-b border-transparent hover:border-blue-700"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}