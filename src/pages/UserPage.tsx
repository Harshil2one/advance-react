import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, addUser, updateUser, deleteUser } from "../redux/slice/userSlice";

const UserPage: React.FC = () => {
  const users = useSelector((state: any) => state.users.users);
  const dispatch = useDispatch();

  const [user, setUser] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  const handleAddUser = () => {
    dispatch(addUser({ id: Math.random() * 10000, name: user }));
    setUser("");
  };

  const handleEditUser = (selectedUser: User) => {
    setSelectedId(selectedUser.id);
    setUser(selectedUser.name);
    setIsEditMode(true);
  };

  const handleUpdateUser = (selectedUser: string) => {
    dispatch(updateUser({ id: selectedId, name: selectedUser }));
    setUser("");
    setIsEditMode(false);
  };

  const handleUser = () => {
    isEditMode ? handleUpdateUser(user) : handleAddUser();
  };

  const handleDeleteUser = (user: User) => {
    dispatch(deleteUser({ id: user.id, name: user.name }));
  };

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h1>User Management</h1>
      <input
        name="users"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        onClick={handleUser}
        style={{
          backgroundColor: user.length === 0 ? "grey" : "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "8px",
          cursor: user.length === 0 ? "not-allowed" : "pointer",
        }}
        disabled={user.length === 0}
      >
        {isEditMode ? "Update" : "Add"} User
      </button>
      <div>
        <h4>User list</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {users.map((user: User) => (
            <div
              key={user.id}
              style={{
                border: "2px solid black",
                borderRadius: "10px",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "100px",
              }}
            >
              {user.name}{" "}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
