import React, { createContext, useState, useContext, ReactNode } from 'react';

type FilterContextType = {
  showOnlyUnchecked: boolean;
  toggleShowOnlyUnchecked: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [showOnlyUnchecked, setShowOnlyUnchecked] = useState(false);

  const toggleShowOnlyUnchecked = () => {
    setShowOnlyUnchecked(prev => !prev);
  };

  return (
    <FilterContext.Provider value={{ showOnlyUnchecked, toggleShowOnlyUnchecked }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
