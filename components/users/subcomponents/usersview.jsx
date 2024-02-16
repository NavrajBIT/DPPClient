"use client";
import { useEffect, useState } from "react";
import API from "@/subcomponents/api/api";
import Button from "@/subcomponents/button/button";
import "./userview.css";
import deleteIcon from "../../../public/delete.png";
import Image from "next/image";

const Usersview = () => {
  const api = API();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    poppulateUsers();
  }, []);

  const poppulateUsers = async () => {
    setIsloading(true);
    await api
      .crud("GET", "organization/users")
      .then((res) => {
        if (res.status === 200) {
          setUserList(res);
        }
      })
      .catch((err) => console.log(err));
    setIsloading(false);
  };

  const deleteUser = async (id) => {
    setIsloading(true);
    await api.crud("DELETE", `organization/users/${id}`);
    await poppulateUsers();
    setIsloading(false);
  };

  console.log(userList);

  return (
    <table>
      <tbody className="userTable">
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>User Id</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
        {userList.map((user, index) => {
          return (
            <tr key={user.id}>
              <td style={{ color: "grey", fontWeight: "700" }}>{index + 1}</td>

              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Image
                  src={deleteIcon}
                  alt="delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Usersview;
