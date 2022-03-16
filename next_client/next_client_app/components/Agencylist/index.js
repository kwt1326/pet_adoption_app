import React from "react";
import AgencyListItem from "./AgencyListItem";

function AgencyList({ list }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {list.map((item, index) => (
        <AgencyListItem key={index} item={item}></AgencyListItem>
      ))}
    </div>
  );
}

export default AgencyList;
