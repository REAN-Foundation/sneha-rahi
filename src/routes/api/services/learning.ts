import { BACKEND_API_URL } from "$env/static/private";
import { get_, put_ } from "./common";

////////////////////////////////////////////////////////////////

export enum ProgressStatus {
    Pending    = 'Pending',
    InProgress = 'In-progress',
    Completed  = 'Completed',
    Cancelled  = 'Cancelled',
    Delayed    = 'Delayed',
    Unknown    = 'Unknown',
};

////////////////////////////////////////////////////////////////

export const getAllLearningPaths = async (sessionId: string) => {
    const url = BACKEND_API_URL + '/educational/learning-paths/search';
    return await get_(sessionId, url);
};

export const getUserLearningPaths = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/educational/user-learnings/${userId}/learning-paths`;
    return await get_(sessionId, url);
};

export const getUserCourseContents = async (sessionId: string, userId: string, learningPathId?: string) => {
    const queryParams = learningPathId ? `?learningPathId=${learningPathId}`: '';
    const url = BACKEND_API_URL + `/educational/user-learnings/${userId}/course-contents` + queryParams;
    return await get_(sessionId, url);
};

export const getCourseContentsForLearningPath = async (sessionId: string, learningPathId: string) => {
    const url = BACKEND_API_URL + `/educational/course-contents/by-learning-path/${learningPathId}`;
    return await get_(sessionId, url);
};

export const getLearningPath = async (sessionId: string, learningPathId: string) => {
    const url = BACKEND_API_URL + `/educational/learning-paths/${learningPathId}`;
    return await get_(sessionId, url);
};

export const getCourseContentsForCourse = async (sessionId: string, courseId: string) => {
    const url = BACKEND_API_URL + `/educational/course-contents/by-course/${courseId}`;
    return await get_(sessionId, url);
};

export const getAllCourseContents = async (sessionId: string) => {
    const url = BACKEND_API_URL + `/educational/course-contents/search`;
    return await get_(sessionId, url);
};

export const updateUserLearning = async (sessionId: string, userId: string, contentId: string, learningJourneyId:string, status = ProgressStatus.Completed, percentageCompletion = 100) => {
    const updates = {
        ProgressStatus: status,
        PercentageCompletion: percentageCompletion,
        LearningPathId:learningJourneyId
    };
    const url = BACKEND_API_URL + `/educational/user-learnings/${userId}/contents/${contentId}`;
    return await put_(sessionId, url, updates);
};

export const getContentProgress = async (sessionId: string, contentId: string, userId: string,) => {
    const url = BACKEND_API_URL + `/educational/user-learnings/${userId}/courses/${contentId}/progress`;
    return await get_(sessionId, url);
};
