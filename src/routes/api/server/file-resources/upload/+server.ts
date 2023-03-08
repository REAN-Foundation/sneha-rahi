import { uploadBinary } from '../../../services/file.resource'
import type { RequestEvent, RequestHandler } from './$types';
import * as fs from 'fs';

//////////////////////////////////////////////////////////////

export const POST = (async (event: RequestEvent) => {

	try {
		console.log(`Upload in progress---`);

		console.log(JSON.stringify(event, null, 2));

		const data_ = await event.request.json();
		//console.log(data_);
		const params: URLSearchParams = event.url.searchParams;
		console.log(`search params : ` + params);
		const filename = event.request.headers.get('filename');
		console.log(filename);

		const fileBuffer = data_['image'];
		const filePath = filename;
		fs.writeFileSync(filePath, fileBuffer, 'base64');

		if (fs.existsSync(filePath)) {
			console.log(Date.now().toString());
			console.log(`Copied file ${filename} to server stats/temp.`);
		}

		const sessionId = event.locals.sessionUser.sessionId;
		const buffer = fs.readFileSync(filePath);

		console.log('Uploading file resource ...');
		//const location = path.join(process.cwd(), filePath);
		const response = await uploadBinary(
			sessionId,
			buffer,
			filename,
			true
		);
		console.log(JSON.stringify(response, null, 2));

		fs.unlinkSync(filePath);

		return new Response(JSON.stringify(response));

	} catch (err) {
		//console.error(`Error uploading file: ${err.message}`);
		console.error(`Error uploading file: ${JSON.stringify(err.stack.split('\n'), null, 2)}`);
		return new Response(err.message);
	}
}) satisfies RequestHandler;
