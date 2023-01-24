import type { PageServerLoad } from "./$types";
import { getAllCourseContents, getAllLearningPaths } from "../../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const allLearningPaths = await getAllLearningPaths(sessionId);
        const allCourseContents = await getAllCourseContents(sessionId);
        return {
            sessionId,
            userId,
            allLearningPaths,
            allCourseContents,

        };
    }
    catch (error) {
        console.log(error.stack)
        console.error(`Error retrieving data related to user's learning journey: ${error.message}`);
        return {
            location: `/sign-in`,
        };
    }
};
