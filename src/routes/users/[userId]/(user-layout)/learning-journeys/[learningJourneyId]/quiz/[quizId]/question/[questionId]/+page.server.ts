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

		const SINGLE_CHOICE_SELECTION = "Single Choice Selection";
		const MULTI_CHOICE_SELECTION = "Multi Choice Selection";

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
		const alreadyAnswered = existingAnswer ? true : false;

		// console.log('quiz',quiz);
		// console.log('correctAnswer', currentQuestion.CorrectAnswer);
		// console.log('ExpectedResponseType', currentQuestion.ExpectedResponseType);
		// console.log('alreadyAnswered', alreadyAnswered);

		let answerGiven: number | number [] = null;

		if (alreadyAnswered) {
			if (currentQuestion.ExpectedResponseType === SINGLE_CHOICE_SELECTION) {
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
			else if (currentQuestion.ExpectedResponseType === MULTI_CHOICE_SELECTION) {
				const x = existingAnswer.ArrayValue as number[];
				if (correctExpectedAnswer && Array.isArray(correctExpectedAnswer)) {
					isCorrect = (correctExpectedAnswer as number[]).some((val) => x.includes(val));
					answerGiven = x;
					const options = currentQuestion.Options.map((o) => {
						return {
							...o,
							Selected: x.includes(o.Sequence)
						};
					});
					currentQuestion.Options = options;
				}
				else {
					isCorrect = false;
					answerGiven = x;
					const options = currentQuestion.Options.map((o) => {
						return {
							...o,
							Selected: x.includes(o.Sequence)
						};
					});
					currentQuestion.Options = options;
				}
			}
		}
		else {
			currentQuestion.Options = currentQuestion.Options.map((o) => {
				return {
					...o,
					Selected: false
				};
			});
		}
		// console.log('currentQuestion', JSON.stringify(currentQuestion, null, 2));

		// This is important to prevent caching of the page
		setHeaders({ 'Cache-Control': 'no-store' });

		return {
			quiz,
			userId,
			sessionId,
			currentQuestion,
			alreadyAnswered,
			isCorrect,
			answerGiven,
		};

};
