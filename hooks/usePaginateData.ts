// useFetchItems.ts
import { useQuery } from '@tanstack/react-query';

const pageSize = 10; // Number of items per page
const API_URL = 'https://picsum.photos/v2/list'; // Replace with your API URL

const fetchItems = async (page: number) => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${pageSize}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useFetchItems = () => {

  // Initialize with an empty array
  const { data = [], refetch, isError, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const currentPage = Math.ceil((data.length + pageSize) / pageSize); // Calculate the next page
      const newData = await fetchItems(currentPage); // Fetch new data
      // Add custom property to each item
      const enhancedData = newData.map((item: any) => ({
        ...item,
        upvote: 0, // Add custom property
        downvote: 0,
        comment: 0,
      }));
      return [...data, ...enhancedData]; // Combine new data with existing data
    },
    enabled: false, // Disable automatic fetching
  });

  const fetchNextPage = async () => {
    try {
      await refetch(); // Fetch the next page
    } catch (error) {
      console.error(error);
    }
  };

  return { data, fetchNextPage, isError, isLoading }; // Return isLoading
};