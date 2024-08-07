import { useEffect, useState } from "react";
import ChatPane from "../components/ChatPane";
import { ChatType, MessageType } from "../utils/interfaces";
import {
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
  Skeleton,
  Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Messages from "../components/Messages";
import axios from "axios";
import ChatPaneSkeleton from "../components/Skeletons/ChatPaneSkeleton";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export interface ChatProps {
  chatID?:string
}

export default function Chat({ chatID }: ChatProps) {
  const [chatsArray, setChatsArray] = useState<ChatType[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatType | undefined>();
  const [ChatPaneHidden, setChatPaneHidden] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(true);
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(true);
  const [currentMessages, setCurrentMessages] = useState<MessageType[]>([]);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [isStringInvalid, setIsStringInvalid] = useState<boolean>(false);
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

      const chatIDs: number[] = ChatIDResponse.data.map(Number); // Parse ChatIDs as numbers
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      const chatInfoArray: ChatType[] = await Promise.all(
        chatIDs.map(async (chatId: number, index:number) => {
          await delay(500 * index); // Introduce a delay for each chat request
          const chatInfoResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/chats/${chatId}`,
            {
              withCredentials: true,
            }
          )

        const chatUsers: string[] = chatInfoResponse.data["users"];
        const interlocutorId = chatUsers
          .filter((Id: string) => auth?.user && Id !== auth.user.userId)
          .join("");

        const interlocutorResponse = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/users/${interlocutorId}`,
          {
            withCredentials: true,
          }
        );

        const listingInfoResponse = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/listings/${
            chatInfoResponse.data.listingId
          }`,
          {
            withCredentials: true,
          }
        );

        return {
          chatId: String(chatId),
          ...chatInfoResponse.data,
          listingInfo: listingInfoResponse.data,
          interlocutor: interlocutorResponse.data,
        };
      })
    );

      setChatsArray(chatInfoArray);
      
      if(chatID){
        
        const foundChat = findChatById(chatInfoArray, chatID);
        
        if (foundChat){
          setCurrentChat(foundChat);
          PfromChatPane(foundChat);
        }
        
      }else {
        if (chatInfoArray.length > 0) {
          setCurrentChat(chatInfoArray[0]);
          PfromChatPane(chatInfoArray[0]);
        }
      }

      
    } catch (error) {
      console.error("Unable to fetch chats:", error);
    } finally {
      setIsChatLoading(false); // Set loading state to false after fetch is complete
    }
  };

    fetchChats();
  }, []);

  const findChatById = (chats: ChatType[], chatId: string): ChatType | undefined => {
    return chats.find(chat => Number(chat.chatId) === Number(chatId));
  }

  const truncateString = (input: string, cutoff: number) => {
      if (input.length > cutoff) {
        return input.slice(0, cutoff) + "...";
      } else {
        return input;
      }
  }

  const getMessages = async (chatId: string | undefined) => {
    
    try {
      const messageResponse= await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/messages/${chatId}`, 
        {
          withCredentials: true
        });

      const myMessages: MessageType[] = messageResponse.data.messages;

      setCurrentMessages(myMessages);
    } catch (error) {
      setMessageError("true")
      console.error("Unable to fetch messages:", error);
    } finally {
      setIsMessageLoading(false);
    }
  };

  const PfromChatPane = async (clickedChat: ChatType ) => {
    setIsMessageLoading(true)
    setMessageError(null)
    setCurrentChat(clickedChat);
    getMessages(clickedChat.chatId);
  };

  const ChatPaneDisplayToggle = (status: boolean) => {
    setChatPaneHidden(status);
  };

  const sendMessage = async (text: string) => {
    try {
      setMessageError(null)
      if(text === ""){
        setIsStringInvalid(true)
        return
      }
      const sendResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/messages/${
          currentChat?.chatId
        }`,
        {
          content: text,
        },
        {
          withCredentials: true,
        }
      );

      if (sendResponse.status === 401) {
        navigate("/login");
      }
      getMessages(currentChat?.chatId);
      setInput("");
    } catch (error) {
      console.error("Unable to send message. Please try again later:", error);
    } finally {
      setIsMessageLoading(false);
    }
  };

  

  return (
    <div className='flex flex-row h-screen'>
      <div
        className={`${
          ChatPaneHidden === true ? "max-sm:hidden" : ""
        } w-full sm:max-w-max sm:basis-1/5 h-screen `}
      >
        {isChatLoading ? (
          <ChatPaneSkeleton />
        ) : (
          <ChatPane
            ChatPaneDisplayToggle={ChatPaneDisplayToggle}
            ChatPaneItems={chatsArray}
            fromChatPane={PfromChatPane}
          ></ChatPane>
        )}
      </div>

      <div
        className={`${
          ChatPaneHidden === false ? "max-sm:hidden" : ""
        } flex flex-col flex-grow h-screen p-3 `}
      >
        <Box className=' bg-rt-dark-blue rounded-md p-3 flex'>
          {isChatLoading ? (
            <Skeleton borderRadius='md' height='20px' width='100%' />
          ) : (
            <>
              <IconButton
                aria-label='Search database'
                className='mr-4'
                bg='#ffffff'
                color='#072438'
                display={{ base: "block", md: "none" }}
                icon={<ArrowBackIcon />}
                isRound={true}
                onClick={() => ChatPaneDisplayToggle(false)}
                size='sm'
                pb={1}
                variant='ghost'
              />

              <span className=' text-white font-bold justify-center'>
                {currentChat
                  ? `${currentChat.interlocutor.username} - ${truncateString(
                      currentChat.listingInfo.title,
                      129
                    )}`
                  : ""}
              </span>
            </>
          )}
        </Box>

        <div className='bg-whitw=e flex-grow my-5 overflow-y-auto flex-wrap container mx-auto'>
          {isMessageLoading ? (
            <div className='w-full h-full flex flex-col'>
              <Skeleton borderRadius='lg' height='100%' width='100%' />
            </div>
          ) : messageError ? (
            <div className='text-center text-red-500'>
              No messages between you and {currentChat?.interlocutor.username}
            </div>
          ) : currentMessages.length === 0 ? (
            <div className='text-center text-gray-500'>
              No messages between you and {currentChat?.interlocutor.username}
            </div>
          ) : (
            auth &&
            auth.user && (
              <Messages allMessages={currentMessages} user={auth.user} />
            )
          )}
        </div>

        <div className='flex flex-wrap' data-cy="text-area">
          <InputGroup>
            <Textarea
              colorScheme='teal'
              isInvalid={isStringInvalid}
              onChange={(e) => {
                setInput(e.target.value);
                setIsStringInvalid(false)
              }}
              onKeyDown={(e)=> {
                if (e.key == "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={
                currentChat
                  ? `Message ${currentChat.interlocutor.username}`
                  : "Select a chat to start messaging"
              }
              resize='none'
              size='md'
              value={input}
              data-cy="text-area"
              

            />
            <InputRightElement pt={8} width='4rem'>
              <IconButton
                aria-label='Search database'
                bg='#166aac'
                _hover={{ bg: "#0f4a79" }}
                icon={<ArrowUpIcon color='white' />}
                isRound={true}
                onClick={() => {
                  sendMessage(input);
                }}
                
                size='sm'
              />
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
