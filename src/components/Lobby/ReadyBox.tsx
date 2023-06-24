import { Player } from "@/gameLogic";
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
        I am ready
      </label>
    </div>
  );
};

export default ReadyBox;
