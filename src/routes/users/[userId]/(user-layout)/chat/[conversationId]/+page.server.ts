import type { PageServerLoad } from "./$types";
import { getConversationById, getConversationMessages } from "../../../../../api/services/chat";
import { BACKEND_API_URL } from '$env/static/private';
import hrt from 'human-readable-time';
import { getDateSegregatedMessages } from './conversation.utils';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    const conversationId = event.params.conversationId;
    try {
        const messages_ = await getConversationMessages(sessionId, conversationId);
        const messages = await getDateSegregatedMessages(messages_.ConversationMessages);
        const conversation_ = await getConversationById(sessionId, conversationId);
        const conversation = getConversationDetails(userId, conversation_.Conversation);
        return {
            sessionId,
            userId,
            messages,
            conversation,
        };
    }
    catch (error) {
        console.log(error.stack);
        console.error(`Error retrieving data related to conversation: ${error.message}`);
        return {
            location: `/users/${userId}/chat`,
        };
    }
};

const getConversationDetails = (userId, conversation) => {
    //console.log(`x = ${JSON.stringify(conversation, null, 2)}`);

    const profileImage = userId === conversation.OtherUser.id ? (BACKEND_API_URL + `/file-resources/${conversation.InitiatingUser.ImageResourceId}/download?disposition=inline`): (BACKEND_API_URL + `/file-resources/${conversation.OtherUser.ImageResourceId}/download?disposition=inline`);
    // const profileImage = userId === conversation.OtherUser.id ? conversation.InitiatingUser.ProfileImage : conversation.OtherUser.ProfileImage;
    return {
        id: conversation.id,
        favourite: conversation.Marked ?? false,
        otherUserId: userId === conversation.OtherUser.id ? conversation.InitiatingUser.id : conversation.OtherUser.id,
        displayName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.DisplayName : conversation.OtherUser.DisplayName,
        firstName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.FirstName : conversation.OtherUser.FirstName,
        lastName: userId === conversation.OtherUser.id ? conversation.InitiatingUser.LastName : conversation.OtherUser.LastName,
        prefix: userId === conversation.OtherUser.id ? conversation.InitiatingUser.Prefix : conversation.OtherUser.Prefix,
        profileImage: profileImage ?? null,
        lastChatDate: hrt(new Date(conversation.LastMessageTimestamp), '%relative% ago'),
    }
};

