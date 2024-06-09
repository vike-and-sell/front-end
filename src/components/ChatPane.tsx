import { Avatar, Button, IconButton, Input, Stack } from "@chakra-ui/react";


export interface ChatPaneItem {
    username: string,
    current: boolean
}

export interface ChatPaneProps {
    ChatPaneItems: ChatPaneItem[]
}


export default function ChatPane({ChatPaneItems}:ChatPaneProps) {
    return(
        <div className="bg-rt-dark-blue h-screen ">
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
                {ChatPaneItems.map((chat, index) => {
                    return(
                        <Button
                            _active={{ bg: '#166aac' }}
                            bg='rt-dark-blue'
                            className=""
                            color='#ffffff'
                            height='68px'
                            
                            _hover={{ bg: '#166aac' }}>

                                <div className="">
                                    <Avatar size='md' />
                                </div>

                                <div className="mx-auto">
                                    {chat.username}
                                </div>
                        </Button>
                    )}          
                )}
                </>
                

            </Stack>
        </div>
    )
    
}