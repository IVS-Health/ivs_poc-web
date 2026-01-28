import { useState } from "react";
import { emergencyCaseService } from "../api/services/emergencyCaseService";

type Props = {
  onCaseRegistered: () => Promise<void>;
};

export default function emergencyRegisterForm({ onCaseRegistered }: Props) {
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
      onCaseRegistered();
    } catch (error) {
      console.error("Error registering new case:", error);
      window.alert("Failed to register case");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerNewCase();
        }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full space-y-6 w-[500px]"
      >
        <h3 className="text-2xl font-semibold text-center text-gray-800">
          Emergency Case Registration
        </h3>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Call Back Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Call Back Number
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={callBackNumber}
            onChange={(e) => setCallBackNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Nature of Emergency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nature of Emergency
          </label>
          <input
            type="text"
            placeholder="Describe the emergency"
            value={natureOfEmergency}
            onChange={(e) => setNatureOfEmergency(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Patient Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Condition
          </label>
          <input
            type="text"
            placeholder="Describe patient condition"
            value={patientCondition}
            onChange={(e) => setPatientCondition(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
