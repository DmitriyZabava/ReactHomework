import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    let headings =
      number === 1 || number > 4 ? (
        <span className="badge bg-primary m-2">
          {number + " человек тусанёт с тобой сегодня"}
        </span>
      ) : number > 1 && number <= 4 ? (
        <span className="badge bg-primary m-2">
          {number + " человека тусанут с тобой сегодня"}
        </span>
      ) : (
        <span className="badge bg-danger m-2">Никто с тобой не тусанёт !</span>
      );
    return headings;
  };

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      <table className="table">
        <thead>
          <tr className="table-secondary">
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился.раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((person, indx) => {
            return (
              <tr
                key={person._id}
                className={indx % 2 === 0 ? "table-info" : "table-primary"}
              >
                <th>{person.name}</th>
                <td>
                  {person.qualities.map((qualiti) => {
                    return (
                      <span
                        key={qualiti._id}
                        className={"badge bg-" + qualiti.color + " m-1"}
                      >
                        {qualiti.name}
                      </span>
                    );
                  })}
                </td>
                <td>{person.profession.name}</td>
                <td>{person.completedMeetings}</td>
                <td>{person.rate}/5</td>
                <td>
                  <h3>
                    <button
                      typeof="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(person._id)}
                    >
                      {" "}
                      delete{" "}
                    </button>
                  </h3>
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
