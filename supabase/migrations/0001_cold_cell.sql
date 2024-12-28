/*
  # Initial Schema Setup for Mentorship Platform

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - full_name (text)
      - bio (text)
      - role (text - mentor/mentee)
      - skills (text[])
      - interests (text[])
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - mentorship_requests
      - id (uuid, primary key)
      - mentor_id (uuid, references profiles)
      - mentee_id (uuid, references profiles)
      - status (text - pending/accepted/rejected)
      - message (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for profile management
    - Add policies for mentorship requests
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text NOT NULL,
  bio text,
  role text NOT NULL CHECK (role IN ('mentor', 'mentee')),
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create mentorship_requests table
CREATE TABLE mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES profiles NOT NULL,
  mentee_id uuid REFERENCES profiles NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(mentor_id, mentee_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Mentorship requests policies
CREATE POLICY "Users can view their mentorship requests"
  ON mentorship_requests FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id IN (mentor_id, mentee_id)
    )
  );

CREATE POLICY "Users can create mentorship requests"
  ON mentorship_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = mentee_id)
  );

CREATE POLICY "Users can update their mentorship requests"
  ON mentorship_requests FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM profiles WHERE id IN (mentor_id, mentee_id)
    )
  );