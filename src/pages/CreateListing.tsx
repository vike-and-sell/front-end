import PageHeading from "../components/PageHeading";
import { useParams } from "react-router-dom";
import { getListingInfoFromID } from "../utils/FakeListingsMock";
import { Listing } from "../utils/interfaces";
import { Button, FormControl,  FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useState } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";

export default function Edit () {

    const { listingID } = useParams();

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [status, setStatus] = useState<string>("")

    const isInvalid = () =>{

    }

    const handleEdit= () =>{

    }

    return (
        
        <>
            <main className='px-4'>
                <PageHeading title={"Create Listing"}></PageHeading>
                <div className="">
                    <FormControl>
                        <div className="my-4 md:mr-80">
                            <FormLabel>Title*</FormLabel>
                            <Input 
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title}
                            >
                            </Input>
                        </div>

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
                            
                        </div>

                        <div className="my-5 flex">
                            <PriBlueButton 
                                clickHandle={handleEdit}
                                title="Create">

                            </PriBlueButton>

                            <InverseBlueButton
                                clickHandle={handleEdit}
                                className="ml-4"
                                title="Cancel">

                            </InverseBlueButton>
                            
                        </div>

                        
                    </FormControl>

                    
                    
                </div>
            </main>
        </>
        
    )
}