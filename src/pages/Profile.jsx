import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-[600px] mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}