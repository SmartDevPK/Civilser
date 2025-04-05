import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    registrationCode: "",
    levelPostion: "",
    mobileNumber: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const { data } = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true); 

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const { data } = await axios.put(
        "http://localhost:5000/profile", 
        user,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Edit Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobileNumber", type: "text" },
            { label: "Registration Code", name: "registrationCode", type: "text" },
            { label: "Level/Position", name: "levelPostion", type: "text" },
          ].map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={user[input.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          ))}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/EditProfile")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}