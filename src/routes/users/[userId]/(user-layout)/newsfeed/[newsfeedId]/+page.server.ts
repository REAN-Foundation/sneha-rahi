import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { getFeedItemById } from '../../../../../../routes/api/services/newsfeed';

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
         const userId = event.params.userId;
    try {
        const rssFeedItemId = event.params.newsfeedId;
        console.log(rssFeedItemId);
        const sessionId = event.cookies.get('sessionId');
        const feedItem_ = await getFeedItemById(sessionId, rssFeedItemId);
        const feedItem = feedItem_.RssfeedItem;
        //console.log(feedItem)
        return {
            feedItem,
        };
    }
    catch (error) {
        console.error(`Error retrieving rss feed: ${error.message}`);
        return {
            location: `/users/${userId}/home`,
        };
    }
};
