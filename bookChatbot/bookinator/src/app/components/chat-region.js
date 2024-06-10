import { useState } from "react";
import styles from "../page.module.css";
import { questions } from "../constants/question";
import InputForm from "./input-form";
import Conversations from "./conversations";
import { getRecommendations } from "../api/route";

export default function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conversations, setConversations] = useState([
    { type: "ai", text: questions[0] },
  ]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleNewchat = () => {
    setNewChat(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendations([]);
    setConversations([{ type: "ai", text: questions[0] }]);
    setInput("");
  };

  const handleSubmit = (e) => {
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
      processConversations([...conversations, { type: "human", text: input }]);
    }

    setInput("");
  };

  const processConversations = async (finalConversations) => {
    const answers = finalConversations.filter(
      (convo) => convo.type === "human"
    );
    const recommendedBooks = await getRecommendations(answers);
    setRecommendations(recommendedBooks);
    setNewChat(true);
    setConversations((prev) => [
      ...prev,
      { type: "ai", isRecommendation: true },
    ]);
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.questionRegion}>
        <div className={styles.chatRegion}>
          <Conversations
            conversations={conversations}
            recommendations={recommendations}
          />
        </div>
        <InputForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          newChat={newChat}
          handleNewChat={handleNewchat}
        />
      </div>
    </div>
  );
}
