import type { PageServerLoad } from "./$types";
import { getMyFavouriteConversations, getMyRecentConversations } from "../../../../api/services/chat";
import { BACKEND_API_URL, ASK_SNEHA_USER_ID } from "$env/static/private";
import { TimeHelper } from "$lib/utils/time.helper";
////////////////////////////////////////////////////////////////////////

const getConversationDetails = (userId, x) => {

    const profileImage = userId === x.OtherUser.id ? (BACKEND_API_URL + `/file-resources/${x.InitiatingUser.ImageResourceId}/download?disposition=inline`): (BACKEND_API_URL + `/file-resources/${x.OtherUser.ImageResourceId}/download?disposition=inline`);
    // const profileImage = userId === x.OtherUser.id ? x.InitiatingUser.ProfileImage : x.OtherUser.ProfileImage;
    return {
        id: x.id,
        favourite: x.Marked,
        otherUserId: userId === x.OtherUser.id ? x.InitiatingUser.id : x.OtherUser.id,
        displayName: userId === x.OtherUser.id ? x.InitiatingUser.DisplayName : x.OtherUser.DisplayName,
        firstName: userId === x.OtherUser.id ? x.InitiatingUser.FirstName : x.OtherUser.FirstName,
        lastName: userId === x.OtherUser.id ? x.InitiatingUser.LastName : x.OtherUser.LastName,
        prefix: userId === x.OtherUser.id ? x.InitiatingUser.Prefix : x.OtherUser.Prefix,
        profileImage: profileImage ?? null,
        lastChatDate: TimeHelper.getHumanReadableDate(x.LastMessageTimestamp),
    }
}


export const load: PageServerLoad = async ({cookies, params, depends}) => {
    try {
        const sessionId = cookies.get('sessionId');
        const userId = params.userId;
        const askSnehaUserId = ASK_SNEHA_USER_ID;
        const favouriteConversations_ = await getMyFavouriteConversations(sessionId, userId);
        const recentConversations_ = await getMyRecentConversations(sessionId, userId);
        console.log("recentConversations_",recentConversations_);
        const recentConversationsWithoutSnahaUser = recentConversations_.Conversations.filter((Conversations) => Conversations.OtherUserId != askSnehaUserId );
        const favouriteConversations = favouriteConversations_.Conversations.map(x => getConversationDetails(userId, x));
        const recentConversations = recentConversationsWithoutSnahaUser.map(x => getConversationDetails(userId, x));
        depends('app:chat');
        return {
            sessionId,
            userId,
            favouriteConversations,
            recentConversations,
        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's favourite and recent conversations: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
