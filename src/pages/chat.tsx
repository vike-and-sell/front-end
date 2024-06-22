import { useState } from "react"
import ChatPane from "../components/ChatPane"
import { MessageType, User } from "../utils/interfaces";
import { mockChatPaneItems } from "../utils/mockChatPaneItems";
import { mockMessages } from "../utils/mockMessages";
import { Box, IconButton, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons"
import Messages from "../components/Messages"

export default function Chat() {
    

    const mockCurrentUser:User = {
        userID: "1",
        username: "jobyprime",
        email: "jobs@uvic.ca",
        current:false
    }

    const [currentChat, setCurrentChat] = useState<User>(mockChatPaneItems[0]);

    const [ChatPaneHidden, setChatPaneHidden] = useState<boolean|null>(false)

    const [input, setInput] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const filterMessagesBySenderOrReceiver = (messages: MessageType[], id: string): MessageType[] => {
        return messages.filter(message => message.senderID === id || message.receiverID === id);
    };

    const [currentMessages, setCurrentMessages] = useState<MessageType[]>(filterMessagesBySenderOrReceiver(mockMessages, currentChat.userID))

    const PfromChatPane = (clickedChat:User) => {
        setCurrentChat(clickedChat)
        setCurrentMessages(filterMessagesBySenderOrReceiver(mockMessages, clickedChat.userID))
        console.log(currentMessages)
    }

    const ChatPaneDisplayToggle = (status: boolean) => {
        setChatPaneHidden(status)
    }

    const sendMessage = (text:string) => {
    }

    return(
        
        <div className="flex flex-row h-screen">
            
            <div className={`${ChatPaneHidden === true? 'max-sm:hidden' : ''} w-full sm:max-w-max sm:basis-1/5 h-screen `}>
                <ChatPane 
                    ChatPaneDisplayToggle={ChatPaneDisplayToggle}
                    ChatPaneItems={mockChatPaneItems} 
                    fromChatPane = {PfromChatPane}>

                </ChatPane>
            </div> 

            <div className={`${ChatPaneHidden === false? 'max-sm:hidden' : ''} flex flex-col flex-grow h-screen p-3 `}> 
                <Box className=" bg-acc-gray rounded-md p-3">
                    <IconButton
                        aria-label='Search database'
                        className="mr-4"
                        icon={<ArrowBackIcon/>}  
                        isRound={true}
                        onClick={() => ChatPaneDisplayToggle(false)} 
                        variant='ghost' />

                    <span className=" text-white font-bold">{currentChat.username + " ID-" + currentChat.userID}</span>
                </Box>

                <div className="bg-whitw=e flex-grow my-5 overflow-y-auto flex-wrap container mx-auto">
                    <Messages allMessages={currentMessages} user={mockCurrentUser}/>
                </div>

                <div className="flex flex-wrap">
                    <InputGroup>
                        <Textarea 
                            colorScheme='teal' 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder={`Message ${currentChat.username}`}
                            resize="none"
                            size="md"
                            
                        />
                        <InputRightElement width='4rem'>
                            <IconButton 
                                aria-label='Search database'
                                bg="#166aac"
                                _hover={{ bg: '#1e40af' }}
                                icon={<ArrowUpIcon color='white' />}
                                isRound ={true} 
                                onClick ={() => sendMessage(input)} 
                                size="sm"  
                            />
                        </InputRightElement>

                    </InputGroup>
                    
                </div>
            </div> 
           
        </div>
            
    )
}