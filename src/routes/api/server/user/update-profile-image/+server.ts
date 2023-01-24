import type { RequestEvent } from "@sveltejs/kit";
import { updateProfileImage } from "../../../services/user";

//////////////////////////////////////////////////////////////

export const PUT = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Updating profile image...');
		const response = await updateProfileImage(
            data.sessionId,
            data.userId,
            data.imageResourceId,
		);
        const updated = response.Patient;
		return new Response(JSON.stringify(updated));
	} catch (err) {
		console.error(`Error updating profile image: ${err.message}`);
		return new Response(err.message);
	}
};
