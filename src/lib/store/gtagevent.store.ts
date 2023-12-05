import { writable } from 'svelte/store';

export const addEventUsingStore = writable((eventName,attributes) => {
  console.log('gtag custom event.')
  console.log('Event Name',eventName);
  console.log('Attributes',attributes);
  try{
    gtag('event', eventName,attributes);
  }catch(error){
    console.log('Error setting custom event for GA4',error);
  }
});
    
//Note : Install 
//npm install --save-dev @types/gtag.js    

