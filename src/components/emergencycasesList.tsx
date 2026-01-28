import { useEffect } from "react";
import { notificationService } from "../api/services/notificationService";
import type { EmergencyCasePayload } from "../types/emergencyCase";
import { filteredCasesByIdDecending } from "../utils/filters";

type Props = {
  allCases: EmergencyCasePayload[];
  refreshCases: () => Promise<void>;
};

export default function EmergencyCasesList({ allCases, refreshCases }: Props) {
  const filters = { id: undefined };
  const filteredCases = filteredCasesByIdDecending({ allCases, filters });

  console.log("case", filteredCases);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshCases().catch((err) =>
        console.error("Failed to refresh cases:", err)
      );
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [refreshCases]);

  async function handleSendNotification(caseId: string | undefined) {
    try {
      await notificationService.sendNotificationToHealthWorker(
        caseId ? parseInt(caseId) : 0
      );
      alert("Notification sent successfully");
      await refreshCases(); // Refresh after action
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert("Failed to send notification. Check console for details.");
    }
  }

  async function handleCancelCase(caseId: string | undefined) {
    try {
      await notificationService.cancelCase(caseId ? parseInt(caseId) : 0);
      alert("Case cancelled successfully");
      await refreshCases(); // Refresh after action
    } catch (error) {
      console.error("Failed to cancel case:", error);
      alert("Failed to cancel case. Check console for details.");
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full overflow-y-auto max-h-[90vh]">
      <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Emergency Cases
      </h3>
      <ul>
        {filteredCases.map((emergencyCase) => {
          // Determine button states
          const sendDisabled =
            emergencyCase.status !== "open" ||
            ["sent", "accepted"].includes(emergencyCase.status);

          const cancelDisabled = ["completed", "cancelled"].includes(
            emergencyCase.status
          );

          return (
            <li
              key={emergencyCase.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
            >
              <h4 className="text-lg font-semibold mb-2">
                Case ID: {emergencyCase.id}
              </h4>
              <p>
                <strong>Location:</strong> {emergencyCase.location}
              </p>
              <p>
                <strong>Call Back Number:</strong>{" "}
                {emergencyCase.callBackNumber}
              </p>
              <p>
                <strong>Nature Of Emergency:</strong>{" "}
                {emergencyCase.natureOfEmergency}
              </p>
              <p>
                <strong>Patient Condition:</strong>{" "}
                {emergencyCase.patientCondition}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    emergencyCase.status === "open"
                      ? "text-green-600"
                      : emergencyCase.status === "assigned"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {emergencyCase.status.toUpperCase()}
                </span>
              </p>
              <p>
                <strong>Assigned To:</strong>{" "}
                {emergencyCase.assignedTo?.email || "Not Assigned"}
              </p>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className={`border px-3 py-1 rounded ${
                    sendDisabled
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-blue-500 text-blue-600 hover:bg-blue-100"
                  }`}
                  disabled={sendDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendNotification(emergencyCase.id);
                  }}
                >
                  Send Notification
                </button>
                <button
                  type="button"
                  className={`border px-3 py-1 rounded ${
                    cancelDisabled
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-red-500 text-red-600 hover:bg-red-100"
                  }`}
                  disabled={cancelDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCancelCase(emergencyCase.id);
                  }}
                >
                  Cancel Case
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
