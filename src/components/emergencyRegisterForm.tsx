import { useState } from "react";
import { emergencyCaseService } from "../api/services/emergencyCaseService";

export default function emergencyRegisterForm() {
  const [location, setLocation] = useState<string>("");
  const [callBackNumber, setCallBackNumber] = useState<string>("");
  const [natureOfEmergency, setNatureOfEmergency] = useState<string>("");
  const [patientCondition, setPatientCondition] = useState<string>("");

  const registerNewCase = async () => {
    const payload = {
      location,
      callBackNumber,
      natureOfEmergency,
      patientCondition,
    };

    try {
      await emergencyCaseService.registerNewCase(payload);
      window.alert("Case registered successfully");
      setLocation("");
      setCallBackNumber("");
      setNatureOfEmergency("");
      setPatientCondition("");
      //   setOpenRegisterDialogBox(false);
    } catch (error) {
      console.error("Error registering new case:", error);
      window.alert("Failed to register case");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerNewCase();
        }}
      >
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Call Back Number"
          value={callBackNumber}
          onChange={(e) => setCallBackNumber(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Nature Of Emergency"
          value={natureOfEmergency}
          onChange={(e) => setNatureOfEmergency(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="patient Condition"
          value={patientCondition}
          onChange={(e) => setPatientCondition(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
