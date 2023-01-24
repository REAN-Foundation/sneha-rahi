import type { RequestEvent } from "@sveltejs/kit";
import { getConversationsBetweenTwoUsers } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.cookies.get('sessionId');
    const userId = event.url.searchParams.get('userId');
    const otherUserId = event.url.searchParams.get('otherUserId');

	try {
        console.log(`otherUserId = ${otherUserId}`);
		console.log('Getting conversation between two users...----------');
		const response = await getConversationsBetweenTwoUsers(
			sessionId,
            userId,
            otherUserId,
		);
        if (response === null) {
            return new Response(`null`);
        }
        const c = response?.Conversation;
        console.log(`Conversation = ${JSON.stringify(c, null, 2)}`);
        let conversation = {};
        if (c) {
            const otherUserId = userId === c.InitiatingUserId ? c.OtherUserId : c.InitiatingUserId;
            const otherUser = userId === c.InitiatingUserId ? {
                id: c.OtherUser.id,
                FirstName: c.OtherUser.FirstName,
                LastName: c.OtherUser.LastName,
                Prefix: c.OtherUser.Prefix,
                DisplayName: c.OtherUser.DisplayName,
            }: {
                id: c.InitiatingUser.id,
                FirstName: c.InitiatingUser.FirstName,
                LastName: c.InitiatingUser.LastName,
                Prefix: c.InitiatingUser.Prefix,
                DisplayName: c.InitiatingUser.DisplayName,
            };
            conversation = {
                id: c.id,
                Marked: c.Marked,
                UserId: userId === c.InitiatingUserId ? c.InitiatingUserId : c.OtherUserId,
                OtherUserId: otherUserId,
                OtherUser: otherUser,
            }
        }
		return new Response(JSON.stringify(conversation));
	} catch (err) {
		console.error(`Error getting conversation between the users: ${err.message}`);
		return new Response(err.message);
	}
};
