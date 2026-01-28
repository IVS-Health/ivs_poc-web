import { useEffect, useState } from "react";
import EmergencyRegisterForm from "../components/emergencyRegisterForm";
import EmergencyCasesList from "../components/emergencycasesList";
import type { EmergencyCasePayload } from "../types/emergencyCase";
import { emergencyCaseService } from "../api/services/emergencyCaseService";

export default function Homepage() {
  const [allCases, setAllCases] = useState<EmergencyCasePayload[]>([]);

  const fetchCases = async () => {
    try {
      const data = await emergencyCaseService.getAllCases();
      setAllCases(data.cases || []);
    } catch (error) {
      console.error("Error fetching cases", error);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-8 w-screen">
      <div className="w-full max-w-6xl flex gap-8">
        <div className="flex-1">
          <EmergencyRegisterForm onCaseRegistered={fetchCases} />
        </div>
        <div className="flex-1">
          <EmergencyCasesList allCases={allCases} refreshCases={fetchCases} />
        </div>
      </div>
    </main>
  );
}
