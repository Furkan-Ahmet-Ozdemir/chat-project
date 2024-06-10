import axios from "axios";

export const getRecommendations = async (answers) => {
    try {
          const books = [
            { title: "To Kill a Mockingbird", author: "Harper Lee" },
            { title: "1984", author: "George Orwell" },
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
            { title: "The Catcher in the Rye", author: "J.D. Salinger" },
            { title: "Moby-Dick", author: "Herman Melville" },
            { title: "Pride and Prejudice", author: "Jane Austen" },
            { title: "The Hobbit", author: "J.R.R. Tolkien" },
            { title: "War and Peace", author: "Leo Tolstoy" },
            { title: "The Odyssey", author: "Homer" },
            { title: "Ulysses", author: "James Joyce" },
          ];
          return books;
      /*     const url = "https://api.example.com/postData";

      const headers = {
        "Content-Type": "application/json"
      }; */

      const data = `${answers[0].text} romanları okumayı severim. ${answers[1].text} dilinde kitaplar okumayı severim. Bana 3 tane kitap öner. Sadece kitap isimleri ve yazar isimlerini ver.`;
      //  const response = await axios.post(url, data, headers);
      //  const books = response.data;
    } catch (error) {
      console.error("Failed to save answers:", error);
    } 
  };
