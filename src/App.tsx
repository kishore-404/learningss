import  { useState } from "react";
import { getUser, updateUser } from "./Api";

const App = () => {
  // usestate
  const [userId, setUserId] = useState<number | "">("");
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // need to get the userId and pass to the api to GET the user detail
  const handleFetchUser = async () => {
    if (!userId) return alert("Please enter a valid user ID");
    setLoading(true);
    // getUser() api function for GET
    try {                 
      const data = await getUser(Number(userId));
      setUserData(data);
    } catch (err) {
      alert("User not found");
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // using the userID we are update the data using api PUT
  const handleUpdateUser = async () => {
    if (!userId || !userData) return;
    // updateUser() is used to update the data of the specified user
    try {
      await updateUser(Number(userId), userData);
      alert("User updated successfully!");

      // Re-fetch updated user data
      const freshData = await getUser(Number(userId));
      setUserData(freshData);
    } catch (err) {
      alert("Failed to update user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Fetch & Update User</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Enter user ID (1-10)"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleFetchUser}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </div>

        {userData && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={handleUpdateUser}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Update User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
