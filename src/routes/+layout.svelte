<script lang="ts">
  import '../app.postcss';
 
  import Toasts from '$lib/components/toast/toasts.svelte';
  import { page } from '$app/stores';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { beforeNavigate } from '$app/navigation';


  beforeNavigate(()=>{
    console.log(`previous URL: ` + $page.url.href)
    LocalStorageUtils.setItem('prevUrl', $page.url.href);
  });

</script>

<!-- {#if browser } -->
  <Toasts/>
<!-- {/if} -->

<!-- <Modal show={$modal}> -->
<slot>
    <main>
    </main>
</slot>
<!-- </Modal> -->
