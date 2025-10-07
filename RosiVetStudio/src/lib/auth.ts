import { supabase } from "./supabase";
import type { LoginValues, RegisterValues } from "./validators/auth";

export interface AuthUser {
  id: string;
  email: string;
  nome: string;
  cognome: string;
  role: "admin" | "user";
}

export interface AuthError {
  message: string;
  code?: string;
}

// Login function
export async function loginUser(
  credentials: LoginValues
): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    if (!supabase) {
      return { user: null, error: { message: "Supabase client not initialized" } };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { user: null, error: { message: error.message, code: error.message } };
    }

    if (!data.user) {
      return { user: null, error: { message: "Login failed" } };
    }

    // Get user profile from our users table
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("id, email, nome, cognome, role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !userProfile) {
      return { user: null, error: { message: "User profile not found" } };
    }

    return {
      user: {
        id: userProfile.id,
        email: userProfile.email,
        nome: userProfile.nome,
        cognome: userProfile.cognome,
        role: userProfile.role as "admin" | "user",
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: { message: "An unexpected error occurred" },
    };
  }
}

// Register function
export async function registerUser(
  userData: RegisterValues
): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    if (!supabase) {
      return { user: null, error: { message: "Supabase client not initialized" } };
    }

    // First, sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      return { user: null, error: { message: authError.message } };
    }

    if (!authData.user) {
      return { user: null, error: { message: "Registration failed" } };
    }

    // Wait a moment for the auth session to be established
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create user profile using the secure function
    const { data: userProfile, error: profileError } = await supabase.rpc("create_user_profile", {
      user_id: authData.user.id,
      user_email: userData.email,
      user_nome: userData.nome,
      user_cognome: userData.cognome,
      user_data_nascita: userData.dataNascita.toISOString().split("T")[0],
      user_sesso: userData.sesso,
      user_role: "user",
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return {
        user: null,
        error: { message: `Failed to create user profile: ${profileError.message}` },
      };
    }

    // Check if the function returned an error
    if (userProfile && userProfile.error) {
      return {
        user: null,
        error: { message: `Failed to create user profile: ${userProfile.message}` },
      };
    }

    return {
      user: {
        id: userProfile.id,
        email: userProfile.email,
        nome: userProfile.nome,
        cognome: userProfile.cognome,
        role: userProfile.role as "admin" | "user",
      },
      error: null,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      user: null,
      error: { message: "An unexpected error occurred" },
    };
  }
}

// Logout function
export async function logoutUser(): Promise<{ error: AuthError | null }> {
  try {
    if (!supabase) {
      return { error: { message: "Supabase client not initialized" } };
    }

    const { error } = await supabase.auth.signOut();
    return { error: error ? { message: error.message } : null };
  } catch (error) {
    return { error: { message: "Logout failed" } };
  }
}

// Get current user
export async function getCurrentUser(): Promise<{
  user: AuthUser | null;
  error: AuthError | null;
}> {
  try {
    if (!supabase) {
      return { user: null, error: { message: "Supabase client not initialized" } };
    }

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return { user: null, error: null };
    }

    // Get user profile from our users table
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("id, email, nome, cognome, role")
      .eq("id", authUser.id)
      .single();

    if (profileError || !userProfile) {
      return { user: null, error: { message: "User profile not found" } };
    }

    return {
      user: {
        id: userProfile.id,
        email: userProfile.email,
        nome: userProfile.nome,
        cognome: userProfile.cognome,
        role: userProfile.role as "admin" | "user",
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: { message: "Failed to get current user" },
    };
  }
}

// Google OAuth login
export async function loginWithGoogle(): Promise<{ error: AuthError | null }> {
  try {
    if (!supabase) {
      return { error: { message: "Supabase client not initialized" } };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    return { error: error ? { message: error.message } : null };
  } catch (error) {
    return { error: { message: "Google login failed" } };
  }
}
