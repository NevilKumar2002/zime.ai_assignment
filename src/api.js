// src/api.js
import axios from 'axios';

export const fetchData = async ({ page, pageSize, tags, search }) => {
  try {
    // Inside fetchData function in api.js
const response = await axios.get(`https://dummyjson.com/posts`, {
  params: {
    skip: (page - 1) * pageSize,
    limit: pageSize,
    tags: tags.join(','), // Convert tags array to comma-separated string
    search // Pass the search text parameter
  }
});


    const data = {
      data: response.data.posts, // Access 'posts' directly from response data
      total: response.data.total
    };

    return data;
  } catch (error) {
    throw error;
  }
};


