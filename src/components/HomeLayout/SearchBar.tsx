import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-grow gap-2">
      <InputGroup>
        <Input
          placeholder="Search for used..."
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
        <InputRightElement>
          <button
            title="Search Button"
            className="bg-pri-blue p-3 rounded-e-md"
            onClick={() => {
              if (searchString !== "") {
                navigate(`/search/${searchString}/1`);
              }
            }}
          >
            <FaSearch color="white" />
          </button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
}
