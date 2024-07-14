import { useCallback, useEffect, useState } from "react"
import ChatPane from "../components/ChatPane"
import { ChatType, MessageType } from "../utils/interfaces";
import { Box, IconButton, InputGroup, InputRightElement, Skeleton, Textarea } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons"
import Messages from "../components/Messages"
import axios from "axios";
import ChatPaneSkeleton from "../components/Skeletons/ChatPaneSkeleton";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Chat() {

    const [chatsArray, setChatsArray] = useState<ChatType[]>([]);
    const [currentChat, setCurrentChat] = useState<ChatType | null>(null);
    const [ChatPaneHidden, setChatPaneHidden] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentMessages, setCurrentMessages] = useState<MessageType[]>([]);
    const [, updateState ] = useState({})
    const forceUpdate = useCallback(() => updateState({}), []);
    const navigate = useNavigate();

    const { user, checkUserStatus } = useAuth();
    useEffect(()=>{
        checkUserStatus()
        const fetchChats = async () => {
        try {
            const ChatIDResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/chats`, {
                withCredentials: true
            });

            const chatIDs: number[] = ChatIDResponse.data.map(Number); // Parse ChatIDs as numbers

            const chatInfoArray: ChatType[] = await Promise.all(chatIDs.map(async (chatId: number) => {
                const chatInfoResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/chats/${chatId}`, {
                    withCredentials: true
                });

                const chatUsers: string[] = chatInfoResponse.data['users'];
                const interlocutorId = chatUsers.filter((Id: string) => Id !== String(user.userId)).join("");
                const interlocutorResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${interlocutorId}`, {
                    withCredentials: true
                });

                const listingInfoResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/${chatInfoResponse.data.listingId}`, {
                    withCredentials: true
                });


                return {
                    chatId: String(chatId),
                    ...chatInfoResponse.data,
                    listingInfo: listingInfoResponse.data,
                    interlocutor: interlocutorResponse.data
                };
            }));

            setChatsArray(chatInfoArray);
            if (chatInfoArray.length > 0) {
                setCurrentChat(chatInfoArray[0]);
                PfromChatPane(chatInfoArray[0])
            }
        } catch (error) {
            console.error("Unable to fetch chats:", error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetch is complete
        }
    }

    fetchChats();
    }, [])

    const PfromChatPane = async (clickedChat:ChatType) => {
        setCurrentChat(clickedChat)

        try {
            const messageResponse= await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/messages/${clickedChat.chatId}`, {
                withCredentials: true
            });

            const myMessages:MessageType[] = messageResponse.data.messages 

            setCurrentMessages(myMessages)
        }catch (error){
            console.error("Unable to fetch messages:", error);
        }
    }

    const ChatPaneDisplayToggle = (status: boolean) => {
        setChatPaneHidden(status)
    }

    const sendMessage = async (text:string) => {
        try{
            const sendResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/messages/${currentChat?.chatId}`, 
                {
                    content: text,
                },
                {
                    withCredentials: true
                }   
        );
        
        if(sendResponse.status === 401){
            navigate("/login")

        }
        setCurrentMessages(prevMessages => [...prevMessages])
        setInput("")

        } catch(error){
            console.error("Unable to send message. Please try again later:", error);
        }
    }

    return(
        
        <div className="flex flex-row h-screen">
            
            <div className={`${ChatPaneHidden === true? 'max-sm:hidden' : ''} w-full sm:max-w-max sm:basis-1/5 h-screen `}>

                { isLoading? (<ChatPaneSkeleton/>) : (
                <ChatPane 
                    ChatPaneDisplayToggle={ChatPaneDisplayToggle}
                    ChatPaneItems={chatsArray} 
                    ChatPaneItems={chatsArray} 
                    fromChatPane = {PfromChatPane}>

                </ChatPane>) }
            </div> 

            <div className={`${ChatPaneHidden === false? 'max-sm:hidden' : ''} flex flex-col flex-grow h-screen p-3 `}> 
                <Box className=" bg-rt-dark-blue rounded-md p-3 flex">

                { isLoading? (<Skeleton height="20px" width="100%"></Skeleton>) : (
                    
                    <>
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

                    <span className=" text-white font-bold justify-center">{currentChat ? `${currentChat.interlocutor.username} - ${currentChat.listingInfo.title}` : ''}</span>
                    </>
                   ) }
                </Box>

                <div className="bg-whitw=e flex-grow my-5 overflow-y-auto flex-wrap container mx-auto">
                    <Messages allMessages={currentMessages} user={user}/>
                </div>

                <div className="flex flex-wrap">
                    <InputGroup>
                        <Textarea 
                            colorScheme='teal' 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder={currentChat ? `Message ${currentChat.interlocutor.username}` : 'Select a chat to start messaging'}
                            placeholder={currentChat ? `Message ${currentChat.interlocutor.username}` : 'Select a chat to start messaging'}
                            resize="none"
                            size="md"
                            value = {input}
                            
                        />
                        <InputRightElement width='4rem'>
                            <IconButton 
                                aria-label='Search database'
                                bg="#166aac"
                                _hover={{ bg: '#0f4a79' }}
                                icon={<ArrowUpIcon color='white' />}
                                isRound ={true} 
                                onClick ={() => {sendMessage(input); forceUpdate}} 
                                size="sm"  
                            />
                        </InputRightElement>

                    </InputGroup>
                    
                </div>
            </div> 
           
        </div>
            
    )
}