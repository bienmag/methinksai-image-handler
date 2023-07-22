const API_KEY = import.meta.env.VITE_API_KEY;

const API = {
  async getImages() {
    try {
      const response = await fetch(
        "https://perenual.com/api/species-list?page=1&key=" + API_KEY
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      return data.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export default API;
