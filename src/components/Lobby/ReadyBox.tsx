import { Player } from "@/gameLogic";
import React, { useState } from "react";

const ReadyBox = ({ toggleReady }: { toggleReady: any }) => {
  return (
    <div>
      <label>
        <input
          name="isReady"
          type="checkbox"
          onChange={(e) => toggleReady(e)}
        />
        I am ready
      </label>
    </div>
  );
};

export default ReadyBox;
