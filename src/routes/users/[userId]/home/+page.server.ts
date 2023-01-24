
import type { PageServerLoad } from "./$types";
import {redirect } from '@sveltejs/kit';
import { SessionManager } from '../../../api/session.manager';

////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);
    const session = await SessionManager.getSession(sessionId);
    if (!session) {
        throw redirect(307, '/sign-in');
    }
    console.log(`session received`);

    const sessionUser = {
            sessionId      : session.sessionId,
            userId         : session.userId,
            email          : session.email,
            username       : session.username,
            profileImageUrl: session.profileImageUrl,
            fullName       : session.fullName,
            firstName      : session.firstName,
            roleId         : session.roleId,
            age            : session.age
        };
    return sessionUser;
};
