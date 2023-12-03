<script lang="ts">
    import { page } from '$app/stores'
  
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-BZBWK8FXCN', {
          page_title: document.title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
 