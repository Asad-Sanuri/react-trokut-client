import React from "react";

const Rank = ({ name, triangles }) => {
  return (
    <div>
      <div>
        <b>{`${name}, tvoj broj unesenih trokuta je...`}</b>
      </div>
      <h2>{triangles}</h2>
    </div>
  );
};

export default Rank;
