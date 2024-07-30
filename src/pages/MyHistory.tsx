import PageHeading from "../components/PageHeading";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser } from '../utils/api';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import PaginatedListings from '../components/PaginatedListings';
import { useQuery } from "@tanstack/react-query";
import ErrorPage from '../pages/ErrorPage';
import axios from "axios";

export default function MyHistory(){
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isInit, setIsInit] = useState<boolean>(false);
    const [accordionItems, setAccordionItems] = useState([
        { title: 'Purchased', index: 0, ids: [], page: 1 },
        { title: 'Sold', index: 1, ids: [], page: 1 }
    ]);
    const navigate = useNavigate();
    const { option, page } = useParams();

    const handleToggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    useEffect(() => {
        if(openIndex != null){
            console.log("opening pg, openIndex: " + openIndex)
            navigate(`/myprofile/${accordionItems[openIndex].title}/${accordionItems[openIndex].page}`)
        }
    }, [openIndex]);

    useEffect(() => {
        if (!page || page === null) {
            setAccordionItems(prevItems => prevItems.map(item => ({ ...item, page: 1 })));
            setOpenIndex(null);
        } else {
            setAccordionItems(prevItems => prevItems.map(item => 
                item.title === option ? { ...item, page: +page } : item
            ));
        }

        console.log("rerender")
    }, [page]);

    const { 
        data: userInfo, 
        isFetching, 
        isError, 
        error
    } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => fetchUser(),
        enabled: !isInit
    });

    useEffect(() => {
        if (userInfo) {
            setAccordionItems(prevItems => [
                { ...prevItems[0], ids: userInfo.itemsPurchased },
                { ...prevItems[1], ids: userInfo.itemsSold }
            ]);
          setIsInit(true);
        }
    }, [userInfo]);

    if(isError){
        const errorMessage = axios.isAxiosError(error) && error.response ? error.response.data.message : error.message;
        return <ErrorPage>{errorMessage}</ErrorPage>;
    }

    return (
        <main className='px-4'>
            <PageHeading title='Transaction History' />
            <Accordion allowToggle>
                {accordionItems.map((item) => (
                    <AccordionItem key={item.index}>
                    <AccordionButton onClick={() => handleToggle(item.index)}>
                        <Box borderRadius='md' className='text-white bg-pri-blue py-2 w-28'>
                            {item.title}
                            <AccordionIcon />
                        </Box>
                    </AccordionButton>
                    <AccordionPanel>
                        {isFetching ? (
                            <div>Loading...</div>
                        ):(
                            <PaginatedListings
                                listingIds={item.ids}
                                accordionIndex={item.index}
                                indexTitle={item.title}
                                isOpen={openIndex === item.index}
                            />
                        )}
                        
                    </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </main>
    );
};