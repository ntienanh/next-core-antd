import React from 'react';

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const timerRef = React.useRef();

  React.useEffect(() => {
    timerRef.current === setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

// https://www.telerik.com/blogs/how-to-create-custom-debounce-hook-react
