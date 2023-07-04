import type { RequestEvent } from '@sveltejs/kit';
import { sendOtp } from '../../services/user';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
  console.log("data",data)
	try {
		const response = await sendOtp(
			data.phone,
      data.loginRoleId
		);
		return new Response(JSON.stringify(response));
	} catch (err) {
		console.error(`Error in resending otp: ${err.message}`);
		return new Response(err.message);
	}
};
