<script lang="ts">
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////

	export let data: PageServerData;
	let birthDate = new Date(data.user.User.Person.BirthDate).toISOString().split('T')[0];
	let firstName = data.user.User.Person.FirstName;
	let lastName = data.user.User.Person.LastName;
	let phone = data.user.User.Person.Phone;
	phone = phone.startsWith('+91') ? phone.replace('+91-', '') : phone;
	// let addresses = data.user.User.Person.Addresses;
	let location = '';
	let organization = '';
    
	// if (addresses.length > 0) {
	// 	let address = addresses[0];
	// 	location = address.AddressLine ?? address.City;
	// }
	
	const otherInformationString = data.user.HealthProfile.OtherInformation;

	if (otherInformationString !== ''){
	const otherInformationObject = JSON.parse(otherInformationString);
	 organization = otherInformationObject.Org;
	 location = otherInformationObject.Location;
	}

	console.log('user', JSON.stringify(data.user.User, null, 2));

</script>

<div class="card-body ">
	<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
		EDIT PROFILE
	</h2>
	<form
		class="max-[425px]:w-full overflow-auto scrollbar-medium"
		method="post"
		action="?/updateProfile"
	>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>First Name</span>
		</div>
		<input
			placeholder="First Name"
			name="firstName"
			required
			type="text"
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
			bind:value={firstName}
		/>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>Last Name</span>
		</div>
		<input
			placeholder="Last Name"
			type="text"
			name="lastName"
			required
			bind:value={lastName}
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
		/>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>Date of Birth</span>
		</div>
		<input
			type="date"
			name="birthDate"
			value={birthDate}
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
		/>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>Phone</span>
		</div>
		<input
			placeholder="Phone Number"
			type=""
			name="phone"
			required
			bind:value={phone}
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
		/>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>Organization</span>
		</div>
		<input
			placeholder="Enter Organization"
			name="organization"
			value={organization}
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
		/>
		<div class="text-[#5B7AA3] mx-2 mt-3 font-semibold">
			<span>Location</span>
		</div>
		<input
			placeholder="Location"
			name="location"
			value={location}
			class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
		/>
		<div
			class="w-[340px] max-[425px]:w-full h-[52px] mt-[16px] mr-[17px] mb-4 pt-[15px] text-center pb-15px  rounded-[10px] bg-[#5B7AA3]"
		>
			<button
				type="submit"
				class="w-[170px] h-[25px] text-[16px] not-italic text-center text-[#fff] tracking-[3px] font-bold"
				>SUBMIT</button
			>
		</div>
	</form>
</div>
