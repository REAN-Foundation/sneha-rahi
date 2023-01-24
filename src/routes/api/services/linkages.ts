import { BACKEND_API_URL } from "$env/static/private";
import { get_, post_} from "./common";
////////////////////////////////////////////////////////////////

export const getAllLinkages = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/general/notices/search';
    return await get_(sessionId, url);
};

export const getLinkageById = async (sessionId: string, noticeId: string) => {
    const url = BACKEND_API_URL + `/general/notices/${noticeId}`;
    return await get_(sessionId, url);
};

export const takeNoticeAction = async (sessionId: string, noticeId: string, userId: string, action:string, title: string, resourseId: string ) => {
    const url = BACKEND_API_URL + `/general/notices/${noticeId}/users/${userId}/take-action`;
      const createModel =
        {
            NoticeId : noticeId,
            Action      : action,
            Contents    : [
                {
                    Title : title,
                    ResourceId: resourseId
                }
            ],
        };
    return await post_(sessionId, url, createModel) ;
};

export const getAllNoticeActionsForUser = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/general/notices/users/${userId}`;
    return await get_(sessionId, url);
};

export const getNoticeActionForUser = async (sessionId: string, noticeId: string, userId: string) => {
    const url = BACKEND_API_URL + `/general/notices/${noticeId}/users/${userId}`;
    return await get_(sessionId, url);
};
