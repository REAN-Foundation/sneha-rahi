import { loadFlashMessage } from 'sveltekit-flash-message/server';

export const load = loadFlashMessage(async (event) => {
  const data = { someOther: 'data' };
  return data;
});
