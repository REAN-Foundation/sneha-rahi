<script lang="ts">
  import { page } from '$app/stores';
  const userId = $page.error.userId;
  const message = $page.error.message;
  const code = $page.error.code;
</script>

<div class="flex items-center justify-center mt-16">
	<div class="card card-compact w-[375px] h-[812px] bg-base-100 border-2 rounded-none">
		<div class="card-body">
			<div class="flex flex-col items-center justify-center h">
				<img
					src="/assets/images/about-raahi/png/logo.png"
					alt=""
					class="w-[110px] h-[50px] mt-[10px] object-contain  "
				/>
			</div>
      <div class="flex flex-col text-center justify-center">
        <img src="/assets/images/about-raahi/png/splashscreen-raahi.png" alt="" class="mt-[50px]" />
        <h2 class=" text-[#5b7aa3] font-bold w-[335px] h-[44px] mt-6 mb-4 leading-[23px]">
          Oops! Something went wrong!
        </h2>
        {#if code}
          <h1 class=" text-[#f06340] font-bold w-[335px] h-[44px] mt-4 mb-2 leading-[23px] font">
            {code}
          </h1>
        {/if}
        <p class=" font-normal text-[#000] mb-6">
          {message}
        </p>
      </div>
			<div class="flex flex-col text-center justify-center mt-4">
        {#if userId }
          <a href={`/users/${userId}/home`}>
            <button class="w-[340px] h-[52px] rounded-[10px] bg-[#5b7aa3] uppercase text-[#fff] tracking-[3px] text-[17px]">
              Back to Home
            </button>
          </a>
        {:else}
          <a href="/sign-in">
            <button class="w-[340px] h-[52px] rounded-[10px] bg-[#5b7aa3] uppercase text-[#fff] tracking-[3px] text-[17px]">
              Sign-in
            </button>
          </a>
        {/if}
			</div>
		</div>
		<img
			src="/assets/images/about-raahi/png/colors-strip.png"
			alt=""
			class="w-[375px] h-[10px] object-contain"
		/>
	</div>
</div>