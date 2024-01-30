import { supabase } from './supabase';

export const signUp = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signUp({
    email: email,
    password: password,
  });
};

export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
};
