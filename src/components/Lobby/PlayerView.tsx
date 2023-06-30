import React, { memo } from "react";
import Image from "next/image";
import Select from "react-select";
import { Player } from "@/gameLogic";
import ReadyBox from "./ReadyBox";
import styles from "./styles.module.scss";
import { User } from "@/gameLogic/users";

const PlayerView = memo(function PlayerView({
  player,
  updatePlayer,
}: {
  player: User;
  updatePlayer: (e: any) => void;
}) {
  const avatarOptions = [
    {
      value: "/avatars/avatar1.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src={player.avatar}
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar2.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar2.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar3.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar3.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar4.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar4.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar5.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar5.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar6.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar6.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar7.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar7.jpg"
          alt="Selected Image"
        />
      ),
    },
  ];
  const colorOptions = [
    {
      value: "red",
      label: (
        <div
          style={{
            background: "red",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "blue",
      label: (
        <div
          style={{
            background: "blue",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "green",
      label: (
        <div
          style={{
            background: "green",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "yellow",
      label: (
        <div
          style={{
            background: "yellow",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "orange",
      label: (
        <div
          style={{
            background: "orange",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "purple",
      label: (
        <div
          style={{
            background: "purple",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "pink",
      label: (
        <div
          style={{
            background: "pink",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
    {
      value: "white",
      label: (
        <div
          style={{
            background: "white",
            height: "2rem",
            width: "2rem",
            borderRadius: "4px",
          }}
        ></div>
      ),
    },
  ];
  const handleChange = (selectedOption: any, { name }: any) => {
    updatePlayer({ name, value: selectedOption.value });
  };
  const customStyles = {
    menuList: (base: any) => ({
      ...base,
      width: "fit-content",
      //   overflow: "-moz-scrollbars-none",
      //   "::-webkit-scrollbar": {
      //     display: "none",
      //   },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: 0,
      justifyContent: "center",
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "auto", // Set the width to 100% to expand across the screen
      maxWidth: "none", // Disable the maximum width limit
      background: "transparent",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Adjust the column width and responsiveness as needed
      gap: "10px", // Adjust the gap between options as desired
    }),
    option: (provided: any) => ({
      ...provided,
      width: "auto",
    }),
    control: (provided: any) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className={`frame ${styles.playerViewContainer}`}>
      <p style={{ color: "#fbeaeb", fontSize: "3rem" }}>{player.name}</p>
      <div className={styles.avatarSelect}>
        <Select
          name="color"
          options={colorOptions}
          styles={customStyles}
          onChange={handleChange}
          placeholder={
            <div
              style={{
                background: "white",
                height: "2rem",
                width: "2rem",
                borderRadius: "4px",
              }}
            ></div>
          }
          className={styles["custom-select"]}
          classNamePrefix="select"
          isSearchable={false}
          menuPlacement="auto"
        />
        <div
          style={{
            border: `8px solid ${player.color}`,
            padding: 0,
            borderRadius: "4px",
          }}
        >
          <Select
            name="avatar"
            className={styles["custom-select"]}
            options={avatarOptions}
            styles={customStyles}
            onChange={handleChange}
            placeholder={
              <Image
                width={100}
                height={100}
                src={player.avatar}
                alt="Selected Image"
              />
            }
            classNamePrefix="select"
            isSearchable={false}
            menuPlacement="auto"
          />
        </div>
      </div>
    </div>
  );
});

export default PlayerView;
