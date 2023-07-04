
import type { RequestEvent } from '@sveltejs/kit';
import { sendOtp } from '../api/services/user';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';

//////////////////////////////////////////////////////////////

export const actions = {

	default: async (event: RequestEvent) => {

		const request = event.request;

		const data = await request.formData();
		console.log(Object.fromEntries(data));
		const phone_ = data.has('phone') ? data.get('phone') : null;
		const loginRoleId_ = data.has('loginRoleId') ? data.get('loginRoleId') : null;

		if (!phone_) {
			throw redirect(303, '/sign-in', errorMessage(`Phone is not valid!`), event);
		}
		const phone = phone_.valueOf() as string;
		const loginRoleId = loginRoleId_.valueOf() as number;

		if (phone.startsWith('1000001') || phone.startsWith('1000002')) {
			throw redirect(303, `/sign-in-otp/${phone}`);
		}

		const response = await sendOtp(
			phone,
			loginRoleId ?? 2
		);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			//console.log(response.Message);
			//Most probably the user is not yet registered, so redirect to the sign-up page
			throw redirect(303, '/join-raahi/', errorMessage(response.Message), event);
		}
		throw redirect(303, `/sign-in-otp/${phone}`, successMessage(response.Message), event);
	},
};
