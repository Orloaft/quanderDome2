import axios from "axios";

interface TriviaQuestion {
  category: string;
  question: string;
  correctAnswer: string;
  // Add other properties as needed
}

const fetchTriviaQuestions = async (
  amount: number,
  category: number
): Promise<TriviaQuestion[]> => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
    );

    const data = response.data.results;

    const triviaQuestions: TriviaQuestion[] = data.map((questionData: any) => ({
      category: questionData.category,
      question: questionData.question,
      correctAnswer: questionData.correct_answer,
      // Extract and assign other relevant properties
    }));

    return triviaQuestions;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    return [];
  }
};

export default fetchTriviaQuestions;
