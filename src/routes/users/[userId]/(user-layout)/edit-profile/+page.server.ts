import type { PageServerLoad } from './$types';
import type {  RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { successMessage } from '$lib/utils/message.utils';
import { getUserById, updateProfile } from '../../../../../routes/api/services/user';

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
    const address = data.has('address') ? data.get('address') : null;

    const sessionId = event.cookies.get('sessionId');
    //console.log('sessionId', sessionId);
    const userId = event.params.userId;
    //console.log('user id', userId);

    const response = await updateProfile(
      sessionId,
      userId,
      firstName.valueOf() as string,
      lastName.valueOf() as string,
      birthDate.valueOf() as Date,
      phone.valueOf() as string,
      address.valueOf() as string
    );
    //console.log(response);
    const id = response.Patient.User.id;
    //console.log("id", id);

    throw redirect(
      303,
      `/users/${id}/my-profile`,
      successMessage(`Profile updated successful!`),
      event
    );
  }
};








