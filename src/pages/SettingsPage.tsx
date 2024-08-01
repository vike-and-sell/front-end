import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import axios from "axios";

export default function Settings() {
  const [location, setLocation] = useState<string>("");
  const [isLocationTouched, setIsLocationTouched] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const locationRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
  const isValidLocation = locationRegex.test(location);
  const navigate = useNavigate();
  const toast = useToast();
  const fetchUser = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me`, {
          withCredentials: true,
        })
        .then(function (response) {
          setCurrentLocation(response.data.location);
        });
    } catch (error) {
      console.error("Unable to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value.toUpperCase());
    setIsLocationTouched(true);
  };

  const handleConfirm = async () => {
    try {
      toast({
        title: "Updating location...",
        status: "loading",
        duration: 10000,
        isClosable: true,
      });
      await axios
        .patch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/users/me`,
          { location: location.substring(0, 3) },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          if (response.status != 200) {
            throw new Error("Could not update location");
          }
          toast.closeAll();
          toast({
            title: "Location updated",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          setCurrentLocation(location.substring(0, 3));
        });
    } catch (error) {
      toast.closeAll();
      toast({
        title: "Failed to update",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <main className='px-4'>
        <div className='mb-3'>
          <PageHeading title={"Settings"}></PageHeading>
        </div>
        <Accordion>
          <AccordionItem>
            <AccordionButton data-cy='change-location-menu-button'>
              <Box
                as='button'
                borderRadius='md'
                px={4}
                py={2}
                className='bg-pri-blue text-white'
              >
                Change Location
                <AccordionIcon></AccordionIcon>
              </Box>
            </AccordionButton>
            <AccordionPanel>
              <div className='flex flex-col'>
                <span className='font-semibold'>Current Location</span>
                <span data-cy='current-location' className='text-acc-gray'>{currentLocation}</span>
              </div>

              <FormControl
                isRequired
                isInvalid={!isValidLocation && isLocationTouched}
              >
                <div className='my-4 md:mr-80'>
                  <FormLabel>New Location</FormLabel>
                  <Input
                    data-cy='location-input'
                    value={location}
                    onChange={handleLocationChange}
                    type='text'
                    placeholder='e.g V8W 5A2'
                  ></Input>
                  {!isValidLocation && isLocationTouched ? (
                    <FormErrorMessage className='font-semibold'>
                      Enter a valid postal code
                    </FormErrorMessage>
                  ) : (
                    ""
                  )}
                </div>
              </FormControl>

              <FormControl>
                <div className='my-5 flex'>
                  <PriBlueButton
                    data-cy='confirm-new-location-button'
                    isDisabled={!isValidLocation}
                    clickHandle={handleConfirm}
                    title='Confirm'
                  ></PriBlueButton>

                  <InverseBlueButton
                    clickHandle={() => navigate(-1)}
                    className='ml-4'
                    title='Cancel'
                  ></InverseBlueButton>
                </div>
              </FormControl>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton data-cy='change-password-menu-button'>
              <Box
                as='button'
                borderRadius='md'
                px={4}
                py={2}
                className='bg-pri-blue text-white'
              >
                Change Password
                <AccordionIcon></AccordionIcon>
              </Box>
            </AccordionButton>
            <AccordionPanel>
              <div>
                <span>Click </span>
                <button
                  data-cy='reset-link'
                  className='underline'
                  onClick={() => {
                    navigate("/unverified/recover");
                  }}
                >
                  here
                </button>
                <span> to initiate password reset.</span>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
}
