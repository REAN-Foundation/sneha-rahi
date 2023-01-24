<script lang="ts">
	import { browser } from '$app/environment';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	let personRoles = [], loginRoleId = 2;

	if (browser) {
		const tmp = LocalStorageUtils.getItem('personRoles');
		personRoles = JSON.parse(tmp);
		const patientRole = personRoles?.find(x => x.RoleName === 'Patient');
		if (patientRole) {
			loginRoleId = patientRole.id;
		}
		LocalStorageUtils.removeItem('prevUrl');
	}
</script>

<div class="flex items-center justify-center lg:mt-16 md:mt-16 sm:mt-16 mt-0">
	<div
		class="card card-compact rounded-none card-bordered border-slate-400 w-[375px]
	h-[812px] bg-base-100  shadow-none "
	>
		<div class="flex items-center justify-center">
			<img class="mt-12" src="/assets/images/sign-in/svg/logo.svg" alt="" />
		</div>
		<div class="card-body ">
			<h2 class="mt-40 text-center text-[#d05591] text-xl font-bold">
				Enter a phone number
			</h2>
			<p class=" leading-tight text-base text-center">
				The number you enter will be linked to your Raahi App account. Make sure you are able to access the OTP sent on this number.
			</p>
			<form method="post">
			<input
				placeholder="Phone Number"
				type="tel"
				name="phone"
				class=" h-[52px] w-[340px] py-2 px-3 border rounded-lg bg-[#fde2e4] mt-5 text-lg "
			/>
			<input name="loginRoleId" class="hidden" value="{loginRoleId}">

			<!-- <a href="/sign-in-otp"> -->
				<button
					class=" h-[52px] w-[340px]  mt-8 mb-[180px] text-[#fff] text-xl font-bold rounded-lg bg-[#d05591] "
					>SEND OTP</button
				>
			<!-- </a> -->
		</form>
			<div class="flex justify-center">
				<a href="/"> <span class=" text-xl tracking-widest  font-bold"> BACK TO HOME </span></a>
			</div>
		</div>
		<img src="/assets/images/sign-in/svg/color-strip.svg" alt="" />
	</div>
</div>
