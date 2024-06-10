import styles from "../page.module.css";
import Image from "next/image";
import book from "../../../public/images/book.gif";
import loadingGif from "../../../public/images/loading.gif"; // Corrected import

export default function Conversations({ conversations, recommendations, loading }) {
  return (
    <ul>
      {conversations.map((item, index) => (
        <li
          key={index}
          className={`${item.type === "ai" ? styles.ai : styles.human}`}
        >
          {loading && item.isRecommendation ? (
            <ul className={styles.recommendationContainer}>
              <Image
                src={loadingGif}
                className={styles.loading}
                width={60}
                height={60}
                alt="loading"
              />
            </ul>
          ) : item.isRecommendation ? (
            <ul className={styles.recommendationContainer}>
              {recommendations.map((recItem, recIndex) => (
                <li key={recIndex} className={styles.recommendations}>
                  <Image
                    src={book}
                    className={styles.bookIcon}
                    width={60}
                    height={60}
                    alt="book"
                  />
                  <p className={styles.book}>
                    {recItem.title}
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
  );
}
