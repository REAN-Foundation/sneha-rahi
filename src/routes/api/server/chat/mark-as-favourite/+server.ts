import type { RequestEvent } from "@sveltejs/kit";
import { markConversation } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const PUT = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
	const request = event.request;
	const data = await request.json();
    const conversationId = data.conversationId;
	const favourite = data.favourite;

	try {
		console.log('Toggling favourite conversation...');
		const response = await markConversation(
			sessionId,
            conversationId,
			favourite
		);
        const conversation = response.Conversation;
		return new Response(JSON.stringify(conversation));
	} catch (err) {
		console.error(`Error getting conversation messages: ${err.message}`);
		return new Response(err.message);
	}
};
