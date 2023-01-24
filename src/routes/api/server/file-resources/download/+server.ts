import type { RequestEvent } from '@sveltejs/kit';
import {
    download,
} from '../../../services/file.resource'

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const data = await event.request.json();
	const asAttachment = event.params.asAttachment;
	try {
		console.log('Downloading file resource...');
		const response = await download(
			data.sessionId,
            data.fileResourceId,
			asAttachment == 'true' ? true : false
		);
		return response;
	} catch (err) {
		console.error(`Error downloading file resource: ${err.message}`);
		return new Response(err.message);
	}
};
