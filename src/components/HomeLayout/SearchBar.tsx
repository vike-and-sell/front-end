import { Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className='flex items-center flex-grow gap-2 p-4'>
      <Input placeholder='Search for used...'></Input>
      <button className='bg-[#045693] p-3 rounded-md'>
        <FaSearch color='white' />
      </button>
    </div>
  );
}
