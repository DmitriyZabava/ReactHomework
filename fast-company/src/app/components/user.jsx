import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

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
    indx
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
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                </h3>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    indx: PropTypes.number.isRequired
};
export default User;
