import { useState } from "react"
import { Avatar, Button, Input, Stack } from "@chakra-ui/react";
import { User } from "../utils/interfaces";


export interface ChatPaneProps {
    ChatPaneItems: User[]
    fromChatPane: (chat:User) => void;
    ChatPaneDisplayToggle: (status: boolean) => void;
}

export default function ChatPane({ChatPaneItems, fromChatPane, ChatPaneDisplayToggle}:ChatPaneProps) {

    const [searchQuery, setSearchQuery] = useState<string>("")

    function filterByUsername(users: User[], searchString: string): User[] {
        return users.filter(user => 
            user.username.toLowerCase().includes(searchString.toLowerCase())
        );
    }



    return(
        <div className="bg-pri-blue h-screen rounded-lg ">
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
                            _active={{ bg: '#0f4a79' }}
                            bg='rt-dark-blue'
                            className=""
                            color='#ffffff'
                            height='68px'
                            _hover={{ bg: '#0f4a79' }}
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