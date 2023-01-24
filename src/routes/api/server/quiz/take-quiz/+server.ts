import {
	getNextQuestion,
	getQuizByTemplateIdForUser,
	scheduleQuiz,
	startQuiz } from "../../../services/quiz";
import { ProgressStatus, updateUserLearning } from "../../../services/learning";
import { Helper } from "$lib/utils/helper";

//////////////////////////////////////////////////////////////

export const POST = async (event) => {
	const request = event.request;
	const data = await request.json();
	console.log('data......', data);

	const learningJourneyId = data.learningJourneyId;
	const userId = data.userId;
	const sessionId = data.sessionId;
	const courseContentId = data.courseContentId;

	const userAssessmentsResponse = await getQuizByTemplateIdForUser(
		data.sessionId,
		data.assessmentTemplateId,
		data.userId);

	//console.log(JSON.stringify(userAssessmentsResponse));

	const existingCount = userAssessmentsResponse.AssessmentRecords?.Items?.length;
	if (existingCount > 0) {
		const existingAssessment = userAssessmentsResponse.AssessmentRecords?.Items[0];
		const assessmentId = existingAssessment.id;
		const isCompleted = existingAssessment.Status === 'Completed';
		if (isCompleted) {
			const response = await updateUserLearning(
				sessionId,
				userId,
				courseContentId
			);
			console.log(`isCompleted: ${JSON.stringify(response, null, 2)}`);
			// const redirectPath = `/users/${data.userId}/learning-journeys/${learningJourneyId}`;
			return Helper.createResponse('message', 'Course is already completed!');
		} else {
			const _nextQuestion = await getNextQuestion(sessionId, assessmentId);
			const nextQuestion = _nextQuestion.Next;
			const nextQuestionId = nextQuestion?.id;
			const redirectPath = `/users/${userId}/learning-journeys/${learningJourneyId}/quiz/${assessmentId}/question/${nextQuestionId}`;
			console.log(`is not completed...`);
			const percentageProgress = ((nextQuestion?.Sequence?? 0) / existingAssessment?.TotalNumberOfQuestions) * 100;
			const response = await updateUserLearning(
				sessionId,
				userId,
				courseContentId,
				ProgressStatus.InProgress,
				percentageProgress,
			);
			console.log(`quiz progress: ${JSON.stringify(response, null, 2)}`);
			return Helper.createResponse('redirect', redirectPath);
		}
	}
	else {
		const response = await scheduleQuiz(
			data.sessionId,
			data.userId,
			data.assessmentTemplateId,
			data.scheduledDate
		);
		console.log('Assessment response',response);
		const assessmentId = response.Assessment.id;

		const startQuizResponse = await startQuiz(
			sessionId,
			assessmentId
		);
		console.log('startQuizResponse', JSON.stringify(startQuizResponse, null, 2));
		const nextQuestion = startQuizResponse.Next;
		const nextQuestionId = nextQuestion.id;
		const redirectPath = `/users/${data.userId}/learning-journeys/${learningJourneyId}/quiz/${assessmentId}/question/${nextQuestionId}`;
		console.log(redirectPath);
		return Helper.createResponse('redirect', redirectPath);
	}
};

// export const GET = async ({ request }) => {
// 	const data = await request.json();
// 	console.log('data......',data)
// 	try {
// 		console.log('Inside quiz template server endpoints');
// 		const response = await getNextQuestion(
// 			data.sessionId,
// 			data.assessmentId
// 		);
// 		return new Response(response.message);

// 	} catch (err) {
// 		console.error(`Error starting quiz: ${err.message}`);
// 		return new Response(err.message);
// 	}
// };
