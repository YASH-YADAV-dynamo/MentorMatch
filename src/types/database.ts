export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  bio: string | null;
  role: 'mentor' | 'mentee';
  skills: string[];
  interests: string[];
  created_at: string;
  updated_at: string;
}

export interface MentorshipRequest {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string | null;
  created_at: string;
  updated_at: string;
}