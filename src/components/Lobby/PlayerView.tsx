import React, { memo } from "react";
import Image from "next/image";
import Select from "react-select";
import { Player } from "@/gameLogic";
import ReadyBox from "./ReadyBox";
import styles from "./styles.module.scss";

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
      label: (
        <div style={{ background: "red", height: "2rem", width: "2rem" }}></div>
      ),
    },
    {
      value: "blue",
      label: (
        <div
          style={{ background: "blue", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "green",
      label: (
        <div
          style={{ background: "green", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "yellow",
      label: (
        <div
          style={{ background: "yellow", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "orange",
      label: (
        <div
          style={{ background: "orange", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "purple",
      label: (
        <div
          style={{ background: "purple", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "pink",
      label: (
        <div
          style={{ background: "pink", height: "2rem", width: "2rem" }}
        ></div>
      ),
    },
    {
      value: "black",
      label: (
        <div
          style={{ background: "black", height: "2rem", width: "2rem" }}
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

      overflow: "-moz-scrollbars-none",
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      display: "grid",
      background: "transparent",
      gridTemplateColumns: "repeat(1, 3fr)", // Adjust the number of columns as desired
      gap: "10px", // Adjust the gap between options as desired
    }),
    option: (provided: any) => ({
      ...provided,
      textAlign: "center",
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
  if (sessionStorage.getItem("userId") === player.id) {
    return (
      <div className={styles.playerViewContainer}>
        <div className={styles.avatarSelect}>
          <Select
            name="color"
            options={colorOptions}
            styles={customStyles}
            onChange={handleChange}
            placeholder="Select a color"
            className={styles["custom-select"]}
            classNamePrefix="select"
            isSearchable={false}
            menuPlacement="auto"
          />
          <Select
            name="avatar"
            className={styles["custom-select"]}
            options={avatarOptions}
            styles={customStyles}
            onChange={handleChange}
            placeholder="Select an image"
            classNamePrefix="select"
            isSearchable={false}
            menuPlacement="auto"
          />
        </div>

        <Image
          width={30}
          height={30}
          src={player.avatar}
          alt="Selected Image"
        />
        <div className={styles.readyBox}>
          <ReadyBox toggleReady={updatePlayer} isReady={player.isReady} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.playerViewContainer}>
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

const CustomAvatarValue = ({ children }: any) => (
  <div className="select__single-value">
    {children}
    <Image
      width={60}
      height={60}
      src={children.props.src}
      alt="Selected Image"
    />
  </div>
);

const CustomColorValue = ({ children }: any) => (
  <div className="select__single-value">
    <div
      className="colorBlock"
      style={{ background: children.props.style.background }}
    ></div>
    {children}
  </div>
);

export default PlayerView;
