import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { Button, FormControl,  FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Box,Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import axios from "axios";

export default function Settings () {
    const [location, setLocation] = useState<string>('')
    const [isLocationTouched, setIsLocationTouched] = useState<boolean>(false)
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const locationRegex =  /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/
    const isValidLocation = locationRegex.test(location) || true
    const navigate = useNavigate();

    const fetchUser = async ()=>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me`, 
                {
                    withCredentials:true
                }
            ).then( function (response) {
                setCurrentLocation(response.data.location)
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect( ()=>{
        fetchUser();
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLocation(e.target.value.toUpperCase());
        setIsLocationTouched(true);
    }

    const handleConfirm = async () =>{
        try{
            await axios.patch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/1`,
                    {location: location.substring(0,3)},{
                    withCredentials:true
                }
            ).then( function (response) {
                console.log("response " + response.status + " " + response.data + " " + response.statusText);
                //reload
                setCurrentLocation(location.substring(0,3))
            });
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <main className='px-4'>
                <PageHeading title={"Settings"}></PageHeading>

                <Accordion>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as='button' borderRadius='md' px={4} py={2} className='bg-pri-blue text-white'>
                                Change Location
                                <AccordionIcon></AccordionIcon>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel>
                            <div className='flex flex-col'>
                                <span className='font-semibold'>Current Location</span>
                                <span className='text-acc-gray'>{currentLocation}</span>  
                            </div>
                            
                            <FormControl isRequired isInvalid={!isValidLocation && isLocationTouched}>
                                <div className="my-4 md:mr-80">
                                    <FormLabel>New Location</FormLabel>
                                    <Input 
                                        value={location}
                                        onChange={handleLocationChange}
                                        type="text"
                                    >
                                    </Input>
                                    {!isValidLocation && isLocationTouched ? (
                                        <FormErrorMessage className="font-semibold">Enter a valid postal code</FormErrorMessage>
                                    ) : ('')}  
                                </div> 
                            </FormControl>

                            <FormControl>
                                <div className="my-5 flex">
                                    <PriBlueButton 
                                        isDisabled={!isValidLocation}
                                        clickHandle={handleConfirm}
                                        title="Confirm">

                                    </PriBlueButton>

                                    <InverseBlueButton
                                        clickHandle={() => navigate(-1)}
                                        className="ml-4"
                                        title="Cancel">

                                    </InverseBlueButton>
                                    
                                </div>
                            </FormControl>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as='button' borderRadius='md' px={4} py={2} className='bg-pri-blue text-white'>
                                Change Password
                                <AccordionIcon></AccordionIcon>
                            </Box>
                        </AccordionButton>
                        <AccordionPanel>
                            <div>
                                <span>Click </span>
                                <button className='underline'
                                    onClick={() => {
                                        navigate('/unverified/recover')
                                    }}>
                                    here
                                </button>
                                <span> to initiate password reset.</span>
                            </div>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                
            </main>
        </>
    )
}