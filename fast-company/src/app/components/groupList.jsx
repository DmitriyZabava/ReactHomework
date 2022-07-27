import React from "react";
import PropTypes from "prop-types";
import { isArray } from "lodash";
const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectetItem
}) => {
    if (isArray(items)) {
        return (
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item[valueProperty] === selectetItem
                                ? " active"
                                : "")
                        }
                        onClick={() => onItemSelect(item[valueProperty])}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[item][valueProperty] === selectetItem
                            ? " active"
                            : "")
                    }
                    onClick={() => onItemSelect(items[item][valueProperty])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectetItem: PropTypes.string
};

export default GroupList;
