import { useState } from "react"
import ChatPane from "../components/ChatPane"
import { ChatType, MessageType, User } from "../utils/interfaces";
import { mockChatPaneItems } from "../utils/mockChatPaneItems";
import { mockMessages } from "../utils/mockMessages";
import { Box, IconButton, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons"
import Messages from "../components/Messages"
import { useAuth } from "../utils/AuthContext";
import axios from "axios";

export default function Chat() {

    //const {} = useAuth()

    const mockCurrentUser:User = {
        userId: "1",
        username: "joby",
        location: "V9B",
        joiningDate: "2024-05-24T02:19:32.816610", 
        itemsSold: [],
        itemsPurchased: [],
        current: false
    }

    const getMyChats = async () => {

        try{
            const ChatIDResponse = await axios.get('http://localhost:8080/chats', 
            {
                withCredentials:true
            })
            console.log('First API call response:', ChatIDResponse.data);

            const chatIDs:number[] = ChatIDResponse.data.map(Number) // Parse ChatIDs as numbers

            const chatInfoArray:ChatType[] = []

            chatIDs.map(async (ChatId:number, index:number) => {

                const chatInfoResponse = await axios.get(`http://localhost:8080/chats/${ChatId}`, 
                    {
                        withCredentials:true
                    })

                const chatUsers:string[] = chatInfoResponse.data['users']
                const interlocutorId = chatUsers.filter((Id:string) => Id !== mockCurrentUser.userId).join("");
        
                const interlocutorResponse =  await axios.get(`http://localhost:8080/users/${interlocutorId}`, 
                    {
                        withCredentials:true
                    })

                

                const chatInfoObj = {
                    ChatId: String(ChatId),
                    ...chatInfoResponse.data,
                    interlocutor: interlocutorResponse.data
                }
                    
                chatInfoArray[index] = chatInfoObj

            })

            console.log(chatInfoArray)
        } catch (error) {

        }

        
    }

    getMyChats()

    

    const [currentChat, setCurrentChat] = useState<User>(mockChatPaneItems[0]);

    const [ChatPaneHidden, setChatPaneHidden] = useState<boolean|null>(false)

    const [input, setInput] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const filterMessagesBySenderOrReceiver = (messages: MessageType[], id: string): MessageType[] => {
        return messages.filter(message => message.senderID === id || message.receiverID === id);
    };

    const [currentMessages, setCurrentMessages] = useState<MessageType[]>(filterMessagesBySenderOrReceiver(mockMessages, currentChat.userId))

    const PfromChatPane = (clickedChat:User) => {
        setCurrentChat(clickedChat)
        setCurrentMessages(filterMessagesBySenderOrReceiver(mockMessages, clickedChat.userId))
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
                <Box className=" bg-rt-dark-blue rounded-md p-3 flex">
                    <IconButton
                        aria-label='Search database'
                        className="mr-4"
                        bg="#ffffff"
                        color='#072438'
                        display={{ base: "block", md: "none" }}
                        icon={<ArrowBackIcon/>}  
                        isRound={true}
                        onClick={() => ChatPaneDisplayToggle(false)} 
                        size='sm'
                        variant='ghost' />

                    <span className=" text-white font-bold justify-center">{currentChat.username}</span>
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
                                _hover={{ bg: '#0f4a79' }}
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