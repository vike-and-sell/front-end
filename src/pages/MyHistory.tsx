import PageHeading from "../components/PageHeading";
import { useState, useEffect } from 'react';
import { fetchUser } from '../utils/api';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import PaginatedListings from '../components/PaginatedListings';
import { useQuery } from "@tanstack/react-query";
import ErrorPage from '../pages/ErrorPage';
import axios from "axios";

export default function MyHistory(){
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [purchasedIds, setPurchasedIds] = useState<number[]>([]);
    const [soldIds, setSoldIds] = useState<number[]>([]);
    const [isInit, setIsInit] = useState<boolean>(false);

    const handleToggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const accordionItems = [
        { title: 'Purchased', index: 1, ids: purchasedIds },
        { title: 'Sold', index: 2, ids: soldIds }
    ];

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
          setPurchasedIds(userInfo.itemsPurchased);
          setSoldIds(userInfo.itemsSold);
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