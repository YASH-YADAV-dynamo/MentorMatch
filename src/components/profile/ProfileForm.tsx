import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface ProfileFormData {
  full_name: string;
  bio: string;
  role: 'mentor' | 'mentee';
  skills: string[];
  interests: string[];
}

export default function ProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [formData, setFormData] = React.useState<ProfileFormData>({
    full_name: '',
    bio: '',
    role: 'mentee',
    skills: [],
    interests: [],
  });

  React.useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      navigate('/discovery');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setFormData(prev => ({ ...prev, interests }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        id="full_name"
        type="text"
        value={formData.full_name}
        onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
        required
      />

      <TextArea
        label="Bio"
        id="bio"
        value={formData.bio}
        onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
        rows={4}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="mentee"
              checked={formData.role === 'mentee'}
              onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as 'mentee' | 'mentor' }))}
              className="form-radio"
            />
            <span className="ml-2">Mentee</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="mentor"
              checked={formData.role === 'mentor'}
              onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as 'mentee' | 'mentor' }))}
              className="form-radio"
            />
            <span className="ml-2">Mentor</span>
          </label>
        </div>
      </div>

      <Input
        label="Skills (comma-separated)"
        id="skills"
        type="text"
        value={formData.skills.join(', ')}
        onChange={handleSkillsChange}
        placeholder="e.g., JavaScript, React, Node.js"
      />

      <Input
        label="Interests (comma-separated)"
        id="interests"
        type="text"
        value={formData.interests.join(', ')}
        onChange={handleInterestsChange}
        placeholder="e.g., Web Development, Machine Learning, UI Design"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}