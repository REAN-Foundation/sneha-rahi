import type { PageServerLoad} from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { getUserById} from '../../../../routes/api/services/user';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
    const userId = event.params.userId;
    const _user = await getUserById(sessionId, userId);
    const user = _user.Patient;
    console.log('user',user);
    return {
      user,
      sessionId,
    };
};

