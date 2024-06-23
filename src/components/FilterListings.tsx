import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
  Radio,
  RadioGroup,
  Divider,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import DefaultButton from "./Button";
import { useState, useEffect, useRef } from "react";

export default function FilterListing() {
  const [active, setActive] = useState(false);
  const filterMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  function toggleFilter() {
    setActive((prevActive) => !prevActive);
    console.log(active);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setActive(false); // Close the menu if clicked outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div ref={toggleButtonRef}>
          <DefaultButton
            title="Filter"
            clickHandle={toggleFilter}
          ></DefaultButton>
        </div>
        {active ? (
          <div ref={filterMenuRef}>
            <FilterMenu></FilterMenu>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function FilterMenu() {
  return (
    <div className="absolute bg-white shadow rounded-xl p-4 top-[110%]">
      <FormControl>
        <div className="flex flex-col gap-2">
          <FormLabel>Sort by</FormLabel>
          <div>
            <RadioGroup>
              <HStack spacing="24px">
                <Radio value="date">Date</Radio>
                <Radio value="distance">Distance</Radio>
                <Radio value="price">Price</Radio>
              </HStack>
            </RadioGroup>
          </div>
          <Divider></Divider>
          <div className="flex gap-4">
            <div>
              <FormLabel>Min Price:</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" placeholder="0" />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Max Price:</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" placeholder="0" />
              </InputGroup>
            </div>
          </div>
          <Divider></Divider>
          <div>
            <FormLabel>Order By</FormLabel>
            <RadioGroup defaultValue="desc">
              <HStack spacing="24px">
                <Radio value="asc">Ascending</Radio>
                <Radio value="desc">Descending</Radio>
              </HStack>
            </RadioGroup>
          </div>
          <DefaultButton title="Submit"></DefaultButton>
        </div>
      </FormControl>
    </div>
  );
}
