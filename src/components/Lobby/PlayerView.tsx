import React, { memo, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import { Player } from "@/gameLogic";
import ReadyBox from "./ReadyBox";

const PlayerView = memo(function PlayerView({
  player,
  updatePlayer,
}: {
  player: Player;
  updatePlayer: (e: any) => void;
}) {
  const avatarOptions = [
    {
      value: "/avatars/avatar1.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src={player.avatar}
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar2.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar2.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar3.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar3.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar4.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar4.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar5.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar5.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar6.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar6.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar7.jpg",
      label: (
        <Image
          width={60}
          height={60}
          src="/avatars/avatar7.jpg"
          alt="Selected Image"
        />
      ),
    },
  ];
  const colorOptions = [
    {
      value: "red",
      label: <div style={{ background: "red", height: "2rem" }}></div>,
    },
    {
      value: "blue",
      label: <div style={{ background: "blue", height: "2rem" }}></div>,
    },
    {
      value: "green",
      label: <div style={{ background: "green", height: "2rem" }}></div>,
    },
    {
      value: "yellow",
      label: <div style={{ background: "yellow", height: "2rem" }}></div>,
    },
    {
      value: "orange",
      label: <div style={{ background: "orange", height: "2rem" }}></div>,
    },
    {
      value: "purple",
      label: <div style={{ background: "purple", height: "2rem" }}></div>,
    },
    {
      value: "pink",
      label: <div style={{ background: "pink", height: "2rem" }}></div>,
    },
    {
      value: "black",
      label: <div style={{ background: "black", height: "2rem" }}></div>,
    },
  ];
  const handleChange = (...args: any) => {
    updatePlayer({ name: args[1].name, value: args[0].value });
  };
  if (sessionStorage.getItem("userId") === player.id) {
    return (
      <div>
        <Select
          name="color"
          options={colorOptions}
          value={colorOptions.find((option) => option.value === player.color)}
          onChange={handleChange}
          placeholder="Select a color"
        />
        <Select
          name="avatar"
          options={avatarOptions}
          value={avatarOptions.find((option) => option.value === player.avatar)}
          onChange={handleChange}
          placeholder="Select an image"
        />

        <Image
          width={30}
          height={30}
          src={player.avatar}
          alt="Selected Image"
        />
        <ReadyBox toggleReady={updatePlayer} isReady={player.isReady} />
      </div>
    );
  } else {
    return (
      <div>
        <Image
          width={30}
          height={30}
          src={player.avatar}
          alt="Selected Image"
        />
        {player.isReady && <p>Ready!</p>}
      </div>
    );
  }
});
export default PlayerView;
