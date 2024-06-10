import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";

export default function InputForm({
  input,
  setInput,
  handleSubmit,
  newChat,
  handleNewChat,
}) {
  return (
    <>
      {newChat ? (
        <form className={styles.inputRegion} onSubmit={handleSubmit}>
          <button className={styles.newChatButton} onClick={handleNewChat}>
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={faEdit}
              size="lg"
            />
            New Chat
          </button>
        </form>
      ) : (
        <form className={styles.inputRegion} onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className={
              input.trim()
                ? styles.enterButtonActive
                : styles.enterButtonDisabled
            }
            disabled={!input.trim()}
            type="submit"
          >
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={faPaperPlane}
              size="lg"
            />
          </button>
        </form>
      )}
    </>
  );
}
