import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rgyavnhcuxlqhxtwkbsm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneWF2bmhjdXhscWh4dHdrYnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTQwNTcsImV4cCI6MjA2MDYzMDA1N30.dU8mulVSonF_6ptxQSR-7mfx8FvQ2EgPiGH04WAhfyo";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (email, password, full_name, contact) => {
  try {
    // First, create the user in the auth service
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name, // Store name in the auth metadata
        },
      },
    });

    if (authError) throw authError;

    // If authentication successful, create/update the profile
    if (authData.user) {
      // Insert profile data
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: authData.user.id,
          email: email,
          full_name: full_name,
          contact: contact,
          created_at: new Date().toISOString(),
        },
        {
          onConflict: "id", // In case the profile already exists
        }
      );

      if (profileError) {
        console.error("Error creating profile:", profileError);
        // Note: We don't throw here to avoid preventing account creation if profile update fails
        // In a production app, you might want more sophisticated error handling
      }
    }

    return { user: authData.user, session: authData.session };
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

export const insertBooking = async ({
  car_name,
  user_name,
  contact,
  start_date,
  end_date,
  rate_price,
}) => {
  try {
    const { data, error } = await supabase.from("book").insert([
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

// Function to check if user is an admin
export const checkAdminStatus = async (email) => {
  try {
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;
    return { isAdmin: !!data };
  } catch (error) {
    console.error("Admin check error:", error);
    return { error: error.message };
  }
};

// Get all users (for admin use only)
export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get all bookings (for admin use only)
export const getBookings = async () => {
  try {
    const { data, error } = await supabase
      .from("book")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const { data, error } = await supabase
      .from("book")
      .update({ status })
      .eq("id", bookingId);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
