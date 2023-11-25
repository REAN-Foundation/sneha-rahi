import type { PageServerLoad } from './$types';
import * as cookie from 'cookie';
import { getNextQuestion, getQuestionById, getQuizById } from '../../../../../../../../../api/services/quiz';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ request, params, setHeaders }) => {
	// try {
		const assessmentId = params.quizId;
		const userId = params.userId;
		console.log('params....', params);
		const cookies = cookie.parse(request.headers.get('cookie') || '');
		const sessionId = cookies['sessionId'];
		const _quiz = await getQuizById(sessionId, assessmentId);
		const quiz = _quiz.Assessment;

		const currentQuestionId = params.questionId;

		let isCorrect = null;
		let currentQuestion_ = null;

		if (currentQuestionId && currentQuestionId !== 'manifest.json') {
			console.log('Valid question Id - ', currentQuestionId);
			currentQuestion_ = await getQuestionById(sessionId, assessmentId, currentQuestionId);
		}
		if (!currentQuestion_) {
			currentQuestion_ = await getNextQuestion(sessionId, assessmentId);
		}

		const currentQuestion = currentQuestion_.Question;
		const correctExpectedAnswer: number | number[]  = currentQuestion.CorrectAnswer;
		const existingAnswer  = quiz.UserResponses.find(x => x.NodeId === currentQuestionId);
		const answerSubmitted = existingAnswer ? true : false;

		console.log('quiz',quiz);
		console.log('currentQuestion', JSON.stringify(currentQuestion, null, 2));
		console.log('correctAnswer', currentQuestion.CorrectAnswer);
		console.log('ExpectedResponseType', currentQuestion.ExpectedResponseType);
		// console.log('user responses', quiz.UserResponses);
		console.log('answerSubmitted', answerSubmitted);
		console.log('existingAnswer', existingAnswer);

		let answerGiven: number | number [] = null;

		if (answerSubmitted) {
			if (currentQuestion.ExpectedResponseType === "Single Choice Selection") {
				const x = existingAnswer.IntegerValue as number;
				isCorrect = x === correctExpectedAnswer;
				answerGiven = x;
				currentQuestion.Options = currentQuestion.Options.map((o) => {
					return {
						...o,
						Selected: o.Sequence === x
					};
				});
			}
			else if (currentQuestion.ExpectedResponseType === "Multiple Choice Selection") {
				const x = existingAnswer.ArrayValue as number[];
				isCorrect = (correctExpectedAnswer as number[]).some((val) => x.includes(val));
				answerGiven = x;
				currentQuestion.Options = currentQuestion.Options.map((o) => {
					return {
						...o,
						Selected: x.includes(o.Sequence)
					};
				});
			}
		}

		// console.log('next quetion', JSON.stringify(nextQuestion, null, 2));
		console.log('answerGiven', answerGiven);
		console.log('isCorrect', isCorrect);

		setHeaders({ 'Cache-Control': 'no-cache' });

		return {
			quiz,
			userId,
			sessionId,
			currentQuestion,
			answerSubmitted,
			isCorrect
		};

};
