import { Input, Skeleton, Stack } from "@chakra-ui/react";

export default function ChatPaneSkeleton() {

    return(
        <div className="bg-pri-blue h-screen rounded-lg ">
            <Stack direction='column' spacing={3} className="mx-3" >
                <Input
                    className="mt-3"
                    background='white' 
                    borderRadius='full' 
                    fontWeight='semibold'
                    
                    placeholder='Find a chat' 
                    _placeholder={{ opacity: 1, color: 'gray.500', fontFamily:'Inter'}}>
                        
                </Input>

                <>
                    <Skeleton height="65px" width="100%"></Skeleton>
                    <Skeleton height="65px" width="100%"></Skeleton>
                    <Skeleton height="65px" width="100%"></Skeleton>
                    <Skeleton height="65px" width="100%"></Skeleton>
                    <Skeleton height="65px" width="100%"></Skeleton>
                    <Skeleton height="65px" width="100%"></Skeleton>
                </>
                

            </Stack>
        </div>
    )
    
}