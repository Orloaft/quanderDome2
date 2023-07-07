import { render, fireEvent } from "@testing-library/react";
import TriviaBox from "./TriviaView";
import { Player } from "@/gameLogic";
import { UserContext } from "../../hooks/useUserContext";
import useSocket from "@/hooks/useSocket";

describe("TriviaBox", () => {
  it("should emit an event and apply the selected style when an option is clicked", () => {
    const submitAnswer = jest.fn((answer) => {
      user.choices.push(answer);
    });
    const socket = useSocket();
    const user: Player = {
      choices: [],
      life: 50,
      points: 0,
      active: true,
      name: "tester",
      id: "123",
      team: 1,
      isReady: true,
      socketId: "123",
      color: "white",
      avatar: "avatar",
    };

    const question = {
      category: "Entertainment: Music",
      question: 'Who performed "I Took A Pill In Ibiza"?',
      correctAnswer: "Mike Posner",
      answers: ["Mike Posner", "Harry Styles", "Robbie Williams", "Avicii"],
    };

    const { getByText } = render(
      <TriviaBox
        question={question}
        submitAnswer={submitAnswer}
        style={{}}
        user={user}
      />,
      {
        wrapper: ({ children }) => (
          <UserContext.Provider value={{ user }}>
            {children}
          </UserContext.Provider>
        ),
      }
    );

    const answer = getByText("Mike Posner");
    fireEvent.click(answer);

    expect(submitAnswer).toHaveBeenCalledTimes(1);
    expect(answer).toHaveClass("selected");
  });
});
