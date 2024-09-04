import { User } from "../User";

export interface ChatMessageDto {
    // id: number;
    senderId: number;
    sender?: User; 
    receiverId: number;
    receiver?: User;
    content?: string;
    timestamp: Date;
    channel?: string;
}
