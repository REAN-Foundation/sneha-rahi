import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { getLinkageById, getNoticeActionForUser } from '../../../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    try {
        const noticeId = event.params.linkageId;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const notice_ = await getLinkageById(sessionId, noticeId);
        const notice = notice_.Notice;
        console.log(`\n Notice = ${JSON.stringify(notice)}`);

        const noticeAction_ = await getNoticeActionForUser(sessionId, noticeId, userId);
        const noticeAction = noticeAction_.NoticeAction ?? null;
        return {
           notice,
           userId,
           sessionId,
           noticeAction,
        };
    }
    catch (error) {
        console.error(`Error retrieving notice: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};
