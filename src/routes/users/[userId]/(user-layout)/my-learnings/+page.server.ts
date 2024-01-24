import type { PageServerLoad } from "./$types";
import { getAllLearningPaths, getUserLearningPaths } from "../../../../api/services/learning";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const allLearningPaths = await getAllLearningPaths(sessionId);
        const userLearningPaths = await getUserLearningPaths(sessionId, userId);
        const learningPaths = allLearningPaths.LearningPaths.Items.reverse();
        const userLearning = userLearningPaths.UserLearningPaths;

        for (let i = 0 ; i < learningPaths.length; i++) {
            for (let j = 0 ; j < userLearning.length; j++) {
               if (learningPaths[i].id == userLearning[j].id) {
                    learningPaths[i]['PercentageCompletion'] = userLearning[j].PercentageCompletion;
                } 
            }
            if (!('PercentageCompletion' in learningPaths[i])) {
                learningPaths[i]['PercentageCompletion'] = 0;
            }
        }
        learningPaths[0]['Disabled'] = false;
     
        for (let i = 0; i < learningPaths.length - 1; i++) {
            if (learningPaths[i].PercentageCompletion === 1) {
                learningPaths[i]['Disabled'] = false
                learningPaths[i+1]['Disabled'] = false;
            } else {
                learningPaths[i+1]['Disabled'] = true;
            }
       }
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
