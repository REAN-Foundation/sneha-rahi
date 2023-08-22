import * as cookie from 'cookie';
import type { PageServerLoad } from "./$types";
import {
    getCourseContentsForLearningPath,
    getLearningPath,
    getUserCourseContents,
    getUserLearningPaths } from "../../../../../api/services/learning";
import { getAllQuizTemplates } from '../../../../../../routes/api/services/quiz';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
    try {
        const cookies = cookie.parse(request.headers.get('cookie') || '');
        const sessionId = cookies['sessionId'];
        const userId = params.userId;
        const learningPathId = params.learningJourneyId;
        const _learningPath = await getLearningPath(sessionId, learningPathId);
        // const _courseContentsForLearningPath = await getCourseContentsForLearningPath(sessionId, learningPathId);
        const _userLearningPaths = await getUserLearningPaths(sessionId, userId);
        const _userLearnings = await getUserCourseContents(sessionId, params.userId, params.learningJourneyId);

        const allQuizTempletes = await getAllQuizTemplates(sessionId);

        const learningPath = _learningPath.LearningPath;
        // const courseContentsForLearningPath = _courseContentsForLearningPath.CourseContents;
        const userLearningPaths = _userLearningPaths.UserLearningPaths;
        const userCourseContents = _userLearnings.UserCourseContents;
        console.log("userCourseContents",userCourseContents)
        const courseContentsForLearningPath =[];
        for ( const course of learningPath.Courses){
                for (const module of course.Modules){
                    for (const content of module.Contents){
                        courseContentsForLearningPath.push(content)
                    }
                }
        }
        console.log("courseContentsForLearningPath",courseContentsForLearningPath);
        for (const cc of courseContentsForLearningPath) {
            const userContent = userCourseContents.find(x => x.ContentId === cc.id);
            if (userContent) {
                cc['PercentageCompletion'] = userContent.PercentageCompletion;
            }
        }
        //console.log(`courseContentsForLearningPath = ${JSON.stringify(courseContentsForLearningPath, null, 2)}`);

        return {
            sessionId,
            userId,
            learningPath,
            courseContentsForLearningPath,
            userLearningPaths,
            allQuizTempletes,
            userCourseContents,
            // userContentProgress
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
