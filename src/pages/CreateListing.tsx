import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import { Listing } from "../utils/interfaces";
import { FormControl,  FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { useState } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";

export default function Edit () {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [status, setStatus] = useState<string>("AVAILABLE")
    const [isTitleTouched, setIsTitleTouched] = useState<boolean>(false);
    
    const isInvalidTitle  = isTitleTouched && title === ''
    
    const isInvalidPrice = Number.isNaN(price)


    const handleCreate= () =>{

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

                    
                    
                </div>
            </main>
        </>
        
    )
}