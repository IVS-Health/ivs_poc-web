const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const notificationService = {
  sendNotificationToHealthWorker: async (caseId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to send notification. Status: ${response.status}`
        );
      }

      const data = await response.json();

      const results = data.results ?? [];

      results.forEach((result: any) => {
        console.log("FCM success:", result.success);
      });

      const failedTokens = results.filter(
        (r: { success: boolean }) => !r.success
      );

      if (failedTokens.length > 0) {
        throw new Error(
          `Failed to send to ${failedTokens.length} tokens for caseId: ${caseId}`
        );
      }

      return {
        message: data.message,
        caseStatus: data.caseStatus,
      };
    } catch (error) {
      console.error("Error in sendNotificationToHealthWorker:", error);
      throw error;
    }
  },

  cancelCase: async (caseId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/emergency-cases/cancelCase`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caseId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to close case. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in closeCase:", error);
      throw error;
    }
  },
};
