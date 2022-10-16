
import { createNoticeAction } from '../../services/linkages';

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log ("data.........",data);
	try {
		console.log('Inside learning server endpoints');
		const response = await createNoticeAction(
			data.sessionId,
            data.noticeId,
            data.userId ,
			data.action,
			data.title,
			data.resourceId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error creating notice action: ${err.message}`);
		return new Response(err.message);
	}
};