import { BACKEND_API_URL } from "$env/static/private";
import { get_, put_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllNotificationsForUser = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/general/notifications/search?userId=${userId}`;
    return await get_(sessionId, url);
};

export const markAsRead = async (sessionId: string, notificationId: string) => {
    const updates = {};
    const url = BACKEND_API_URL + `/general/notifications/${notificationId}/mark-as-read`;
    return await put_(sessionId, url, updates);
};