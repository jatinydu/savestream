import { useCallback, useEffect, useMemo, useState } from 'react'
import { SimpleInput } from '../lib/Input'
import Suggestions from './Suggestions';
import debounce from 'lodash/debounce';
import _ from 'lodash';

interface Category {
  _id: string;
  name: string;
}


export default function SearchInput() {
  const [inputValue, setInputValue] = useState(''); // What user is currently typing
  const [suggestions, setSuggestions] = useState<Category[]>([]); // Categories from backend
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // User's final selections

  // Mock API functions - replace these with your actual backend calls
  const searchCategories = useCallback(async (searchTerm:string) => {
    // Simulate API delay to show how the debouncing works in real conditions
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock categories - your backend would return real data here
    const mockCategories = [
      { _id: "1", name: 'Technology' },
      { _id: "2", name: 'Health & Fitness' },
      { _id: "3", name: 'Travel' },
      { _id: "4", name: 'Food & Cooking' },
      { _id: "5", name: 'Education' },
      { _id: "6", name: 'Entertainment' },
    ];

    // Filter categories that match the search term and aren't already selected
    return mockCategories.filter(cat => 
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCategories.some((selected) => { return selected._id === cat._id})
    );
  }, [selectedCategories]);

   // Create a debounced version of our search function using Lodash
  // This is the magic that prevents excessive API calls
  const debouncedSearchCategories = useMemo(
    () => _.debounce(async (searchTerm) => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        // setShowDropdown(false);
        return;
      }

      // setIsLoading(true);
      try {
        const results = await searchCategories(searchTerm);
        setSuggestions(results);
        // setShowDropdown(true);
        // setHighlightedIndex(-1); // Reset keyboard navigation
      } catch (error) {
        console.error('Error searching categories:', error);
        setSuggestions([]);
      } finally {
        // setIsLoading(false);
      }
    }, 300), // Wait 300ms after user stops typing before making the API call
    [searchCategories] // Recreate the debounced function if searchCategories changes
  );

  // Cleanup function to cancel pending debounced calls when component unmounts
  useEffect(() => {
    return () => {
      debouncedSearchCategories.cancel();
    };
  }, [debouncedSearchCategories]);

  return (
    <div className='flex flex-col gap-2'>
      <SimpleInput className='w-full rounded-xl'/>
      {
         suggestions && suggestions.length > 0 ? <Suggestions categories={suggestions}/> : null
      }
    </div>
  )
}
