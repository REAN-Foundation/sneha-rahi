import { getRaahiFeed } from '../../../services/newsfeed';

//////////////////////////////////////////////////////////////

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside newsfeed server endpoints');
		const feed = await getRaahiFeed(
			data.sessionId
		);
		return new Response(feed);
	} catch (err) {
		console.error(`Error retrieving Raahi newsfeed: ${err.message}`);
		return new Response(err.message);
	}
};