import {
    getFileResourceById} from '../../../services/file.resource'

//////////////////////////////////////////////////////////////

export const GET = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Getting file resource details...');
		const response = await getFileResourceById(
			data.sessionId,
            data.fileResourceId,
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error getting file resource details: ${err.message}`);
		return new Response(err.message);
	}
};
