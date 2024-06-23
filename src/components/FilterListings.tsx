import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Radio,
  RadioGroup,
  Divider,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FilterOptions } from "../utils/interfaces";
import DefaultButton from "./Button";
import { useState, useEffect, useRef } from "react";

export default function FilterListing() {
  const [active, setActive] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: "",
    isDescending: true,
    maxPrice: "",
    minPrice: "",
  });

  function toggleFilter() {
    setActive((prevActive) => !prevActive);
    console.log(active);
  }

  // Sets up event listener to toggle on / off the filter menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
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
            <FilterMenu
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            ></FilterMenu>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

interface FilterMenuProps {
  filterOptions: FilterOptions;
  setFilterOptions: (updatedFilterOptions: FilterOptions) => void;
}

function FilterMenu({ filterOptions, setFilterOptions }: FilterMenuProps) {
  const [sortBy, setSortBy] = useState(filterOptions.sortBy);
  const [isDescending, setIsDescending] = useState(filterOptions.isDescending);
  const [maxPrice, setMaxPrice] = useState(filterOptions.maxPrice);
  const [minPrice, setMinPrice] = useState(filterOptions.minPrice);

  function handleSortBy(nextValue: string) {
    setSortBy(nextValue);
  }

  function handleOrderBy(nextValue: string) {
    setIsDescending(nextValue === "desc" ? true : false);
  }

  function handleMinPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(e.target.value);
  }

  function handleMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(e.target.value);
  }

  function submitFilterOptions() {
    setFilterOptions({ sortBy, isDescending, maxPrice, minPrice });
  }

  return (
    <div className="absolute bg-white shadow rounded-xl p-4 top-[110%]">
      <FormControl>
        <div className="flex flex-col gap-2">
          <FormLabel>Sort by</FormLabel>
          <div>
            <RadioGroup name="sort-by" onChange={handleSortBy}>
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
              <InputGroup onChange={handleMinPrice}>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" placeholder="0" />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Max Price:</FormLabel>
              <InputGroup onChange={handleMaxPrice}>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" placeholder="0" />
              </InputGroup>
            </div>
          </div>
          <Divider></Divider>
          <div>
            <FormLabel>Order By</FormLabel>
            <RadioGroup defaultValue="desc" onChange={handleOrderBy}>
              <HStack spacing="24px">
                <Radio value="asc">Ascending</Radio>
                <Radio value="desc">Descending</Radio>
              </HStack>
            </RadioGroup>
          </div>
          <DefaultButton
            title="Submit"
            clickHandle={submitFilterOptions}
          ></DefaultButton>
        </div>
      </FormControl>
    </div>
  );
}
