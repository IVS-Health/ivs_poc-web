import type { EmergencyCasePayload } from "../../types/emergencyCase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const emergencyCaseService = {
  registerNewCase: async (payload: EmergencyCasePayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency-cases/newCase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to register case. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in registerNewCase:", error);
      throw error;
    }
  },

  getAllCases: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency-cases/allCases`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cases. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in getAllCases:", error);
      throw error;
    }
  },
};
