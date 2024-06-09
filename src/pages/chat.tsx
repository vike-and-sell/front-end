import { useEffect, useState } from "react"
import ChatPane from "../components/ChatPane"
import { ChatPaneItem } from "../components/ChatPane"
import { IconButton, Input } from "@chakra-ui/react"
import { ArrowUpIcon } from "@chakra-ui/icons"


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

    return(
        
        <div className="flex flex-col sm:flex-row h-screen">
            
            <div className="w-full sm:max-w-max sm:basis-1/5 h-screen">
                <ChatPane ChatPaneItems={mockdata}></ChatPane>
            </div> 

            <div className="hidden sm:flex sm:flex-col sm:flex-grow h-screen p-3"> 
                <div className=" bg-acc-gray rounded-sm p-3">
                    <span>Header</span>
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