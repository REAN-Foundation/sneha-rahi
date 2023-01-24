import type { PageServerLoad } from './$types';
import * as cookie from 'cookie';
import { getNextQuestion, getQuizById } from '../../../../../../../../../api/services/quiz';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params }) => {
	// try {
		const assessmentId = params.quizId;
		const userId = params.userId;
		console.log('params....', params);
		const cookies = cookie.parse(request.headers.get('cookie') || '');
		const sessionId = cookies['sessionId'];
		const _quiz = await getQuizById(sessionId, assessmentId);
		const _nextQuestion = await getNextQuestion(sessionId, assessmentId);
		const quiz = _quiz.Assessment;
		const nextQuestion = _nextQuestion.Next;
		console.log('quiz',quiz);
		console.log('next quetion', nextQuestion);
		return {
			quiz,
			userId,
			sessionId,
			nextQuestion
		};
	// } catch (error) {
	// 	console.error(`Error retrieving quiz: ${error.message}`);
	// 	return {
	// 		location: `/home`
	// 	};
	// }
};
