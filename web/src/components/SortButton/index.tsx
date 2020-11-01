import React from "react";

import "./styles.scss";

interface SortButtonProps {
  name: string;
  activeSort: string;
  onAction: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  name,
  onAction,
  activeSort,
}) => {
  return (
    <div className={activeSort !== name ? "btn-sort" : "btn-sort active"}>
      <button onClick={onAction}>{name}</button>
    </div>
  );
};

export default SortButton;
