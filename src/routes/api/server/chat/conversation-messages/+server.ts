import type { RequestEvent } from "@sveltejs/kit";
import { getConversationMessages } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const conversationId = event.url.searchParams.get('conversationId');
	try {
		console.log('Getting conversation messages...');
		const response = await getConversationMessages(
			sessionId,
            conversationId,
		);
        const messages = response.ConversationMessages;
		return new Response(JSON.stringify(messages));
	} catch (err) {
		console.error(`Error getting conversation messages: ${err.message}`);
		return new Response(err.message);
	}
};
