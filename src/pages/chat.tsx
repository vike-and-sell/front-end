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
    const [isChatLoading, setIsChatLoading] = useState<boolean>(true);
    const [isMessageLoading, setIsMessageLoading] = useState<boolean>(true);
    const [currentMessages, setCurrentMessages] = useState<MessageType[]>([]);
    const [messageError, setMessageError] = useState<string | null>(null);
    const [, updateState ] = useState({})
    const forceUpdate = useCallback(() => updateState({}), []);
    const navigate = useNavigate();

    const auth = useAuth();
    useEffect(()=>{
        if (auth){
            auth.checkUserStatus();
        }
        
        const fetchChats = async () => {
        try {
            const ChatIDResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/chats`, {
                withCredentials: true
            });
            //console.log(ChatIDResponse.data)

            const chatIDs: number[] = ChatIDResponse.data.map(Number); // Parse ChatIDs as numbers

            const chatInfoArray: ChatType[] = await Promise.all(chatIDs.map(async (chatId: number) => {
                const chatInfoResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/chats/${chatId}`, {
                    withCredentials: true
                });

                const chatUsers: string[] = chatInfoResponse.data['users'];
                const interlocutorId = chatUsers.filter((Id: string) => auth?.user && Id !== String(auth.user.userId)).join("");
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
            setIsChatLoading(false); // Set loading state to false after fetch is complete
        }
    }

    fetchChats();
    }, [])

    const truncateString = (input: string, cutoff: number) => {
        if (input.length > cutoff) {
          return input.slice(0, cutoff) + "...";
        } else {
          return input;
        }
    }

    const PfromChatPane = async (clickedChat:ChatType) => {
        setCurrentChat(clickedChat)

        try {
            const messageResponse= await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/messages/${clickedChat.chatId}`, {
                withCredentials: true
            });

            const myMessages:MessageType[] = messageResponse.data.messages 
            myMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setCurrentMessages(myMessages)
            setMessageError(null)
        }catch (error){
            setMessageError("No Messages between you and ");
            console.error("Unable to fetch messages:", error);
        }finally {
            setIsMessageLoading(false)
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

                { isChatLoading? (<ChatPaneSkeleton/>) : (
                <ChatPane 
                    ChatPaneDisplayToggle={ChatPaneDisplayToggle}
                    ChatPaneItems={chatsArray} 
                    fromChatPane = {PfromChatPane}>

                </ChatPane>) }
            </div> 

            <div className={`${ChatPaneHidden === false? 'max-sm:hidden' : ''} flex flex-col flex-grow h-screen p-3 `}> 
                <Box className=" bg-rt-dark-blue rounded-md p-3 flex">

                { isChatLoading? (<Skeleton height="20px" width="100%"></Skeleton>) : (
                    
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

                    <span className=" text-white font-bold justify-center">{currentChat ? `${currentChat.interlocutor.username} - ${truncateString(currentChat.listingInfo.title, 129)}` : ''}</span>
                    </>
                   ) }
                </Box>

                <div className="bg-whitw=e flex-grow my-5 overflow-y-auto flex-wrap container mx-auto">
                { isMessageLoading ? (
                        <div className="w-full h-full flex flex-col">
                            <Skeleton 
                                height="100%" 
                                width="100%"
                            />
                        </div>
                    ) : (

                    messageError? (
                        <div className="text-center text-red-500">{messageError + currentChat?.interlocutor.username}</div>
                    ):(
                        currentMessages.length === 0? (
                            <div className="text-center text-gray-500">No messages between you and {currentChat?.interlocutor.username}</div>
                        ):(
                            auth && auth.user && <Messages allMessages={currentMessages} user={auth.user}/>
                        )
                    ))}
                </div>

                <div className="flex flex-wrap">
                    <InputGroup>
                        <Textarea 
                            colorScheme='teal' 
                            onChange={(e) => setInput(e.target.value)} 
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