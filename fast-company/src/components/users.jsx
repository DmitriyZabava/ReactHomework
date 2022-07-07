import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {};
  const renderParse = (number) => {};
  console.log(users);
  const bageClases = "badge m-2 bg-";

  let usersTable = users.map((user) => {
    return (
      <tr key={user._id} className="m-2">
        <th>{user.name}</th>
        <td>
          {user.qualities.map((qualiti) => {
            return (
              <span key={qualiti._id} className={bageClases + qualiti.color}>
                {qualiti.name}
              </span>
            );
          })}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <button className="btn bg-danger m-1"> delete </button>
        {/* <td className="badge bg-danger m-2"> delete </td> */}
      </tr>
    );
  });

  return (
    <>
      <h2>
        <span className="badge bg-primary">
          человек тусанёт с тобой сегодня
        </span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился.раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{usersTable}</tbody>
      </table>
    </>
  );
};

export default Users;
