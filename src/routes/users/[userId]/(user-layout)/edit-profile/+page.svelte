<script lang="ts">
    import type { PageServerData } from './$types';
    import date from 'date-and-time';
    import { writable, get } from 'svelte/store';

    // create a writable store for storing the file that will be uploaded
    let file = writable(null);

    export let data: PageServerData;

    let userId = data.user.User.id;
    let birthDate = date.format(new Date(data.user.User.Person.BirthDate), 'MM-DD-YYYY');
    let firstName = data.user.User.Person.FirstName;
    let lastName = data.user.User.Person.LastName;
    let phone = data.user.User.Person.Phone;
    phone = phone.startsWith('+91') ? phone.replace('+91-', '') : phone;

    let addresses = data.user.User.Person.Addresses;
    let location = "Mumbai";
    if (addresses.length > 0) {
    let address = addresses[0];
        location = address.AddressLine ?? address.City;
    }
    //console.log("address", location);

    console.log("user", JSON.stringify(data.user.User, null, 2));

    async function uploadFile() {
        // get the file from the store
        const f = get(file);
    }

</script>

<!-- <div
	class="card card-compact card-bordered w-[375px] h-[701px] border-slate-200 bg-base-100 rounded-none rounded-t-[44px] shadow-sm"
> -->
	<div class="card-body ">
        <!-- <input type="file" bind:value={file}> -->
        <!-- <button on:click={uploadFile}>Upload file</button> -->

		<!-- <button on:click={uploadFile} class=" h-[5px] w-[73px] bg-[#e3e3e3] flex ml-36 mt-2 rounded" /> -->
		<h2 class=" text-[#5b7aa3] flex  justify-center tracking-widest font-bold text-base ">
			EDIT PROFILE
		</h2>
        <form class="max-[425px]:w-full" method="post" action="?/updateProfile">
            <!-- <div name="userId"  value={userId} class='hidden'></div> -->
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
                placeholder="BirthDate"
                type=""
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
                <span>Location</span>
            </div>
            <input
                placeholder="Location"
                name="address"
                bind:value={location}
                class=" h-[52px] w-[340px] max-[425px]:w-full py-2 px-3 border rounded-lg bg-[#DFE7FD] mt-1 text-lg "
            />

        <div class="w-[340px] max-[425px]:w-full h-[52px] mt-[16px] mr-[17px] mb-4 pt-[15px] text-center pb-15px  rounded-[10px] bg-[#5B7AA3]">
            <button type="submit"
                class="w-[170px] h-[25px] text-[16px] not-italic text-center text-[#fff] tracking-[3px] font-bold"
            >SUBMIT</button>
        </div>
    </form>

	</div>
<!-- </div> -->
