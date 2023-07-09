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

    {
      value: "/avatars/avatar8.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar8.jpg"
          alt="Selected Image"
        />
      ),
    },

    {
      value: "/avatars/avatar9.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar9.jpg"
          alt="Selected Image"
        />
      ),
    },
    {
      value: "/avatars/avatar10.jpg",
      label: (
        <Image
          width={100}
          height={100}
          src="/avatars/avatar10.jpg"
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
  const nextAvatar = () => {
    let current = avatarOptions.find(
      (option) => option.value === player.avatar
    );
    if (current) {
      let index = avatarOptions.indexOf(current) + 1;
      updatePlayer({
        name: "avatar",
        value:
          index === avatarOptions.length
            ? avatarOptions[0].value
            : avatarOptions[index].value,
      });
    }
  };
  const nextColor = () => {
    let current = colorOptions.find((option) => option.value === player.color);
    if (current) {
      let index = colorOptions.indexOf(current) + 1;
      updatePlayer({
        name: "color",
        value:
          index === colorOptions.length
            ? colorOptions[0].value
            : colorOptions[index].value,
      });
    }
  };
  const prevAvatar = () => {
    let current = avatarOptions.find(
      (option) => option.value === player.avatar
    );
    if (current) {
      let index = avatarOptions.indexOf(current) - 1;
      updatePlayer({
        name: "avatar",
        value:
          index < 0
            ? avatarOptions[avatarOptions.length - 1].value
            : avatarOptions[index].value,
      });
    }
  };
  const prevColor = () => {
    let current = colorOptions.find((option) => option.value === player.color);
    if (current) {
      let index = colorOptions.indexOf(current) - 1;
      updatePlayer({
        name: "color",
        value:
          index < 0
            ? colorOptions[colorOptions.length - 1].value
            : colorOptions[index].value,
      });
    }
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
        <div style={{ position: "relative" }}>
          <Image
            onClick={nextColor}
            style={{
              cursor: "pointer",
              position: "absolute",
              zIndex: "5",
              right: "10%",
              bottom: "30%",
            }}
            src="/right-arrow.svg"
            width={15}
            height={15}
            alt="right arrow"
          />
          <Select
            name="color"
            options={colorOptions}
            styles={customStyles}
            value={{
              value: player.color,
              label: (
                <div
                  style={{
                    background: player.color,
                    height: "2rem",
                    width: "2rem",
                    borderRadius: "4px",
                  }}
                ></div>
              ),
            }}
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
          />{" "}
          <Image
            onClick={prevColor}
            style={{
              cursor: "pointer",
              position: "absolute",
              zIndex: "5",
              left: "10%",
              bottom: "30%",
              transform: "rotate(180deg)",
            }}
            src="/right-arrow.svg"
            width={15}
            height={15}
            alt=""
          />
        </div>
        <div
          style={{
            border: `8px solid ${player.color}`,
            padding: 0,
            borderRadius: "4px",
            position: "relative",
          }}
        >
          {" "}
          <Image
            onClick={nextAvatar}
            style={{
              cursor: "pointer",
              position: "absolute",
              zIndex: "5",
              right: "-25%",
              bottom: "50%",
            }}
            src="/right-arrow.svg"
            width={15}
            height={15}
            alt=""
          />
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
          />{" "}
          <Image
            onClick={prevAvatar}
            style={{
              cursor: "pointer",
              position: "absolute",
              zIndex: "5",
              left: "-25%",
              bottom: "50%",
              transform: "rotate(180deg)",
            }}
            src="/right-arrow.svg"
            width={15}
            height={15}
            alt=""
          />
        </div>
      </div>
    </div>
  );
});

export default PlayerView;
