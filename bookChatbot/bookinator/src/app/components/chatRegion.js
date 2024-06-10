import { useState } from "react";
import styles from "../page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import book from "../../../public/images/book.gif";
import axios from "axios";

const questions = [
  "What kind of books do you like? Can you detail genres such as Novel, Science Fiction, Horror, Crime, Fantasy, Biography, History?",

  "In which language would you prefer to read books? Do you have a preferred language? (Turkish, English)",

  "Who is your favorite author? I can recommend books written in a similar style to theirs.",
];

export default function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conversations, setConversations] = useState([
    { type: "ai", text: questions[0] },
  ]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setConversations((prev) => [...prev, { type: "human", text: input }]);
    if (currentQuestionIndex < questions.length - 1) {
      setConversations((prev) => [
        ...prev,
        { type: "ai", text: questions[currentQuestionIndex + 1] },
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await processConversations([...conversations, { type: "human", text: input }]);
    }

    setInput("");
  };

  const processConversations = async (finalConversations) => {
    const answers = finalConversations.filter(
      (convo) => convo.type === "human"
    );
    const recommendedBooks = await getRecommendations(answers);
    setRecommendations(recommendedBooks);
    setConversations((prev) => [
      ...prev,
      { type: "ai", isRecommendation: true },
    ]);
  };

  const getRecommendations = async (answers) => {
    try {
      const url = "http://localhost:5000/get_recommendation";
      const headers = {
        "Content-Type": "application/json",
      };

      const prompt = `I enjoy reading books in the ${answers[0].text} genre. I like reading in ${answers[1].text} and the books of ${answers[2].text}. Recommend me just 3 books and Just provide the book titles and author names. Dont answer with descriptions or another else.`;

      const response = await axios.post(url, { user_input: prompt }, { headers });
      const books = response.data.recommendations;

      return books.split('\n').map((book) => ({ title: book.trim() }));
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      return [];
    }
  };

  return (
    <div className={styles.questionRegion}>
      <div className={styles.chatRegion}>
        <ul>
          {conversations.map((item, index) => (
            <li
              key={index}
              className={`${item.type === "ai" ? styles.ai : styles.human}`}
            >
              {item.isRecommendation ? (
                <ul className={styles.recommendationContainer}>
                  {recommendations.map((item, index) => (
                    <li key={index} className={styles.recommendations}>
                      <Image
                        src={book}
                        className={styles.bookIcon}
                        width={60}
                        height={60}
                        alt="book"
                      />
                      <p className={styles.book}>
                        {item.title}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      </div>
      <form className={styles.inputRegion} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          className={styles.input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={
            input.trim() ? styles.enterButtonActive : styles.enterButtonDisabled
          }
          type="submit"
        >
          <FontAwesomeIcon
            className={styles.buttonIcon}
            icon={faPaperPlane}
            size="lg"
          />
        </button>
       {/*  <button className={styles.newChatButton}>
          <FontAwesomeIcon
            className={styles.buttonIcon}
            icon={FaRegEdit}
            size="lg"
          />
        </button> */}
      </form>
    </div>
  );
}
