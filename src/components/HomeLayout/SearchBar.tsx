import { Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();
  return (
    <div className='flex items-center flex-grow gap-2 p-4'>
      <Input
        placeholder='Search for used...'
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        value={searchString}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            navigate(`/search/${searchString}/1`);
          }
        }}
      ></Input>
      <button
        title='Search Button'
        className='bg-pri-blue p-3 rounded-md'
        onClick={() => {
          if (searchString !== "") {
            navigate(`/search/${searchString}/1`);
          }
        }}
      >
        <FaSearch color='white' />
      </button>
    </div>
  );
}
