// Import necessary hooks from React
import { useState, useEffect } from "react";

// Custom hook for debouncing values
export const useDebounce = (value, delay) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Effect to handle debouncing
  useEffect(() => {
    // Create a timer that updates the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if value changes before delay expires
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
};
