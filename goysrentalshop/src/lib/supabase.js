import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://rgyavnhcuxlqhxtwkbsm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneWF2bmhjdXhscWh4dHdrYnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTQwNTcsImV4cCI6MjA2MDYzMDA1N30.dU8mulVSonF_6ptxQSR-7mfx8FvQ2EgPiGH04WAhfyo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch data from 'todos' table testing 
export  async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*');
    console.log(data)
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Todos:', data);

  }
}
export const registerUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) throw error;
  
      return { user: data.user, session: data.session };
    } catch (err) {
      return { error: err.message };
    }
  };
  export const loginUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw error;
  
      return { user: data.user, session: data.session };
    } catch (err) {
      return { error: err.message };
    }
  };

  export const insertBooking = async ({ car_name, user_name, contact, start_date, end_date, rate_price}) => {
    try {
      const { data, error } = await supabase.from('book').insert([
        {
          car_name,
          user_name,
          contact,
          start_date,
          end_date,
          rate_price,
        },
      ]);
  
      if (error) throw error;
      return { data };
    } catch (error) {
      return { error: error.message };
    }
  };