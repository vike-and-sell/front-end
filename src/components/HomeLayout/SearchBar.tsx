import { Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import axios from "axios";

export default function SearchBar() {
  const [searchString, setSearchString] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSearchHistory = async () => {
    try {
      const searchHistoryResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/me/searches`,
        {
          withCredentials: true,
        }
      );

      const allSearchHistory: string[] = searchHistoryResponse.data;
      setSearchHistory(getUniqueSearches(allSearchHistory.reverse()));
    } catch (error) {
      console.error("Unable to fetch search history:", error);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  useEffect(() => {
    if (location.pathname.includes(`/search/${searchString}`)) {
    } else {
      setSearchString("");
    }
  }, [location]);

  const filteredSearchHistory = searchHistory.filter((searchItem: string) =>
    searchItem.toLowerCase().includes(searchString)
  );

  const getUniqueSearches = (searchHistory: string[]) => {
    return searchHistory
      .filter(
        (searchItem, index, self) =>
          index ===
          self.findIndex(
            (duplicateSearchItem) => duplicateSearchItem === searchItem
          )
      )
      .filter((searchItem) => searchItem.trim() !== "");
  };

  return (
    <div className='flex items-center flex-grow gap-2 p-4 z-10'>
      <AutoComplete
        listAllValuesOnFocus={true}
        maxSuggestions={10}
        openOnFocus={true}
        onSelectOption={(item) => {
          setSearchString(item.item.value);
          navigate(`/search/${item.item.value}/1`);
          fetchSearchHistory();
        }}
        restoreOnBlurIfEmpty={false}
        suggestWhenEmpty={true}
      >
        <AutoCompleteInput
          className='search-bar'
          placeholder='Search for used...'
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              navigate(`/search/${searchString}/1`);
              fetchSearchHistory();
            }
          }}
        />
        {filteredSearchHistory.length > 0 && (
          <AutoCompleteList>
            {searchHistory.map((search: string, index: number) => (
              <AutoCompleteItem
                key={`${index + search}`}
                value={search}
                align='center'
              >
                <Text ml='4'>{search}</Text>
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        )}
      </AutoComplete>
      <button
        title='Search Button'
        className='bg-pri-blue p-3 rounded-md'
        onClick={() => {
          if (searchString !== "") {
            navigate(`/search/${searchString}/1`);
            fetchSearchHistory();
          }
        }}
      >
        <FaSearch color='white' />
      </button>
    </div>
  );
}
