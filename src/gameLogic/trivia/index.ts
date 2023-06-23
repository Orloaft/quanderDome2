import axios from "axios";

export interface TriviaQuestion {
  category: string;
  question: string;
  correctAnswer: string;
  countdown: number;
  answers: string[];
}
interface OpenTriviaDBQuestion {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const fetchTriviaQuestions = async (
  amount: number,
  category: number
): Promise<TriviaQuestion[]> => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
    );

    const data: OpenTriviaDBQuestion[] = response.data.results;

    const triviaQuestions: TriviaQuestion[] = data.map(
      (questionData: OpenTriviaDBQuestion) => ({
        category: questionData.category,
        question: questionData.question,
        correctAnswer: questionData.correct_answer,
        answers: [
          ...questionData.incorrect_answers,
          questionData.correct_answer,
        ].sort(() => Math.random() - 0.5),
        countdown: 3,
      })
    );

    return triviaQuestions;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    return [];
  }
};

export default fetchTriviaQuestions;
