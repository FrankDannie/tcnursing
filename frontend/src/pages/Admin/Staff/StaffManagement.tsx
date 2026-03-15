import React, { useEffect, useState } from "react";
import "./StaffManagement.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Staff = {
  id: number;
  name: string;
  role: string;
  description: string;
  image?: string;
};

const StaffManagement = () => {

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Fetch staff
  const fetchStaff = async () => {
    const res = await fetch(`${BASE_URL}/api/staff/`);
    const data = await res.json();
    setStaffList(data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // CREATE OR UPDATE STAFF
  const submitStaff = async () => {

    if (editingId) {
      await fetch(`${BASE_URL}/api/staff/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          role,
          description
        })
      });

      alert("Staff updated!");
      setEditingId(null);
    } else {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("role", role);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await fetch(`${BASE_URL}/api/staff/`, {
        method: "POST",
        body: formData
      });

      alert("Staff added!");
    }

    setName("");
    setRole("");
    setDescription("");
    setImage(null);

    fetchStaff();
  };

  // EDIT STAFF
  const editStaff = (staff: Staff) => {
    setEditingId(staff.id);
    setName(staff.name);
    setRole(staff.role);
    setDescription(staff.description);
  };

  // DELETE STAFF
  const deleteStaff = async (id: number) => {

    const confirmDelete = window.confirm("Delete this staff member?");
    if (!confirmDelete) return;

    await fetch(`${BASE_URL}/api/staff/${id}`, {
      method: "DELETE"
    });

    fetchStaff();
  };

  return (
    <div className="staff-management">

      <h1>Staff Management</h1>

      <div className="staff-form">

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {!editingId && (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        )}

        <button onClick={submitStaff}>
          {editingId ? "Update Staff" : "Add Staff"}
        </button>

      </div>

      {/* Staff List */}

      <div className="staff-list">

        {staffList.map((staff) => (
          <div className="staff-card" key={staff.id}>

            {staff.image && (
              <img
                src={`${BASE_URL}/images/staff/${staff.image}`}
                alt={staff.name}
              />
            )}

            <div className="staff-info">
              <h3>{staff.name}</h3>
              <p>{staff.role}</p>
              <p>{staff.description}</p>
            </div>

            <div className="staff-actions">

              <button
                className="edit-btn"
                onClick={() => editStaff(staff)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteStaff(staff.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default StaffManagement;