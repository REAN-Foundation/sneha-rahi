import { getAllLocationForNgo } from '../../../services/user';

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Inside location server endpoints');
		const locations = await getAllLocationForNgo(data.tenantId);
		return new Response(JSON.stringify(locations));
	} catch (err) {
		console.error(`Error retrieving locations: ${err.message}`);
		return new Response(err.message);
	}
};
