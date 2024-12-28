import React from 'react';
import type { Profile } from '../../types/database';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface UserCardProps {
  profile: Profile;
  onRequestSent: () => void;
}

export default function UserCard({ profile, onRequestSent }: UserCardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const sendRequest = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('mentorship_requests')
        .insert({
          mentor_id: profile.role === 'mentor' ? profile.id : user.id,
          mentee_id: profile.role === 'mentee' ? profile.id : user.id,
        });

      if (error) throw error;
      onRequestSent();
    } catch (err) {
      console.error('Error sending request:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{profile.full_name}</h3>
      <div className="mb-2">
        <span className="inline-block px-2 py-1 text-sm font-semibold text-white rounded-full bg-blue-600">
          {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
        </span>
      </div>
      {profile.bio && <p className="text-gray-600 mb-4">{profile.bio}</p>}
      
      {profile.skills.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.interests.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={sendRequest}
        disabled={loading}
        className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Sending Request...' : 'Send Mentorship Request'}
      </button>
    </div>
  );
}