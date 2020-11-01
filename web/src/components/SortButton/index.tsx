import React from "react";

import "./styles.scss";

interface SortButtonProps {
  name: string;
  onAction: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ name, onAction }) => {
  return (
    <div className="btn-sort">
      <button onClick={onAction}>{name}</button>
    </div>
  );
};

export default SortButton;
