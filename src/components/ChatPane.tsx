import { useState } from "react"
import { Avatar, Button, Input, Stack } from "@chakra-ui/react";
import { ChatPaneProps, User} from "../utils/interfaces";

export default function ChatPane({ChatPaneItems, fromChatPane, ChatPaneDisplayToggle}:ChatPaneProps) {



    const [searchQuery, setSearchQuery] = useState<string>("")

    function filterByUsername(users: User[], searchString: string): User[] {
        return users.filter(user => 
            user.username.toLowerCase().includes(searchString.toLowerCase())
        );
    }



    return(
        <div className="bg-rt-dark-blue h-screen ">
            <Stack direction='column' spacing={3} className="mx-3" >
                <Input
                    className="mt-3"
                    background='white' 
                    borderRadius='full' 
                    fontWeight='semibold'
                    onChange={(e) => setSearchQuery(e.target.value)}  
                    placeholder='Find a chat' 
                    
                    _placeholder={{ opacity: 1, color: 'gray.500', fontFamily:'Inter'}}>
                        
                </Input>

                <>
                {filterByUsername(ChatPaneItems, searchQuery).map((chat:User, index:number) => {
                    return(
                        <Button
                            _active={{ bg: '#166aac' }}
                            bg='rt-dark-blue'
                            className=""
                            color='#ffffff'
                            height='68px'
                            _hover={{ bg: '#166aac' }}
                            onClick={() => {
                                fromChatPane(chat);
                                ChatPaneDisplayToggle(true);
                                }
                            }>
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