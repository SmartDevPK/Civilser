// EditUser.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const EditUser = ({ userId }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    registrationCode: "",
    levelPostion: "",
    mobileNumber: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      setForm(data.user); 
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, form);
      alert("User updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="registrationCode" value={form.registrationCode} onChange={handleChange} />
      <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
      <input name="levelPostion" value={form.levelPostion} onChange={handleChange} />
      <input name="gender" value={form.gender} onChange={handleChange} />

      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
