import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.thedogapi.com/v1/",
    headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_ZQm8MazqXBR1p0mny8q3KOZbd8flxaTtf5GErVhY39FsSpswUo2lpd9YrRzGVK57"
      }
});
export default instance;