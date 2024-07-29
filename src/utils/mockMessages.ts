import { MessageType } from "./interfaces";

export const mockMessages: MessageType[] = [
    {
        messageId: "1",
        content: "Hey there! How's it going?",
        senderId: "1",
        receiverID: "2",
        timestamp: new Date(1623645000000).toISOString()
    },
    {
        messageId: "2",
        content: "Pretty good, thanks! How about you?",
        senderId: "2",
        receiverID: "1",
        timestamp: new Date(1623645060000).toISOString()
    },
    {
        messageId: "3",
        content: "I'm doing well, just working on some stuff.",
        senderId: "1",
        receiverID: "3",
        timestamp: new Date(1623645120000).toISOString()
    },
    {
        messageId: "4",
        content: "Cool! What are you working on?",
        senderId: "3",
        receiverID: "1",
        timestamp: new Date(1623645180000).toISOString()
    },
    {
        messageId: "5",
        content: "Just a coding project. You?",
        senderId: "1",
        receiverID: "4",
        timestamp: new Date(1623645240000).toISOString()
    },
    {
        messageId: "6",
        content: "Nice! I'm just reading a book.",
        senderId: "4",
        receiverID: "1",
        timestamp: new Date(1623645300000).toISOString()
    },
    {
        messageId: "7",
        content: "Which book are you reading?",
        senderId: "1",
        receiverID: "2",
        timestamp: new Date(1623645360000).toISOString()
    },
    {
        messageId: "8",
        content: "It's called 'The Pragmatic Programmer'.",
        senderId: "2",
        receiverID: "1",
        timestamp: new Date(1623645420000).toISOString()
    },
    {
        messageId: "9",
        content: "That's a great book! I'm a big fan.",
        senderId: "1",
        receiverID: "3",
        timestamp: new Date(1623645480000).toISOString()
    },
    {
        messageId: "10",
        content: "Me too! It's very insightful.",
        senderId: "3",
        receiverID: "1",
        timestamp: new Date(1623645540000).toISOString()
    },
    {
        messageId: "11",
        content: "Another message here.",
        senderId: "3",
        receiverID: "1",
        timestamp: new Date(1623645600000).toISOString()
    },
    {
        messageId: "12",
        content: "Yet another message.",
        senderId: "3",
        receiverID: "1",
        timestamp:new Date(1623645660000).toISOString()
    },
    {
        messageId: "13",
        content: "Me too! It's very insightful.",
        senderId: "3",
        receiverID: "1",
        timestamp: new Date(1623645720000).toISOString()
    },
    {
        messageId: "14",
        content: "That's a great book! I'm a big fan.",
        senderId: "1",
        receiverID: "3",
        timestamp: new Date(1623645780000).toISOString()
    }
];