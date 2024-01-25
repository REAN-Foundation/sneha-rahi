<script lang="ts">
	import QuizSingleChoice from './quiz.single.choice.svelte';
	import QuizMultiChoice from './quiz.multi.choice.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { browser } from "$app/environment";
	import { invalidate } from '$app/navigation';

	// import { onMount } from 'svelte';

	export let data: PageServerData;

	const question = data.currentQuestion;
	let options = data.currentQuestion.Options;
	let alreadyAnswered = data.alreadyAnswered;
	// let answerGiven = data.answerGiven;

	// console.log(`options = ${JSON.stringify(options, null, 2)}`);
	// console.log(`alreadyAnswered = ${data.alreadyAnswered}`);
	// console.log(`isCorrect = ${data.isCorrect}`);

	$: multiChoiceSelections = options.filter(x => x.Selected === true); //This is an array
	$: singleChoiceSelection = options.filter(x => x.Selected === true).find(e => typeof e !== 'undefined'); //This is a single value
	$: answerSubmitted = false;

	const responseType = question.ExpectedResponseType;
	const isMultichoice = responseType === 'Multi Choice Selection';
	const correctSequence = question.CorrectAnswer ? parseInt(question.CorrectAnswer) : -1;

	const userId = $page.params.userId;
	const learningJourneyId = $page.params.learningJourneyId;
	const assessmentId = $page.params.quizId;
	const questionId = $page.params.questionId;

	async function answerQuestion(model) {
		const response = await fetch(`/api/server/quiz/answer-question`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respose....', response);
		return response;
	}

	const onAnswerSelected = () => {
		answerSubmitted = options.filter(x => x.Selected === true).length > 0;
		multiChoiceSelections = options.filter(x => x.Selected === true); //This is an array
		singleChoiceSelection = options.filter(x => x.Selected === true).find(e => typeof e !== 'undefined');

		console.log(`answerSubmitted = ${answerSubmitted}`);
		console.log(`multiChoiceSelections = ${multiChoiceSelections}`);
		console.log(`singleChoiceSelection = ${singleChoiceSelection}`);
	}

	const handleSubmit = async () => {

		let answerModel = {
			sessionId: data.sessionId,
			userId: $page.params.userId,
			learningJourneyId: $page.params.learningJourneyId,
			assessmentId: assessmentId,
			assessmentQuestionId: questionId,
			responseType: responseType,
			questionSequence: data.currentQuestion.Sequence,
			totalNumberOfQuestions: data.quiz.TotalNumberOfQuestions,
		};
		if (isMultichoice) {
			const answerArray = multiChoiceSelections.map(x => x?.Sequence);
			answerModel['answer'] = answerArray;
			console.log(`${JSON.stringify(answerArray)}`);
		}
		else {
			answerModel['answer'] = singleChoiceSelection?.Sequence;
		}

		const response = await answerQuestion(answerModel);
		const redirectPath = await response.text();
		console.log(redirectPath);
		window.location.href = redirectPath;
		//goto(redirectPath);
	};

	const goForwardInHistory = () => {
		if (browser) {
			const hasForwardPages = window.history.length > 1;
			if (hasForwardPages) {
				history.forward();
			}
			else {
				// window.location.href = `/users/${userId}/learning-journeys/${learningJourneyId}`;
                invalidate('app:learning-journeys/learningJourneyId');
			}
		}
	};

</script>
<div class="card-body ">
	<!-- <button class="h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
	<h3 class=" text-[#5b7aa3] flex tracking-widest justify-center font-bold text-base ">
		QUIZ
	</h3>
	<h3 class="text-[#5b7aa3] justify-center">{data.quiz.Title}</h3>
	<div class="flex mb-2 ">
		<h2 class=" text-center text-base font-bold ">
			{data.currentQuestion.Sequence} of {data.quiz.TotalNumberOfQuestions}
		</h2>
	</div>
	<div class=" bg-[#ffdbb2] rounded-full h-[10px]">
		<div
			class="bg-[#fcaf58] rounded-full h-[10px]"
			style="width:{(data.currentQuestion.Sequence / data.quiz.TotalNumberOfQuestions) * 100}%"
		/>
	</div>
	<!-- {#if !(questionPointer > answers.length - 1)} -->
	<div class="h-[400px] overflow-auto scrollbar-medium">
		<p class=" text-left mt-3 mb-3 font-bold text-lg">
			{data.currentQuestion.Title}
		</p>
		{#if isMultichoice}
			<QuizMultiChoice
				options={options}
				answerSubmitted={answerSubmitted}
				alreadyAnswered = {alreadyAnswered}
				on:answerSelected={onAnswerSelected}>
			</QuizMultiChoice>
		{:else}
			<QuizSingleChoice
				options={options}
				correctSequence={correctSequence}
				answerSubmitted={answerSubmitted}
				alreadyAnswered = {alreadyAnswered}
				on:answerSelected={onAnswerSelected}>
			</QuizSingleChoice>
		{/if}
	</div>
	<div class="flex justify-center">
		<button
			on:click|once={handleSubmit}
			id="submit"
			name="submit"
			disabled={!answerSubmitted || alreadyAnswered}
			class=" bg-[#5b7aa3] disabled:bg-[#7d7d7d] h-[52px] w-[340px] max-[425px]:w-full mt-4 mb-2 text-[#fff] justify-center rounded-lg"
		>
			SUBMIT
		</button>
	</div>
	<!-- <div class="flex justify-center"> -->
	<div class="flex ">	
		{#if alreadyAnswered}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="link w-[100%]" on:click={goForwardInHistory}>
				<!-- <button class=" bg-[#5b7aa3] h-[52px] w-[340px] max-[425px]:w-full mt-1 mb-4 text-[#fff] justify-center rounded-lg"> -->
					<button class=" bg-[#5b7aa3] h-[52px] w-[100%] mt-1 mb-4 text-[#fff] justify-center rounded-lg">
				NEXT
				</button>
			</div>
		{/if}
	</div>
</div>
