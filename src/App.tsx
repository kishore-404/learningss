import React, { useEffect, useState } from 'react';
import { createData, fetchUsers } from './Api';

interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

function App() {
  const [userData, setUserData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    website: '',
    city: '',
    companyName: '',
  });

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await fetchUsers();
        setUserData(response);
      } catch (error) {
        console.error('error');
      }
    };
    apiCall();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser: User = {
        id: userData.length + 1, // Add dummy ID
        name: formData.name,
        username: formData.username,
        email: formData.email,
        website: formData.website,
        address: {
          city: formData.city,
        },
        company: {
          name: formData.companyName,
        },
      };

      const response = await createData(newUser);
      alert('Success! Post ID: ' + response.data.id);
      setUserData([...userData, newUser]);
      setFormData({
        name: '',
        username: '',
        email: '',
        website: '',
        city: '',
        companyName: '',
      });
      setOpen(false); // Close modal after submit
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="w-full text-sm mt-4">
        <thead className="border bg-gray-100">
          <tr>
            <td className="border p-2">Name</td>
            <td className="border p-2">UserName</td>
            <td className="border p-2">Email</td>
            <td className="border p-2">Website</td>
            <td className="border p-2">Address</td>
            <td className="border p-2">Company</td>
          </tr>
        </thead>
        <tbody>
          {userData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            userData.map((item: User, index: number) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.username}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.website}</td>
                <td className="border p-2">{item.address?.city}</td>
                <td className="border p-2">{item.company?.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add user
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <button onClick={() => setOpen(false)} className="text-red-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-1 w-full" />
              <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border p-1 w-full" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-1 w-full" />
              <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="border p-1 w-full" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-1 w-full" />
              <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company" className="border p-1 w-full" />

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
