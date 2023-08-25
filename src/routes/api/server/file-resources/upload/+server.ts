import { upload } from '../../../services/file.resource'
import type { RequestEvent, RequestHandler } from './$types';
import * as fs from 'fs';
import * as path from 'path';
// import { Readable } from 'stream';

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

		//////////////////////////////////////////////////////////////
		let filePath = path.join(process.cwd(), `/temp/`);
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath, { recursive: true });
		}
		filePath = path.join(filePath, filename);
		console.log(filePath);
		fs.writeFileSync(filePath, fileBuffer, 'base64');
		if (fs.existsSync(filePath)) {
			console.log(Date.now().toString());
			console.log(`Copied file ${filename} to server stats/temp.`);
		}
		//const buffer = fs.readFileSync(filePath);
		//////////////////////////////////////////////////////////////

		const sessionId = event.locals.sessionUser.sessionId;

		console.log('Uploading file resource ...');

		//const buffer = Buffer.from(fileBuffer, 'base64');
		//console.log(buffer);
		//const response = await uploadBinary(
		// 	sessionId,
		// 	buffer,
		// 	filename,
		// 	true
		//);

		const response = await upload(
			sessionId,
			filePath,
			filename,
			true
		);
		console.log(JSON.stringify(response, null, 2));

		fs.unlinkSync(filePath);

		return new Response(JSON.stringify(response));

	} catch (err) {
		console.error(`Error uploading file : ${err.message}`);
		console.error(`Error stack : ${JSON.stringify(err.stack.split('\n'), null, 2)}`);
		return new Response(err.message);
	}
}) satisfies RequestHandler;
