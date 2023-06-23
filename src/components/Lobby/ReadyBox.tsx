import React, { useState } from "react";

const ReadyBox = ({ toggleReady }: { toggleReady: any }) => {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={toggleReady} />I am ready
      </label>
    </div>
  );
};

export default ReadyBox;
