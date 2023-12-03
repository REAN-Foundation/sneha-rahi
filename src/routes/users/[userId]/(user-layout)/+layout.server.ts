import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async (event) => {
	const userId = event.locals.sessionUser.userId;
    return {
        userId
    }
}