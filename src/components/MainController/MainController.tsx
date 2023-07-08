import { useCallback, useEffect, useState } from "react";
import SignInView from "../SignIn/SignIn";
import useSocket from "@/hooks/useSocket";
import handleSocketEvents, { tearDownSocketEvents } from "./socketHandlers";
import DashBoard from "../DashBoard/DashBoard";
import { LobbyList } from "../LobbyList/LobbyList";
import { GameConfig, Lobby } from "@/gameLogic/lobby";
import { LobbyView } from "../Lobby/Lobby";
import ChatBox from "../Chat/Chat";
import ChatInput from "../Chat/ChatInput";
import styles from "./styles.module.scss";
import { GameView } from "../GameView/GameView";
import { Scores } from "../GameView/Scores";
import Confetti from "react-confetti";
import { connect } from "react-redux";
import { setLobbyData, setUserData } from "@/actions";
import { store } from "@/store";

const MainController = ({ lobby, user }: { lobby: any; user: any }) => {
  const [socket, socketInitializer] = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const signIn = (name: string) => {
    socket?.emit("add_user", name);
  };
  const leaveLobby = (id: string, socketId: string) =>
    user && socket?.emit("leave_lobby", id, socketId);
  const sendMessage = (message: string) => {
    socket?.emit("send_message", lobby?.id, user?.name, message);
  };
  const updateConfig = (config: GameConfig) => {
    lobby && socket?.emit("update_config", lobby.id, config);
  };
  const startGame = () => {
    lobby && socket?.emit("start_game", lobby.id);
  };
  const endGame = () => {
    lobby && socket?.emit("end_game", lobby.id);
  };
  const nextTrivia = () => {
    lobby && socket?.emit("next_trivia", lobby.id);
  };
  const submitAnswer = useCallback(
    (answer: string) => {
      lobby && user && socket?.emit("submit_answer", lobby.id, user.id, answer);
    },
    [lobby, socket, user]
  );

  const updatePlayer = (e: any) => {
    if (lobby) {
      user && socket?.emit("update_player", user.id, lobby.id, e);
    } else {
      user && socket?.emit("update_user", user.id, e);
    }
  };

  const signOut = () => {
    user && socket?.emit("remove_user", user.id);
    sessionStorage.removeItem("userId");
    setUserData(null);
  };
  const handleSocketInitialization = useCallback(async () => {
    let socket = await socketInitializer();
    if (socket) {
      setIsConnected(true);
    }
  }, [socketInitializer]);
  useEffect(() => {
    if (socket) {
      handleSocketEvents(socket);
      let userId = sessionStorage.getItem("userId");
      if (!user && userId) {
        socket.emit("reconnect_user", userId);
      }
    } else {
      handleSocketInitialization();
    }
    return () => {
      socket && tearDownSocketEvents(socket);
    };
  }, [socket, handleSocketInitialization, user]);

  return (
    <div className={styles.mainControllerContainer}>
      {user && socket && !lobby ? (
        !lobby && (
          <>
            <DashBoard signOut={signOut} updatePlayer={updatePlayer} />
            <LobbyList socket={socket} />
          </>
        )
      ) : user && lobby ? (
        (!lobby.game && (
          <div style={{ display: "flex", width: "100%", maxHeight: "20rem" }}>
            <LobbyView
              userId={user.id}
              lobby={lobby}
              onConfigChange={updateConfig}
              leaveLobby={leaveLobby}
              socketId={socket && socket.id}
              updatePlayer={updatePlayer}
              startGame={startGame}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <ChatBox messages={lobby.chat} />
              <ChatInput onSendMessage={sendMessage} />
            </div>
          </div>
        )) ||
        (lobby.game && (
          <>
            <div style={{ display: "flex", width: "100%", maxHeight: "20rem" }}>
              {(lobby.game.isConcluded && (
                <>
                  <Confetti height={1000} width={3000} tweenDuration={5000} />
                  <div className={styles.conclusionBox}>
                    <span style={{ textAlign: "center", fontSize: "2rem" }}>
                      GAME OVER!
                    </span>
                    <Scores
                      style={{ bottom: "-20vh" }}
                      players={lobby.users}
                      mode={lobby.config.mode}
                    />
                    <button
                      onClick={() => {
                        store.dispatch(setLobbyData(null));
                        store.dispatch(setUserData(null));
                      }}
                    >
                      Leave
                    </button>{" "}
                  </div>
                </>
              )) || (
                <>
                  <GameView
                    game={lobby.game}
                    config={lobby.config}
                    submitAnswer={submitAnswer}
                    onChange={updateConfig}
                    isOwner={user.id === lobby.hostId}
                    nextTrivia={nextTrivia}
                    endGame={endGame}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div className="chat-box" style={{ height: "100%" }}>
                      <ChatBox messages={lobby.chat} />
                      <ChatInput onSendMessage={sendMessage} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {!lobby.game.isConcluded && (
              <Scores players={lobby.users} mode={lobby.config.mode} />
            )}
          </>
        ))
      ) : isConnected && !user ? (
        <SignInView socket={socket} handleSubmit={signIn} />
      ) : (
        <p>Please wait...</p>
      )}
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.user.userData,
  lobby: state.lobby.lobbyData,
});

export default connect(mapStateToProps)(MainController);
