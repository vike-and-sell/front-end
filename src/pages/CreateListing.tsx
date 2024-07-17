import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import { FormControl,  FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import axios from "axios";

export default function Edit () {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [ID, setID] = useState<Number>(0)
    const [location, setLocation] = useState<string>('')
    const [isTitleTouched, setIsTitleTouched] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const listingPayload = {
        sellerId: ID,
        title: title,
        price: price === '' ? 0 : parseInt(price),
        address: location,
        status: "AVAILABLE"
    };
    
    const isInvalidTitle  = isTitleTouched && title === ''
    
    const isInvalidPrice = Number.isNaN(price)

    const fetchUser = async ()=>{
        try{
            await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me`, 
                {
                    withCredentials:true
                }
            ).then( function (response) {
                const newID = Number(response.data.userId)
                setID(newID)
                setLocation(response.data.location)
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect( ()=>{
        fetchUser();
    }, []);

    const createListing = async () =>{
        try{
            await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/`,
                    listingPayload,{
                    withCredentials:true
                }
            ).then( function (response) {
                console.log("response " + response.status + " " + response.data + " " + response.statusText)
                navigate(`/listing/${response.data.listingId}`)
            });
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
    }

    const handleCreate= () =>{
        setIsError(false);
        createListing();
    }

    return (
        
        <>
            <main className='px-4'>
                <PageHeading title={"Create Listing"}></PageHeading>
                <div className="">
                    <FormControl isRequired isInvalid={isInvalidTitle}>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Title</FormLabel>
                            <Input 
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setIsTitleTouched(true);
                                }}
                                type="text"
                            >
                            </Input>
                            {isInvalidTitle ? (<FormErrorMessage className="font-semibold">Title is required.</FormErrorMessage>) : ('')}  
                        </div>
                    </FormControl>

                    <FormControl isInvalid={isInvalidPrice}>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                $
                                </InputLeftElement>
                                <Input 
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    type="number"  
                                >
                                </Input>
                            </InputGroup>
                            {isInvalidPrice ? (<FormErrorMessage className="font-semibold">Price is required.</FormErrorMessage>) : ('')} 
                        </div>
                    </FormControl>

                    <FormControl>
                        <div className="my-5 flex">
                            <PriBlueButton 
                                isDisabled={isInvalidPrice || (isInvalidTitle && isTitleTouched)}
                                clickHandle={handleCreate}
                                title="Create Listing">

                            </PriBlueButton>

                            <InverseBlueButton
                                clickHandle={() => navigate(-1)}
                                className="ml-4"
                                title="Cancel">

                            </InverseBlueButton>
                            
                        </div>
                    </FormControl>

                    {isError? (
                        <div className="text-red text-center text-xs sm:text-sm">
                            Could not create listing.
                        </div>) : ("") }                  
                    
                </div>
            </main>
        </>
        
    )
}