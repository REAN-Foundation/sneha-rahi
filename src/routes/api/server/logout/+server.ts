import { CookieUtils } from "$lib/utils/cookie.utils";
import { SessionManager } from "../../session.manager";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { logout } from "../../services/user";

////////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
	try {
		console.log('Logging out...');
		const response = await logout(sessionId);
        console.log(JSON.stringify(response));
        if (sessionId) {
            const session = await SessionManager.removeSession(sessionId);
            console.log(JSON.stringify(session, null, 2));
        }
        CookieUtils.removeCookieHeader(event, 'sessionId');
        throw redirect(303, `/sign-in`);
	} catch (err) {
		console.error(`Error logging out: ${err.message}`);
		return new Response(err.message);
	}
}

////////////////////////////////////////////////////////////////

// export const POST = async (event: RequestEvent) => {
//     const cookies = cookie.parse(event.request.headers.get('cookie') || '');
//     const sessionId = cookies['sessionId'];
//     // const data = await event.request.json();
//     // const token = data['token'];
//     // console.log(`Token = ${token}`);
//     const accessToken = await SessionManager.getSession(sessionId);
//     const headers = {};
//     headers['Content-Type'] = 'application/json';
//     headers['Authorization'] = `Bearer ${accessToken}`;
//     headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
//     const url = BACKEND_API_URL + '/users/logout';
//     try {
//         const res = await fetch(url, {
//             method: 'POST',
//             headers
//         });
//         const response = await res.json();
//         //console.log(JSON.stringify(response, null, 2));
//         if (response.Status === 'failure' || response.HttpCode !== 200) {
//             return {
//                 status : response.HttpCode,
//                 body : {
//                     success: false,
//                     message: response.Message
//                 }
//             }
//         }
//         if (sessionId) {
//             const session = await SessionManager.removeSession(sessionId);
//             console.log(JSON.stringify(session, null, 2));
//         }
//         CookieUtils.removeCookieHeader(event, 'sessionId');
//         throw redirect(303, `/sign-in`);
//         // return {
//         //     status : response.HttpCode,
//         //     body : {
//         //         Success: true,
//         //         Message: response.Message,
//         //     },
//         // }
//     }
//     catch (error) {
//         console.error(`Error logging in: ${error.message}`);
//     }
// };

////////////////////////////////////////////////////////////////
