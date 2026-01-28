export interface EmergencyCasePayload {
  id?: string;
  location: string;
  callBackNumber: string;
  natureOfEmergency: string;
  patientCondition: string;
  status: string;
  assignedTo?: UserPayload;
}

export type UserPayload = {
  id: number;
  name: string;
  email: string;
  age?: number;
  medicalSpecialty?: string;
};
