import { takeNoticeAction } from '../../../services/linkages';

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log ("Taking action on notice...",data);
	try {
		console.log('Taking action against linkage...');
		const response = await takeNoticeAction(
			data.sessionId,
            data.noticeId,
            data.userId ,
			data.action,
			data.title,
			data.resourceId
		);
        const noticeAction = response.NoticeAction;
		return new Response(JSON.stringify(noticeAction));
	} catch (err) {
		console.error(`Error creating notice action: ${err.message}`);
		return new Response(err.message);
	}
};
