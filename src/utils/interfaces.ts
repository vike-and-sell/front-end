export interface User {
    userID: string
    username: string
    email: string,
    current?: boolean
}

export interface ChatPaneProps {
    ChatPaneItems: User[]
    fromChatPane: (chat:User) => void;
    ChatPaneDisplayToggle: (status: boolean) => void;
}

export interface MessageType {
    messageID: string,
    messageContent: string,
    senderID: string,
    receiverID:string,
    timestamp:number
}

export interface MessageProps {
    allMessages: MessageType[]
    user:User
}