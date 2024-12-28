import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, BookOpen, ArrowRight, Star, Trophy, Calendar, Shield } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  const features = [
    { icon: Star, title: "Expert Matching", description: "Our AI-powered algorithm finds the perfect mentor-mentee fit based on goals and expertise" },
    { icon: Trophy, title: "Verified Professionals", description: "All mentors are thoroughly vetted with validated professional experience" },
    { icon: Calendar, title: "Flexible Scheduling", description: "Easy scheduling system to manage your mentorship sessions efficiently" },
    { icon: Shield, title: "Safe Environment", description: "Secure platform with guaranteed confidentiality for all conversations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
            Find Your Perfect Mentorship Match
          </h1>
          <p className="text-xl text-blue-800/80 max-w-2xl mx-auto mb-8">
            Connect with mentors and mentees in your field and accelerate your professional growth
          </p>
          {!user ? (
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5 animate-bounce-right" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 border border-blue-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              to="/discovery"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
            >
              Find Matches <ArrowRight className="ml-2 w-5 h-5 animate-bounce-right" />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white">
            <Users className="w-16 h-16 text-blue-600 mb-6 transform transition-transform hover:rotate-12" />
            <h2 className="text-2xl font-bold mb-4 text-blue-800">For Mentors</h2>
            <p className="text-blue-700/80 mb-6 text-lg">Share your expertise and guide others in their professional journey. Make a lasting impact while building your leadership skills.</p>
            <ul className="space-y-3 text-blue-700/80">
              <li className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                Track mentee progress
              </li>
              <li className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                Build meaningful connections
              </li>
            </ul>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white">
            <BookOpen className="w-16 h-16 text-blue-600 mb-6 transform transition-transform hover:rotate-12" />
            <h2 className="text-2xl font-bold mb-4 text-blue-800">For Mentees</h2>
            <p className="text-blue-700/80 mb-6 text-lg">Learn from experienced professionals and accelerate your growth. Get personalized guidance for your career journey.</p>
            <ul className="space-y-3 text-blue-700/80">
              <li className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                Get expert guidance
              </li>
              <li className="flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-blue-600" />
                Achieve your goals faster
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white group"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4 transform transition-transform group-hover:rotate-12" />
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
                <p className="text-blue-700/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}