import { createContext, ReactNode, useContext, useState } from "react";

interface ISavedSearchContext {
    activeSavedSearch: string | undefined,
    setActiveSavedSearch: React.Dispatch<React.SetStateAction<string | undefined>>
}

const SavedSearchContext = createContext<ISavedSearchContext|undefined>(undefined)

export const SavedSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeSavedSearch, setActiveSavedSearch] = useState<string | undefined>(undefined)
    return (
        <SavedSearchContext.Provider value={{activeSavedSearch, setActiveSavedSearch}}>
            {children}
        </SavedSearchContext.Provider>
    )
}

export const useSavedSearch = (): ISavedSearchContext => {
  const context = useContext(SavedSearchContext);
  if (!context) {
    throw new Error("useSavedSearch must be used in a SavedSearchProvider");
  }
  return context;
};