
import type { PageServerLoad } from "./$types";
import {  getConversationById, getConversationMessages, getConversationsBetweenTwoUsers, startConversation } from "../../../../api/services/chat";
import { ASK_SNEHA_USER_ID, BACKEND_API_URL } from '$env/static/private';
import hrt from 'human-readable-time';
import { getUserById } from "../../../../api/services/user";
import { getDateSegregatedMessages } from "../chat/[conversationId]/conversation.utils";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    const otherUserId = ASK_SNEHA_USER_ID
    try {
        const _user = await getUserById(sessionId, userId);
        const user = _user.Patient;
        const startConversations = await startConversation (sessionId,userId ,otherUserId);
        console.log("startConversations", startConversations);
        const getConversation_ = await getConversationsBetweenTwoUsers(sessionId,userId ,otherUserId)
        console.log("conversation", getConversation_ );
        const conversationId = startConversations.Conversation.id;
        const ImageResourceId = startConversations.Conversation.InitiatingUser.ImageResourceId;
        const profileImage = (BACKEND_API_URL + `/file-resources/${ImageResourceId}/download?disposition=inline`);
        const messages_ = await getConversationMessages(sessionId, conversationId);
        const messages = await getDateSegregatedMessages(messages_.ConversationMessages);
        // const conversation_ = await getConversationById(sessionId, conversationId);
        // const conversation = getConversationDetails(userId, conversation_.Conversation);
        return {
            sessionId,
            userId,
            user,
            messages,
            conversationId,
            otherUserId,
            profileImage,
            // conversation,
        };
    }
    catch (error) {
        console.log(error.stack);
        console.error(`Error retrieving data related to conversation: ${error.message}`);
        return {
            location: `/users/${userId}/home`,
        };
    }
};
const getConversationDetails = (userId, x) => {
    // const profileImage = userId === x.OtherUser.id ? x.InitiatingUser.ProfileImage : x.OtherUser.ProfileImage;
    const profileImage = userId === x.OtherUser.id ? (BACKEND_API_URL + `/file-resources/${x.InitiatingUser.ImageResourceId}/download?disposition=inline`): (BACKEND_API_URL + `/file-resources/${x.OtherUser.ImageResourceId}/download?disposition=inline`);
    return {
        id: x.id,
        favourite: x.Marked,
        otherUserId: userId === x.OtherUser.id ? x.InitiatingUser.id : x.OtherUser.id,
        displayName: userId === x.OtherUser.id ? x.InitiatingUser.DisplayName : x.OtherUser.DisplayName,
        firstName: userId === x.OtherUser.id ? x.InitiatingUser.FirstName : x.OtherUser.FirstName,
        lastName: userId === x.OtherUser.id ? x.InitiatingUser.LastName : x.OtherUser.LastName,
        prefix: userId === x.OtherUser.id ? x.InitiatingUser.Prefix : x.OtherUser.Prefix,
        profileImage: profileImage ?? null,
        lastChatDate: hrt(new Date(x.LastMessageTimestamp), '%relative% ago'),
    }
}

// export const load: PageServerLoad = async (event) => {
//     try {
//         const sessionId = event.cookies.get('sessionId');
//         const userId = event.params.userId;
//         const _user = await getUserById(sessionId, userId);
//         const favouriteConversations_ = await getMyFavouriteConversations(sessionId, userId);
//         const recentConversations_ = await getMyRecentConversations(sessionId, userId);
//         const favouriteConversations = favouriteConversations_.Conversations.map(x => getConversationDetails(userId, x));
//         const recentConversations = recentConversations_.Conversations.map(x => getConversationDetails(userId, x));
//         const user = _user.Patient;
//         return {
//             sessionId,
//             userId,
//             favouriteConversations,
//             recentConversations,
//             user
//         };
//     }
//     catch (error) {
//         console.log(error.stack)
//         console.error(`Error retrieving data related to user's favourite and recent conversations: ${error.message}`);
//         return {
//             location: `/sign-in`,
//         };
//     }
// };
