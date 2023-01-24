<script lang="ts">
	import { Helper } from '$lib/utils/helper';
	import type { PageServerData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import {selectTextOnFocus, blurOnEscape} from '$lib/utils/input.directives';
	import { personRolesStore } from '$lib/store/general.store';
	import type { Unsubscriber } from 'svelte/store';
	import { show } from '$lib/utils/message.utils';

	export let data: PageServerData;

	console.log('Page data received -' + JSON.stringify(data, null, 2));

	let otp1, otp2, otp3, otp4, otp5, otp6, loginButton, loginRoleId = 2;
	let otp = '';
	let personRoles;
	let roleUnsubscribe: Unsubscriber = personRolesStore.subscribe(value => {
			personRoles = value;
		});
	const patientRole = personRoles?.find(x => x.RoleName === 'Patient');
	if (patientRole) {
		loginRoleId = patientRole.id;
	}
	onMount(()=>{
		show(data);
		otp1.focus();
	});

	onDestroy(roleUnsubscribe);

	function getOtp() {
		otp = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
		console.log(otp);
	}

	function isValidOtp() {
		if (
			otp1.value.length === 1 && Helper.isDigit(otp1.value) &&
			otp2.value.length === 1 && Helper.isDigit(otp2.value) &&
			otp3.value.length === 1 && Helper.isDigit(otp3.value) &&
			otp4.value.length === 1 && Helper.isDigit(otp4.value) &&
			otp5.value.length === 1 && Helper.isDigit(otp5.value) &&
			otp6.value.length === 1 && Helper.isDigit(otp6.value)) {
				return true;
			}
			return false;
	}

	function onOtpDigitEntered(e) {
		var v = e.target.value;
		var name = e.target.name;

		if (name === 'otp1') {
			if (v.length > 1)
				otp1.value = v[0];
			if(!Helper.isDigit(v))
			{
				otp1.value = '';
			}
			else {
				otp2.focus();
			}
		}
		if (name === 'otp2') {
			if (v.length > 1)
				otp2.value = v[0];
				if(!Helper.isDigit(v))
			{
				otp2.value = '';
			}
			else {
				otp3.focus();
			}
		}
		if (name === 'otp3') {
			if (v.length > 1) otp3.value = v[0];
			if(!Helper.isDigit(v))
			{
				otp3.value = '';
			}
			else {
				otp4.focus();
			}
		}
		if (name === 'otp4') {
			if (v.length > 1) otp4.value = v[0];
			if(!Helper.isDigit(v))
			{
				otp4.value = '';
			}
			else {
				otp5.focus();
			}
		}
		if (name === 'otp5') {
			if (v.length > 1) otp5.value = v[0];
			if(!Helper.isDigit(v))
			{
				otp5.value = '';
			}
			else {
				otp6.focus();
			}
		}
		if (name === 'otp6') {
			if (v.length > 1) otp6.value = v[0];
			if(!Helper.isDigit(v))
			{
				otp6.value = '';
			}
			else {
				loginButton.focus();
			}
		}

		console.log(v);
		console.log(name);
		getOtp();
		shouldEnableSignIn = isValidOtp();
	}

	let shouldEnableSignIn = false;

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
				Enter the 6-digit OTP
			</h2>
			<p class="  text-center leading-tight text-base ">
				Check your messages for OTP.
			</p>
			<form method = 'post'>
				<div class="hidden">
					<input name="phone" class="hidden" value="{data.phone}">
				</div>
				<div class="hidden">
					<input name="otp" class="hidden" value="{otp}">
				</div>
				<div class="hidden">
					<input name="loginRoleId" class="hidden" value="{loginRoleId}">
				</div>
			<div class="flex flex-row mt-5">
				<input name="otp1" required on:input={onOtpDigitEntered} bind:this={otp1} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg"/>
				<input name="otp2" required on:input={onOtpDigitEntered} bind:this={otp2} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg" />
				<input name="otp3" required on:input={onOtpDigitEntered} bind:this={otp3} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg" />
				<input name="otp4" required on:input={onOtpDigitEntered} bind:this={otp4} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg" />
				<input name="otp5" required on:input={onOtpDigitEntered} bind:this={otp5} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg" />
				<input name="otp6" required on:input={onOtpDigitEntered} bind:this={otp6} use:selectTextOnFocus use:blurOnEscape class=" bg-[#fde2e4] h-[3.25rem] w-[3.25rem] rounded-lg mr-[0.375rem]  text-center font-bold text-lg" />
			</div>
			<!-- <a href="/choose-profile"> -->
				<button
					disabled={!shouldEnableSignIn}
					bind:this={loginButton}
					class="disabled:bg-[#b39fa9] h-[52px] w-[340px]  mt-8 mb-[180px] text-[#fff] text-xl font-bold rounded-lg bg-[#d05591] "
					>SIGN IN</button
				>
			</form>
			<!-- </a> -->
			<div class="flex justify-center">
				<a href="/"> <span class=" text-xl tracking-widest  font-bold"> BACK TO HOME </span></a>
			</div>
		</div>
		<img src="/assets/images/sign-in/svg/color-strip.svg" alt="" />
	</div>
</div>
