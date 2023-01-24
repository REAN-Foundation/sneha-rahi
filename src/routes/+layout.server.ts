import type { ServerLoadEvent } from '@sveltejs/kit';
import { loadFlash } from 'sveltekit-flash-message/server';

export function load(event: ServerLoadEvent) {
  // Returns an object: { flash: App.PageData['flash'] | undefined }
  const flashData = loadFlash(event);
  //console.log(`Layout ............... ${JSON.stringify(flashData, null, 2)}`);
  return flashData;
}
