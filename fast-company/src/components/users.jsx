import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderParse = (number) => {
    let message = "";
    if (number > 4 || number === 1) {
      message = (
        <span className="badge bg-primary m-2">
          {number + " человек тусанёт с тобой сегодня"}
        </span>
      );
    } else if (number > 1 && number <= 4) {
      message = (
        <span className="badge bg-primary m-2">
          {number + " человека тусанут с тобой сегодня"}
        </span>
      );
    } else if (number === 0) {
      message = (
        <span className="badge bg-danger m-2">Никто с тобой не тусанёт !</span>
      );
    }
    return message;
  };

  return (
    <>
      <h2>{renderParse(users.length)}</h2>
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
        <tbody>
          {users.map((person) => {
            return (
              <tr key={person._id}>
                <th>{person.name}</th>
                <td>
                  {person.qualities.map((qualiti) => {
                    return (
                      <span
                        key={qualiti._id}
                        className={"badge bg-" + qualiti.color + " m-2"}
                      >
                        {qualiti.name}
                      </span>
                    );
                  })}
                </td>
                <td>{person.profession.name}</td>
                <td>{person.completedMeetings}</td>
                <td>{person.rate}/5</td>
                <td
                  className="btn bg-danger m-2"
                  onClick={() => handleDelete(person._id)}
                >
                  {" "}
                  delete{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
