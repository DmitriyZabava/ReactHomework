import React from "react";

const SearchStatus = ({ lenght }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "Человек тусанут";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
    if (number === 1) return "Человек тусанёт";
  };
  return (
    <h2>
      <span className={"badge bg-" + (lenght > 0 ? "primary" : "danger")}>
        {lenght > 0
          ? `${lenght} ${renderPhrase(lenght)} с тобой сегодня`
          : "Никто с тобой не тусанёт"}
      </span>
    </h2>
  );
};

export default SearchStatus;
