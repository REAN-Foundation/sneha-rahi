<script lang="ts">
	import { onMount } from 'svelte';
	//import type { PageServerData } from './$types';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import Carousel from '$lib/components/carousel/carousel.svelte'
	import { selectedLanguage } from '$lib/store/general.store';
	import english from '$lib/localization/english.json';
  import hinglish from '$lib/localization/hinglish.json'

	/////////////////////////////////////////////////////////////////

  let localizedContent = $selectedLanguage === 'hinglish' ? hinglish : english;
  let spalshImages = localizedContent.spalshImages;
	
	let showSplash = true;
	const show = LocalStorageUtils.getItem('showSplash');
	if (!show) {
		showSplash = true;
	} else {
		showSplash = show === 'true' ? true : false;
	}

	onMount(() => {
		setTimeout(() => {
			showSplash = false;
			LocalStorageUtils.setItem('showSplash', 'true');
		}, 3000);
	});
</script>

{#if showSplash}
	<div class="flex items-center justify-center lg:mt-16 md:mt-16 sm:mt-16 mt-0">
		<div
			class="card card-compact rounded-none card-bordered max-[425px]:border-none border-slate-400 max-[425px]:w-full w-[375px]
        h-[812px] max-[812px]:h-screen bg-white shadow-none"
		>
			<div class="card-body justify-center">
				<img
					class="mx-4 w-[300px] max-[425px]:w-full h-[170px]"
					src="/assets/images/splash-screen/svg/logo.svg"
					alt=""
				/>
				<div class="text-center leading-tight text-xs font-semibold">Built on REAN Foundation's HealthGuru Platform</div>
			</div>
			<img src="/assets/images/sign-in/svg/color-strip.svg" alt="" />
		</div>
	</div>
{:else}
	<div class="flex items-center justify-center lg:mt-16 md:mt-16 sm:mt-16 mt-0">
		<div class="card card-compact max-[425px]:w-full w-[375px] h-[812px] max-[812px]:h-screen bg-white border-2 max-[425px]:border-none rounded-none">
			<div class="card-body">
				<div class="flex flex-col items-center justify-center">
					<img
						src="/assets/images/about-raahi/png/logo.png"
						alt=""
						class="w-[110px] h-[50px] mt-[10px] object-contain"
					/>
				</div>

				<Carousel autoplay = {3000} >
					{#each spalshImages as item}
						<div>
							<div class="flex flex-col text-center items-center justify-center">
								<img src={item.Image} alt="" class="mt-[50px] max-[812px]:h-auto  h-[250px] " />
								<h2 class=" text-[#5b7aa3] font-bold w-[335px] max-[425px]:w-auto h-[44px] mt-4 leading-[23px]">
									{item.Title}
								</h2>
								<p class=" font-normal overflow-auto h-[60px] text-[#000]">
									{item.Description}
								</p>
							</div>
						</div>
					{/each}
				</Carousel>

				<div class="flex flex-col text-center- justify-center mt-4">
					<a href="/join-raahi">
						<button
							class="max-[425px]:w-full w-[340px] h-[52px] rounded-[10px] bg-[#5b7aa3] uppercase text-[#fff] tracking-[3px] text-[17px]"
						>
						SIGN UP
						</button></a
					>
					<a href="/sign-in">
						<button
							class="max-[425px]:w-full w-[340px] h-[52px] rounded-[10px] mt-[40px] bg-[#d05591] uppercase text-[#fff] tracking-[3px] text-[17px]"
						>
							LOGIN
						</button>
					</a>
				</div>
			</div>
			<img
				src="/assets/images/about-raahi/png/colors-strip.png"
				alt=""
				class="w-[375px] max-[425px]:w-full h-[10px]"
			/>
		</div>
	</div>
{/if}
