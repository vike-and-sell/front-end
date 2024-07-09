import { useEffect, useRef } from "react"
import { MessageType, User} from "../utils/interfaces";
import { format, isEqual } from "date-fns";

export interface MessageProps {
    allMessages: MessageType[]
    user:User
}

export default function Messages({allMessages, user}:MessageProps){
    const scrollRef = useRef<HTMLDivElement|null>(null)

    const formatTimestamp = (unixNum:number) => {
        return format(unixNum, "hh:mm aaa")
    }

    const formatDate = (unixNum:number) => {
        return format(unixNum, "eeee',' MMMM d yyyy")
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [allMessages]);
    

    return(
        <div id = "messages" className="flex h-full flex-1 flex-col gap-4 p-3 overflowy-auto">
            
            {allMessages.map((message:MessageType, index) =>{
                const isUser = message.senderID === user.userId
                
                var isSameMessageDate = false
                if(index > 0){
                    const prevMessageDate = formatDate(allMessages[index - 1]?.timestamp)
                    const currMessageDate = formatDate(allMessages[index].timestamp)
                    isSameMessageDate = isEqual(prevMessageDate, currMessageDate)
                }
                
                return(
                    <div key={`${message.messageID}-${message.timestamp}`}>
                        <div className={`flex font-bold place-content-center`}>
                            {isSameMessageDate === true? '' : formatDate(message.timestamp)}
                        </div>
                        <div className={`flex items-end ${isUser === true? 'justify-end' : ''}`} >
                            <div className={`flex flex-col-space-y-2 text-base max-w-xs -mx-2 ${isUser === true? 'order-1 items-end' : 'order-2 items-start'}`}>
                                <span className={`px-4 py-2 rounded-lg inline-block ${isUser === true? 'bg-pri-blue text-white' : ' bg-stone-200 text-gray-700'}`}>
                                    {message.messageContent}{' '}
                                    <span className={`ml-2 text-xs text-gray-400`}>
                                        {formatTimestamp(message.timestamp)}
                                    </span>
                                </span>
                                
                            </div>
                            <div className={`relatitems-end ${isUser === true? 'justify-end' : ''}` }></div>
                        </div>
                    </div>
                )
                }
            )}
            <div ref ={scrollRef}/>
        </div>
    )

}