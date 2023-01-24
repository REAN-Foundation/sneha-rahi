
import { askQuery } from "../../services/ask-sneha";

//////////////////////////////////////////////////////////////

export const POST = async ({ request }) => {
	const data = await request.json();
	try {
		console.log('Asking Query');
		const message = data.message;
		const type = "text";
		const phone = data.phone ;
		const response = await askQuery(message, phone, type);
        return new Response(JSON.stringify(response));
	} catch (err) {
		console.error(`Error answering question: ${err.message}`);
		return new Response(err.message);
	}
};
