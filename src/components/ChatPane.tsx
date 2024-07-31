import { useState } from "react"
import { Avatar, Button, Input, Stack } from "@chakra-ui/react";
import { ChatType } from "../utils/interfaces";


export interface ChatPaneProps {
    ChatPaneItems: ChatType[]
    fromChatPane: (chat:ChatType) => void;
    ChatPaneDisplayToggle: (status: boolean) => void;
}

const truncateString = (input: string, cutoff: number) => {
    if (input.length > cutoff) {
      return input.slice(0, cutoff) + "...";
    } else {
      return input;
    }
}

export default function ChatPane({ChatPaneItems, fromChatPane, ChatPaneDisplayToggle}:ChatPaneProps) {

    const [searchQuery, setSearchQuery] = useState<string>("")

    function filterByUsername(chats: ChatType[], searchString: string): ChatType[] {
        return chats.filter(chat => 
            chat.interlocutor.username.toLowerCase().includes(searchString.toLowerCase()) || 
            chat.listingInfo.title.toLowerCase().includes(searchString.toLowerCase())
        );
    }


    return(
        <div className="bg-pri-blue h-screen rounded-lg flex flex-col" data-cy="chat-pane">
            <div className="sticky top-0 z-10 bg-pri-blue p-3">
                <Input
                    background='white' 
                    borderRadius='full'
                    className="mt-3"
                    data-cy="chat-pane-input"
                    fontWeight='semibold'
                    onChange={(e) => setSearchQuery(e.target.value)}  
                    placeholder='Find a chat' 
                    _placeholder={{ opacity: 1, color: 'gray.500', fontFamily:'Inter'}}>
                        
                </Input>
            </div>

            <div className="flex-grow overflow-y-auto p-3">
                <Stack direction="column" spacing={3}>
                {filterByUsername(ChatPaneItems, searchQuery).map((chat:ChatType, index:number) => {
                    return(
                        <Button
                            _active={{ bg: '#0f4a79' }}
                            bg='rt-dark-blue'
                            className=""
                            color='#ffffff'
                            data-cy="chat-pane-item"
                            height='68px'
                            _hover={{ bg: '#0f4a79' }}
                            key={index}
                            onClick={() => {
                                fromChatPane(chat);
                                ChatPaneDisplayToggle(true);
                                
                                }
                            }>
                                <div className="mr-2">
                                    <Avatar

                                        name = {chat.interlocutor.username}
                                        size='sm'

                                    />
                                </div>

                                <div className="mx-auto">
                                    {truncateString(chat.interlocutor.username, 15)}
                                </div>
                        </Button>
                    )}          
                )}
                </Stack>
            </div>
                

            
        </div>
    )
    
}