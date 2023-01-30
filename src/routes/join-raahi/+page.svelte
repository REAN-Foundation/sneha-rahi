<script lang="ts">
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';

	export let data: PageServerData;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});
</script>

<body>
	<div class=" flex items-center justify-center lg:mt-16 md:mt-16 sm:mt-16 mt-0 ">
		<div
			class="card max-[425px]:w-full w-[375px] max-[425px]:border-none h-[812px] bg-[#fff] rounded-none border-solid border-2"
		>
			<div class="card-body items-center text-center justify-center">
				<img
					src="/assets/images/join-raahi/png/logo.png"
					alt=""
					class="w-[110px] h-[50px] mt-[10px] mr-[132px] mb-[32px] ml-[133px] object-contain "
				/>
				<div class="grid items-center w-[335px] max-[425px]:w-full justify-center">
					<p
						class="w-[335px] h-[44px] mx-[20px] mb-[6px] text-[19px] tracking-wide leading-5 font-bold text-center text-[#5B7AA3]"
					>
						Enter a phone number
					</p>
					<p
						class="w-[335px] max-[425px]:w-80 h-[64px] mt-[6px] mx-[20px] mb-[19px] text-[16px] font-normal not-italic leading-5 text-center text-[#000] tracking-wide"
					>
						The number you enter will be linked to your Raahi App account. Make sure you are able to
						access the OTP sent on this number.
					</p>
				</div>
				<form class="max-[425px]:w-full" method="post">
					<!-- <div class="text-[#5B7AA3] mx-2 mt-1 py-2 px-3 font-semibold text-start">
						<span>First Name</span>
					</div> -->
					<input
						placeholder="First Name"
						name="firstName"
						required
						type="text"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Last Name"
						type="text"
						name="lastName"
						required
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Date of Birth in MM/DD/YYYY"
						type="text"
						name="birthDate"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Phone Number"
						type="number"
						name="phone"
						required
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<input
						placeholder="Location"
						name="address"
						class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-5 text-lg "
					/>
					<div class="w-[340px] max-[425px]:w-full h-[52px] mt-[16px] mr-[17px] mb-4 pt-[15px] text-center pb-15px  rounded-[10px] bg-[#5B7AA3]">
						<button type="submit"
							class="w-[170px] h-[25px] text-[16px] not-italic text-center text-[#fff] tracking-[3px] font-bold"
						>JOIN RAAHI</button>
					</div>
				</form>
				<div class="flex justify-center">
					<a href="/"> <span class=" text-xl tracking-widest  font-bold"> BACK TO HOME </span></a>
				</div>
			</div>
			<img src="/assets/images/sign-in/svg/color-strip.svg" alt="" />
		</div>
	</div></body
>
