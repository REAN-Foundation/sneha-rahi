<script lang="ts">
  	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher();
	export let options;
	export let answerSubmitted = false;
	const unselected = "h-[65px] w-[340px] max-[425px]:w-full bg-[#e3e3e3] hover:bg-[#fcaf58] mt-3 first:mt-0 text-lg text-left font-normal pl-3 border tracking-normal rounded-lg";
	const selected = "h-[65px] w-[340px] max-[425px]:w-full bg-[#fcaf58] mt-3 first:mt-0 text-lg text-left font-normal pl-3 border tracking-normal rounded-lg";

	const handleMultiChoiceClick = async (e, sequence: number) => {
		console.log(e.currentTarget);
		const optionId = e.currentTarget.id;
		console.log(`Option id = ${optionId}`);
		const idx = options.findIndex(x => x.Sequence === sequence);
		if(idx > -1) {
			options[idx].Selected = !options[idx].Selected;
		}
		answerSubmitted = options.filter(x => x.Selected === true).length > 0;
		console.log(`answerSubmitted: ${answerSubmitted}`);
		dispatch('answerSelected');
	};

</script>

<div class=" flex flex-col items-center">
	{#each options as option}
		<button
			on:click|preventDefault={(e) => handleMultiChoiceClick(e, option.Sequence)}
			id={option.id}
			name={option.id}
			class={option.Selected ? selected : unselected}
		>
			<div class="flex relative font-normal">
				{option.Text}
			</div>
		</button>
	{/each}
</div>
