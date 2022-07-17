import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onSelect,
  indx,
}) => {
  return (
    <tr className={indx % 2 === 0 ? "table-primary" : "table-info"}>
      <th>{name}</th>
      <td>
        {qualities.map((qlts) => {
          return <Qualitie key={qlts._id} {...qlts} />;
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark _id={_id} bookmark={bookmark} onSelect={onSelect} />
      </td>
      <td>
        <h3>
          <button className="btn btn-danger" onClick={() => onDelete(_id)}>
            {" "}
            delete{" "}
          </button>
        </h3>
      </td>
    </tr>
  );
};
export default User;
