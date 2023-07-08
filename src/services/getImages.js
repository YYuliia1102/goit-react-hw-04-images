import axios from "axios";

const URL = "https://pixabay.com/api/";
const API_KEY = "35924143-9020fc77f3274be39114409f4";

export const getImages = async (searchText, page) => {
    try {
        const response = await axios.get(
            `${URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        const { hits, totalHits } = response.data;

        return { images: hits, totalHits };
    } catch (error) {
        console.log(error);
        return { images: [], totalHits: 0 };
    }
};

