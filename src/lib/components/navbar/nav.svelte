<script lang="ts">
    import { navbarDisplay } from './navbar.display.store';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

    export let show = false;
    export let userId = undefined;
    const dispatch = createEventDispatcher();

    let learningHomeLink;
	let myProfileLink;
	let askSnehaLink;
	let newsFeedLink;
	let chatLink;
	let linkagesLink;
	let homeLink;
    let aboutSnehaLink;
    let settingsLink;

    onMount(()=> {
        homeLink = `/users/${userId}/home`
        learningHomeLink = `/users/${userId}/my-learnings`;
        myProfileLink = `/users/${userId}/my-profile`;
        askSnehaLink = `/users/${userId}/ask-sneha`;
        newsFeedLink = `/users/${userId}/newsfeed`;
        chatLink = `/users/${userId}/chat`;
        linkagesLink = `/users/${userId}/linkages`;
        aboutSnehaLink = `/users/${userId}/about-sneha`;
        settingsLink = `/users/${userId}/settings`;
    });

    const unsubscribe = navbarDisplay.subscribe(value => {
		show = value;
	});

	const toggleSidebar = () => {
		console.log(`toggling the sidebar`);
        $navbarDisplay = !$navbarDisplay;
	}

    const gotoHome = async () => {
        await goto(homeLink);
        toggleSidebar();
    }

    const gotoMyProfile = async () => {
        await goto(myProfileLink);
        toggleSidebar();
    }

    const gotoLearningHome = async () => {
        await goto(learningHomeLink);
        toggleSidebar();
    }

    const gotoAskSneha = async () => {
        await goto(askSnehaLink);
        toggleSidebar();
    }

    const gotoNewsFeed = async () => {
        await goto(newsFeedLink);
        toggleSidebar(); 
    }

    const gotoChat = async () => {
        await goto(chatLink);
        toggleSidebar();
    }

    const gotoLinkages = async () => {
        await goto(linkagesLink);
        toggleSidebar();
    }

    const gotoSettings = async () => {
        await goto(settingsLink);
        toggleSidebar();
    }

    const gotoLogout = async () => {
        toggleSidebar();
        dispatch("logout");
    }

    const gotoAboutSneha = async () => {
       await goto(aboutSnehaLink);
        toggleSidebar();
    }
    onDestroy(unsubscribe);

</script>

{#if show}
    <div class="card rounded-none h-[812px] max-[425px]:w-screen w-[375px] max-[425px]:h-screen bg-[#DFE7FD] lg:mt-10 md:mt-10 sm:mt-10 mt-0">
        <div class="mt-10">
            <ul class="p-4 overflow-y-auto max-[425px]:w-full max-[425px]:h-full w-[375px] h-[750px] text-base-content bg-[#DFE7FD]">
                <!-- <div class="relative flex items-center ">
                    <input
                        placeholder="Search"
                        class=" text-[#5b7aa3] h-[40px] w-[220px] px-3 border rounded-3xl my-5 text-lg bg-[#B6C6E0]  "
                    />
                    <img
                        class="absolute right-32  pr-3"
                        src="/assets/home-sidebar/png/search-icon.png"
                        alt=""
                    />
                </div> -->
                <div class="flex flex-col items-start justify-left h mb-6 ml-2">
                    <img
                        src="/assets/images/about-raahi/png/logo.png"
                        alt=""
                        class="w-[110px] h-[50px] mt-[10px] object-contain  "
                    />
                </div>
                <div class="grid grid-cols gap-2 ">
                    <button class="flex flex-rows" on:click|capture={gotoHome}>
                        <img src="/assets/images/home-sidebar/svg/home-sidebar.svg" alt="" class="my-2 mx-4" />
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">home</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoMyProfile}>
                        <img src="/assets/images/home-sidebar/png/my-profile-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">my profile</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoLearningHome}>
                        <img src="/assets/images/home-sidebar/png/my-learning-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">my learning</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoChat}>
                        <img src="/assets/images/home-sidebar/png/chat-sidebar.png" alt="" class="my-2 mx-4" />
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">chat</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoNewsFeed}>
                        <img src="/assets/images/home-sidebar/png/newsfeed-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">newsfeed</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoLinkages}>
                        <img src="/assets/images/home-sidebar/png/linkages-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">linkages</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoAskSneha}>
                        <img src="/assets/images/home-sidebar/png/ask-sneha-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">ask sneha</h3>
                    </button>
                    <button class="flex flex-rows" on:click|capture={gotoSettings}>
                        <img src="/assets/images/home-sidebar/png/settings-sidebar.png" alt="" class="my-2 mx-4"/>
                        <h3 class="text-center justify-center my-4 uppercase text-[#5B7AA3] ">settings</h3>
                    </button>
                    <div class="flex flex-col  text-[#5B7AA3] cursor-pointer">
                        <button class="ml-4 mr-8 mt-24 text-start text-[#5B7AA3] text-base" on:click|capture={async () => { await gotoLogout(); } }> LOGOUT</button>
                        <button class="ml-4  mt-4 text-base text-start"  on:click|capture={gotoAboutSneha}>ABOUT SNEHA</button>
                    </div>
                </div>
            </ul>
        </div>
    </div>

{/if}
