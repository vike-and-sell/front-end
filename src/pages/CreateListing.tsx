import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import { CreateListing, User } from "../utils/interfaces";
import { FormControl,  FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import { createListing, fetchUser } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Edit () {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [location, SetLocation] = useState<string>("")
    const [isTitleTouched, setIsTitleTouched] = useState<boolean>(false);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [listingPayload, setListingPayload] = useState<CreateListing>({
        title: title,
        price: price,
        location: location,
        status: "AVAILABLE"
      });
    
    const isInvalidTitle  = isTitleTouched && title === ''
    
    const isInvalidPrice = Number.isNaN(price)

    const fetchUser = async ()=>{
        try{
            const res = await axios.get('http://localhost:8080/users/me', 
                {
                    withCredentials:true
                }
            ).then( function (response) {
                SetLocation(response.data.location)
                console.log("response " + response.status + " " + response.data + " " + response.statusText)
            })
        } catch (error) {
            console.log(error)
            setIsError(true);
        }

    }

    useEffect( ()=>{
        fetchUser();
    }, []);

    const createListing = async () =>{
        try{
            const res = await axios.post('http://localhost:8080/request_account', 
                {
                    listingPayload
                },{
                    withCredentials:false
                }
            ).then( function (response) {
                setIsCreated(true);
                console.log("response " + response.status + " " + response.data + " " + response.statusText)
            })
        } catch (error) {
            setIsError(true)
            console.log(error)
        }

    }

    const handleCreate= () =>{
        setIsError(false);
        setIsCreated(false);
        setListingPayload({
            title: title,
            price: price,
            location: location,
            status: "AVAILABLE"
        });
        createListing();
    }

    return (
        
        <>
            <main className='px-4'>
                <PageHeading title={"Create Listing"}></PageHeading>
                <div className="">
                    <FormControl isInvalid={isInvalidTitle}>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Title*</FormLabel>
                            <Input 
                                onChange={(e) => {setTitle(e.target.value); setIsTitleTouched(true);}}
                                type="text"
                                value={title}
                            >
                            </Input>
                            {isInvalidTitle ? (<FormErrorMessage className="font-semibold">Title is required.</FormErrorMessage>) : ('')}  
                        </div>
                    </FormControl>

                    <FormControl isInvalid={isInvalidPrice}>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Price*</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                $
                                </InputLeftElement>
                                <Input 
                                    onChange={(e) => setPrice(parseInt(e.target.value))}
                                    type="number"
                                    value={price}  
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

                    {isCreated? (
                        <div className="text-pri-blue text-center text-xs sm:text-sm">
                            Listing created!
                        </div>) : ("") }    

                    {isError? (
                        <div className="text-red text-center text-xs sm:text-sm">
                            Could not create listing.
                        </div>) : ("") }                  
                    
                </div>
            </main>
        </>
        
    )
}