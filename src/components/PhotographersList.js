import React from "react";
import { PhotographerCard } from "./PhotographerCard";

export const PhotographersList = ({ list }) => {
  if (list.length == 0) {
    return <h2>No photographers in this region!</h2>;
  }
  return (
    <ul classlist="photographers-list">
      {list.map(el => (
        <PhotographerCard
          key={el.uid}
          uid={el.uid}
          userPic={el.photoURL}
          userName={el.displayName}
          userLocation={el.location}
        />
      ))}
    </ul>
  );
};
