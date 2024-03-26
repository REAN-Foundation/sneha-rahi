import type { PageServerLoad } from './$types';
import {  error, fail, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { successMessage } from '$lib/utils/message.utils';
import { getUserById, updateProfile } from '../../../../../routes/api/services/user';
import { Helper } from '$lib/utils/helper';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const userId = event.params.userId;
    const _user = await getUserById(sessionId, userId);
    const user = _user.Patient;
    console.log('User', JSON.stringify(user, null, 2));
    return {
      user
    };
};

export const actions = {

  updateProfile: async (event: RequestEvent) => {

    const request = event.request;
    const data = await request.formData();
    const firstName = data.has('firstName') ? data.get('firstName') : null;
    const lastName = data.has('lastName') ? data.get('lastName') : null;
    const birthDate = data.has('birthDate') ? data.get('birthDate') : null;
    const phone = data.has('phone') ? data.get('phone') : null;
    const organization_ = data.has('organization') ? data.get('organization') : null;
		const location_ = data.has('location') ? data.get('location') : null;
    const gender = data.get('gender');
    
    // const address = data.has('address') ? data.get('address') : null;
    
    const sessionId = event.cookies.get('sessionId');
    const userId = event.params.userId;
    const organization = Helper.truncateText(organization_.valueOf() as string, 200);
		const location = Helper.truncateText(location_.valueOf() as string, 200);
    
    if (!phone) {
			throw error(400, `Phone is not valid!`);
		}
		//////////////////////////////////
		const errors: Record<string, unknown> = {}

    	if (!phone || !(phone.length==10)) {
          errors.phone = 'Not a valid number'
    	}

       // in case of an error return the data and errors
    	if (Object.keys(errors).length > 0) {
      const dataShow = {
        dataShow: Object.fromEntries(data),
        errors
     	 }
     	 return fail(400, dataShow)
    	}


    const response = await updateProfile(
      sessionId,
      userId,
      firstName.valueOf() as string,
      lastName.valueOf() as string,
      birthDate.valueOf() as Date,
      phone.valueOf() as string,
      gender.valueOf() as string,
      organization,
      location
    );
    //console.log(response);
    console.log("Gender is",gender);
    const id = response.Patient.User.id;
    //console.log("id", id);

    throw redirect(
      303,
      `/users/${id}/my-profile`,
      successMessage(`Profile updated successfully!`),
      event
    );
  }
};








