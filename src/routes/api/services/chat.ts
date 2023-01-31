import { BACKEND_API_URL } from "$env/static/private";
import { delete_, get_, post_, put_ } from "./common";

////////////////////////////////////////////////////////////////

export const startConversation = async (sessionId: string, userId: string, otherUserId: string) => {
    const url = BACKEND_API_URL + '/chats/conversations/start';
    const body = {
        InitiatingUserId: userId,
        OtherUserId: otherUserId
    };
    return await post_(sessionId, url, body);
};

export const sendMessage = async (sessionId: string, conversationId: string, message: string, senderId: string) => {
    const url = BACKEND_API_URL + `/chats/conversations/${conversationId}/messages`;
    const body = {
        Message: message,
        SenderId: senderId,
    };
    return await post_(sessionId, url, body);
};

export const getConversationsBetweenTwoUsers = async (sessionId: string, userId: string, otherUserId: string) => {
    const url = BACKEND_API_URL + `/chats/conversations/first-user/${userId}/second-user/${otherUserId}`;
    return await get_(sessionId, url);
};

export const getConversationMessages = async (sessionId: string, conversationId: string) => {
    const url = BACKEND_API_URL + `/chats/conversations/${conversationId}/messages`;
    return await get_(sessionId, url);
};

export const getConversationById = async (sessionId: string, conversationId: string) => {
    const url = BACKEND_API_URL + `/chats/conversations/${conversationId}`;
    return await get_(sessionId, url);
};

export const markConversation = async (sessionId: string, conversationId: string, favourite = true) => {
    const url = BACKEND_API_URL + `/chats/conversations/${conversationId}`;
    const body = {
        Marked: favourite,
    };
    return await put_(sessionId, url, body);
};

export const getMessageById = async (sessionId: string, messageId: string) => {
    const url = BACKEND_API_URL + `/chats/messages/${messageId}`;
    return await get_(sessionId, url);
};

export const updateMessageById = async (sessionId: string, messageId: string, newMessage: string) => {
    const url = BACKEND_API_URL + `/chats/messages/${messageId}`;
    const body = {
        Message: newMessage,
    };
    return await put_(sessionId, url, body);
};

export const deleteMessage = async (sessionId: string, messageId: string) => {
    const url = BACKEND_API_URL + `/chats/messages/${messageId}`;
    return await delete_(sessionId, url);
};

export const getMyFavouriteConversations = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/chats/users/${userId}/conversations/marked`;
    return await get_(sessionId, url);
};

export const getMyRecentConversations = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/chats/users/${userId}/conversations/recent`;
    return await get_(sessionId, url);
};

export const deleteConversation = async (sessionId: string, conversationId: string) => {
    const url = BACKEND_API_URL + `/chats/conversations/${conversationId}`;
    return await delete_(sessionId, url);
};

export const searchUserConversations = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/chats/users/${userId}/conversations/search`;
    return await get_(sessionId, url);
};