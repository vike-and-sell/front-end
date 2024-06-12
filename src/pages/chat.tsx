import { useState } from "react"
import ChatPane from "../components/ChatPane"
import { ChatPaneItem } from "../components/ChatPane"
import { Box, IconButton, Input } from "@chakra-ui/react"
import { ArrowBackIcon, ArrowUpIcon } from "@chakra-ui/icons"


export default function Chat() {

    const mockdata:ChatPaneItem[] = [
        {
            username: "joby",
            current: false
        },
        {
            username: "joby2",
            current: false
        },
        {
            username: "joby3",
            current: false
        }
    ]

    const [header, setHeader] = useState("Header");

    const [ChatPaneHidden, setChatPaneHidden] = useState<boolean|null>(false)

    const PfromChatPane = (clickedChat:string) =>{
        setHeader(clickedChat)
    }

    const ChatPaneDisplayToggle = (status: boolean) =>{
        setChatPaneHidden(status)
    }

    return(
        
        <div className="flex flex-row h-screen">
            
            <div className={`${ChatPaneHidden === true? 'max-sm:hidden' : ''} w-full sm:max-w-max sm:basis-1/5 h-screen `}>
                <ChatPane ChatPaneItems={mockdata} fromChatPane = {PfromChatPane} ChatPaneDisplayToggle={ChatPaneDisplayToggle}></ChatPane>
            </div> 

            <div className={`${ChatPaneHidden === false? 'max-sm:hidden' : ''} flex flex-col flex-grow h-screen p-3 `}> 
                <Box className=" bg-acc-gray rounded-md p-3">
                    <IconButton
                        aria-label='Search database' 
                        icon={<ArrowBackIcon/>}  
                        onClick={() => ChatPaneDisplayToggle(false)} 
                        variant='ghost' />

                    
                    <span className="">{header}</span>
                </Box>

                <div className="bg-teal-500 grow my-5">
                    Chat Area
                </div>

                <div className="flex">
                    <Input colorScheme='teal'></Input>
                    <IconButton isRound ={true} aria-label='Search database' icon={<ArrowUpIcon />} />
                </div>
            </div> 

           
        </div>
            
        
    )
}