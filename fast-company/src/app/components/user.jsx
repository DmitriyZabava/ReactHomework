import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = (props) => {
  return props.users.map((person, indx) => {
    return (
      <tr
        key={person._id}
        className={indx % 2 === 0 ? "table-info" : "table-primary"}
      >
        <th>{person.name}</th>
        <td>
          {person.qualities.map((qlts) => {
            return <Qualitie key={qlts._id} {...qlts} />;
          })}
        </td>
        <td>{person.profession.name}</td>
        <td>{person.completedMeetings}</td>
        <td>{person.rate}/5</td>
        <td>
          <Bookmark {...person} onSelect={props.onSelect} />
        </td>
        <td>
          <h3>
            <button
              className="btn btn-danger"
              onClick={() => props.onDelete(person._id)}
            >
              {" "}
              delete{" "}
            </button>
          </h3>
        </td>
      </tr>
    );
  });
};
export default User;
