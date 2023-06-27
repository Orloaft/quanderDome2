import axios from "axios";
import he from "he";
export interface TriviaQuestion {
  category: string;
  question: string;
  correctAnswer: string;
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
const nsc = (str: string) => {
  return he.decode(str);
};
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
        category: nsc(questionData.category),
        question: nsc(questionData.question),
        correctAnswer: nsc(questionData.correct_answer),
        answers: [
          ...questionData.incorrect_answers.map((a) => nsc(a)),
          nsc(questionData.correct_answer),
        ].sort(() => Math.random() - 0.5),
      })
    );

    return triviaQuestions;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    return [];
  }
};

export default fetchTriviaQuestions;
