import { getAllNotificationsForUser } from '../../../../api/services/notification';
import type { PageServerLoad } from "./$types";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const allNotifications = await getAllNotificationsForUser(sessionId, userId);
        console.log(`\n All notifications = ${JSON.stringify(allNotifications, null, 2)}`);
        return {
            sessionId,
            allNotifications
        };
    }
    catch (error) {
        console.error(`Error retrieving notifications: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};
