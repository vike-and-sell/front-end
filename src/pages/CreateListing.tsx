import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import { CreateListing, User } from "../utils/interfaces";
import { FormControl,  FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import axios from "axios";

export default function Edit () {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<string>('')
    const [ID, SetID] = useState<Number>(0)
    const [isTitleTouched, setIsTitleTouched] = useState<boolean>(false);
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [listingPayload, setListingPayload] = useState<CreateListing>({
        sellerId: 1,
        title: "",
        price: 0,
        address: "1145 Royal Oak Dr, Victoria, BC V8X 3T7",
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
                const newID = Number(response.data.userId)
                SetID(newID)
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
            const response = await axios.post('http://localhost:8080/listings/',
                    listingPayload,{
                    withCredentials:true
                }
            ).then( function (response) {
                setIsCreated(true);
                console.log("response " + response.status + " " + response.data + " " + response.statusText)
            });
        } catch (error) {
            setIsError(true)
            console.log(error)
        }
    }

    const handleCreate= () =>{
        setIsError(false);
        setIsCreated(false);
        setListingPayload({
            sellerId: ID,
            title: title,
            price: price === '' ? 0 : parseInt(price),
            address: "1145 Royal Oak Dr, Victoria, BC V8X 3T7",
            status: "AVAILABLE"
        });
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
                                onChange={(e) => {setTitle(e.target.value); setIsTitleTouched(true);}}
                                type="text"
                            >
                            </Input>
                            {isInvalidTitle ? (<FormErrorMessage className="font-semibold">Title is required.</FormErrorMessage>) : ('')}  
                        </div>
                    </FormControl>

                    <FormControl isRequired isInvalid={isInvalidPrice}>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                $
                                </InputLeftElement>
                                <Input 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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