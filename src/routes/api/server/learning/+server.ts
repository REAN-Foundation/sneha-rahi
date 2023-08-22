import { getContentProgress, updateUserLearning } from '../../services/learning'

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside learning server endpoints');
		const response = await updateUserLearning(
			data.sessionId,
            data.userId,
            data.contentId,
						data.learningJourneyId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside learning server endpoints');
		const response = await getContentProgress(
			data.sessionId,
            data.userId,
            data.contentId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error updating user learning: ${err.message}`);
		return new Response(err.message);
	}
};
