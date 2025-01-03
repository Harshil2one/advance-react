import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ThunkUser,
  fetchUsers,
  postUser,
  putUser,
  deleteUserAPI,
} from "../redux/slice/thunkUserSlice";

const ThunkUserPage = () => {
  const {
    data: loading,
    thunkUsers,
    error,
  } = useSelector((state: any) => state.thunkUsers);
  const dispatch = useDispatch();

  const [thunkUser, setThunkUser] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>(-1);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(postUser(thunkUser) as any);
    setThunkUser("");
  };

  const handleEditUser = (selectedUser: ThunkUser) => {
    setSelectedId(selectedUser.id);
    setThunkUser(selectedUser.name);
  };

  const handleUpdateUser = (selectedUser: string) => {
    dispatch(putUser({ id: selectedId, name: selectedUser }) as any);
    setThunkUser("");
  };

  const handleUser = () => {
    selectedId > 0 ? handleUpdateUser(thunkUser) : handleAddUser();
  };

  const handleDeleteUser = (thunkUser: ThunkUser) => {
    dispatch(deleteUserAPI(thunkUser.id) as any);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      <h1>ThunkUser Management</h1>
      <input
        name="users"
        value={thunkUser}
        onChange={(e) => setThunkUser(e.target.value)}
      />
      <button
        onClick={handleUser}
        style={{
          backgroundColor: thunkUser.length === 0 ? "grey" : "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "8px",
          cursor: thunkUser.length === 0 ? "not-allowed" : "pointer",
        }}
        disabled={thunkUser.length === 0}
      >
        {selectedId > 0 ? "Update" : "Add"} ThunkUser
      </button>
      <div>
        <h4>ThunkUser list</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {thunkUsers.map((thunkUser: ThunkUser) => (
            <div
              key={thunkUser.id}
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
              {thunkUser.name}{" "}
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditUser(thunkUser)}
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
                  onClick={() => handleDeleteUser(thunkUser)}
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

export default ThunkUserPage;
