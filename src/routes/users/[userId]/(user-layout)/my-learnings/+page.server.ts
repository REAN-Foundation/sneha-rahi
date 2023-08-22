import type { PageServerLoad } from "./$types";
import { getAllCourseContents, getAllLearningPaths, getUserLearningPaths } from "../../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const allLearningPaths = await getAllLearningPaths(sessionId);
        const userLearningPaths = await getUserLearningPaths(sessionId, userId);
        // const allCourseContents = await getAllCourseContents(sessionId);
        return {
            sessionId,
            userId,
            allLearningPaths,
            // allCourseContents,
            userLearningPaths
        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's learnings: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
