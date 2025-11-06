import EmergencyRegisterForm from "../components/emergencyRegisterForm";

export default function Homepage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to IVS Health</h1>
      </section>
      <EmergencyRegisterForm />
    </main>
  );
}
