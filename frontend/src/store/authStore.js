import axios from "axios";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user_id: localStorage.getItem("user_id") || null,
  username: localStorage.getItem("username") || null,
  email: localStorage.getItem("email") || null,
  isAdmin: localStorage.getItem("isAdmin") || null,
  isAuthenticated: !!localStorage.getItem("user_id"),

  // Company details
  companyName: null,
  companyLogo: null,

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
      isAdmin: null,
      isAuthenticated: false,
    });
  },

  // Action to load company data
  loadCompanyData: async () => {
    try {
      console.log("loading system component")
      const { data } = await axios.get("/api/systemSetting");
      set({
        companyName: data.name,
        companyLogo: data.logoUrl,
      });
    } catch (error) {
      console.error("Failed to load company data:", error);
    }
  },
}));

export default useAuthStore;
