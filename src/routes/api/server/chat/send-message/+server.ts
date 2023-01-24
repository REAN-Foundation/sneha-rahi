import { sendMessage } from "../../../services/chat";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Sending conversation message...');
		const sessionId = data.sessionId;
		const conversationId = data.conversationId;
		const message = data.message;
		const senderId = data.senderId;
		const response = await sendMessage(sessionId, conversationId, message, senderId);
        return new Response(JSON.stringify(response));
	} catch (err) {
		console.error(`Error answering question: ${err.message}`);
		return new Response(err.message);
	}
};
