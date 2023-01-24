import type { RequestEvent } from "@sveltejs/kit";
import { deleteConversation } from "../../../../../routes/api/services/chat";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
	console.log("sessionId",sessionId)
	const request = event.request;
	const data = await request.json();
	console.log("data",data );
	try {
		const response = await deleteConversation(
            data.sessionId,
            data.conversationId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting conversation: ${err.message}`);
		return new Response(err.message);
	}
};