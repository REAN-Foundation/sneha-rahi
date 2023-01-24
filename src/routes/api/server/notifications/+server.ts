import { markAsRead } from '../../services/notification';

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside notification server endpoints');
		const response = await markAsRead(
			data.sessionId,
            data.notificationId,
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error updating notification: ${err.message}`);
		return new Response(err.message);
	}
};