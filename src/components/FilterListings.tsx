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
import DefaultButton, { DefaultFillButton } from "./Button";
import { useState, useEffect, useRef } from "react";

interface FilterListingProps {
  filterOptions: FilterOptions;
  disableLocation: boolean;
  setFilterOptions: (updatedFilterOptions: FilterOptions) => void;
}

export default function FilterListing({
  filterOptions,
  disableLocation,
  setFilterOptions,
}: FilterListingProps) {
  const [active, setActive] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLDivElement>(null);

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
      <div className='relative z-0'>

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
              disableLocation={disableLocation}
              setFilterOptions={setFilterOptions}
              setActive={setActive}
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
  disableLocation: boolean;
  setFilterOptions: (updatedFilterOptions: FilterOptions) => void;
  setActive: (isActive: boolean) => void;
}

function FilterMenu({
  filterOptions,
  disableLocation,
  setFilterOptions,
  setActive,
}: FilterMenuProps) {
  const [sortBy, setSortBy] = useState(filterOptions.sortBy);
  const [isDescending, setIsDescending] = useState(filterOptions.isDescending);
  const [maxPrice, setMaxPrice] = useState(filterOptions.maxPrice);
  const [minPrice, setMinPrice] = useState(filterOptions.minPrice);
  const [status, setStatus] = useState(filterOptions.status);

  function handleSortBy(nextValue: string) {
    type SortBy = "price" | "created_on" | "distance" | "";
    setSortBy(nextValue as SortBy);
  }

  function handleOrderBy(nextValue: string) {
    setIsDescending(nextValue === "desc" ? true : false);
  }

  function handleStatus(nextValue: string) {
    type ItemStatus = "" | "SOLD" | "AVAILABLE" | undefined;
    setStatus(nextValue as ItemStatus);
  }

  function handleMinPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(e.target.value);
  }

  function handleMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(e.target.value);
  }

  function submitFilterOptions() {
    setFilterOptions({ sortBy, isDescending, maxPrice, minPrice, status });
    setActive(false);
  }

  function clearFilterOptions() {
    setFilterOptions({
      sortBy: "",
      isDescending: true,
      maxPrice: "",
      minPrice: "",
      status: "",
    });
    setActive(false);
  }

  return (

    <div className="absolute bg-white shadow rounded-xl p-4 top-[110%]">
      <FormControl>
        <div className="flex flex-col gap-2">
          <FormLabel>Sort by</FormLabel>
          <div>
            <RadioGroup
              name="sort-by"
              onChange={handleSortBy}
              defaultValue={filterOptions.sortBy}
            >
              <HStack spacing="24px">
                <Radio value="created_on">Date</Radio>
                {disableLocation ? (
                  ""
                ) : (
                  <Radio value="distance">Distance</Radio>
                )}
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
                <Input
                  type="number"
                  placeholder="0"
                  defaultValue={filterOptions.minPrice}
                />
              </InputGroup>
            </div>
            <div>
              <FormLabel>Max Price:</FormLabel>
              <InputGroup onChange={handleMaxPrice}>
                <InputLeftAddon>$</InputLeftAddon>
                <Input
                  type="number"
                  placeholder="0"
                  defaultValue={filterOptions.maxPrice}
                />
              </InputGroup>
            </div>
          </div>
          <Divider></Divider>
          <div>
            <FormLabel>Order By</FormLabel>
            <RadioGroup
              defaultValue={filterOptions.isDescending ? "desc" : "asc"}
              onChange={handleOrderBy}
            >
              <HStack spacing="24px">
                <Radio value="asc">Ascending</Radio>
                <Radio value="desc">Descending</Radio>
              </HStack>
            </RadioGroup>
          </div>
          <Divider></Divider>
          <div>
            <FormLabel>Listing Status</FormLabel>
            <RadioGroup
              defaultValue={filterOptions.status}
              onChange={handleStatus}
            >
              <HStack spacing="24px">
                <Radio value="AVAILABLE">Available</Radio>
                <Radio value="SOLD">Sold</Radio>
              </HStack>
            </RadioGroup>
          </div>
          <div className="flex gap-4">
            <DefaultFillButton
              title="Clear"
              clickHandle={clearFilterOptions}
            ></DefaultFillButton>
            <DefaultFillButton
              title="Apply"
              clickHandle={submitFilterOptions}
            ></DefaultFillButton>
          </div>
        </div>
      </FormControl>
    </div>
  );
}
