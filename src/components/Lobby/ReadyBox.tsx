import React, { useState } from "react";

const ReadyBox = ({
  toggleReady,
  isReady,
}: {
  toggleReady: any;
  isReady: boolean;
}) => {
  return (
    <div>
      <label>
        <input
          name="isReady"
          type="checkbox"
          checked={isReady}
          onChange={(e) => {
            toggleReady({ name: "isReady", value: e.target.checked });
          }}
        />
        Ready
      </label>
    </div>
  );
};

export default ReadyBox;
