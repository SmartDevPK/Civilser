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

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
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
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/profile", // Changed endpoint to /profile
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Edit Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="space-y-4">
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

          {/* Mobile Number Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Registration Code Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Registration Code</label>
            <input
              type="text"
              name="registrationCode"
              value={user.registrationCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Level/Position Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Level/Position</label>
            <input
              type="text"
              name="levelPostion"
              value={user.levelPostion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"  // Changed to type="button"
              onClick={() => navigate("/profile")}
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