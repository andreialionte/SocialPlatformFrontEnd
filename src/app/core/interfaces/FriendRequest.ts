import { RequestStatus } from "./enums/RequestStatus";
import { User } from "./User";

export interface FriendRequest {
    id: number;
    senderId: number;
    sender?: User; 
    recipientId: number;
    recipient?: User; 
    requestedAt: Date;
    respondedAt?: Date; 
    status?: RequestStatus; 
  }