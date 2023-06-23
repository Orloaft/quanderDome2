import React, { useState } from "react";
import Image from "next/image";
import Select from "react-select";

const PlayerView = ({ player, toggleColor, toggleAvatar }: any) => {
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

  return (
    <div>
      <Select
        options={colorOptions}
        value={colorOptions.find((option) => option.value === player.color)}
        onChange={toggleColor}
        placeholder="Select a color"
      />
      <Select
        options={avatarOptions}
        value={avatarOptions.find((option) => option.value === player.avatar)}
        onChange={toggleAvatar}
        placeholder="Select an image"
      />

      <Image width={30} height={30} src={player.avatar} alt="Selected Image" />
    </div>
  );
};

export default PlayerView;
