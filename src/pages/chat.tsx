import { useRef, useState } from "react"
import ChatPane from "../components/ChatPane"
import { ChatPaneItem } from "../components/ChatPane"
import { IconButton, Input } from "@chakra-ui/react"
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


    const windowWidth = useRef(window.innerWidth);

    return(
        
        <div className="flex flex-col sm:flex-row h-screen">
            
            <div className={`w-full sm:max-w-max sm:basis-1/5 h-screen sm:visible ${ChatPaneHidden === false ? '' : 'hidden'}`}>
                <ChatPane ChatPaneItems={mockdata} fromChatPane = {PfromChatPane} ChatPaneDisplayToggle={ChatPaneDisplayToggle}></ChatPane>
            </div> 

            <div className={`sm:flex flex-col flex-grow h-screen p-3 sm:visible ${ChatPaneHidden === true ? '' : 'sm:hidden'}`}> 
                <div className=" bg-acc-gray rounded-sm p-3">
                    <IconButton className= "" aria-label='Search database'  onClick={() => {setChatPaneHidden(false)}} icon={<ArrowBackIcon/>} />
                    <span>{header + ChatPaneHidden + windowWidth.current}</span>
                </div>

                <div className="bg-teal-500 grow my-5">
                    Chat Area
                </div>

                <div className="flex">
                    <Input colorScheme='teal'></Input>
                    <IconButton aria-label='Search database' icon={<ArrowUpIcon />} />
                </div>
            </div> 

           
        </div>
            
        
        
    )
}