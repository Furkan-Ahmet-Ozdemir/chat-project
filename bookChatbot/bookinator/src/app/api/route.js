import axios from "axios";

export const getRecommendations = async (answers) => {
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
      console.error("Failed to save answers:", error);
    } 
  };
