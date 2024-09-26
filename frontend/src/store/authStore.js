import { create } from "zustand";

const useAuthStore = create((set) => ({
  user_id: localStorage.getItem("user_id") || null,
  username: localStorage.getItem("username") || null,
  email: localStorage.getItem("email") || null,
  isAdmin: localStorage.getItem("isAdmin") || null,
  isAuthenticated: !!localStorage.getItem("user_id"),

  // Action to log in
  login: (user_id, username, email, isAdmin) => {
    // Save to localStorage
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("isAdmin", isAdmin);

    // Update the store
    set({
      user_id,
      username,
      email,
      isAdmin,
      isAuthenticated: true,
    });
  },

  // Action to log out
  logout: () => {
    // Clear from localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");

    // Update the store
    set({
      user_id: null,
      username: null,
      email: null,
      isAdmin:null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
