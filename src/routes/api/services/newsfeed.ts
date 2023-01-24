import { BACKEND_API_URL } from "$env/static/private";
import { get_} from "./common";
////////////////////////////////////////////////////////////////

export const getCommunityFeed = async (sessionId: string) => {
    const url = BACKEND_API_URL + `/rss-feeds/search?title=Community`;
    const results = await get_(sessionId, url);
    const items = results.RssfeedRecords.Items;
    console.log(JSON.stringify(items, null, 2));
    let item = null;
    if (items.length > 0) {
        item = items[0];
    }
    else {
        return null;
    }
    console.log(`Rss feed link: ${item?.RssFeedLink}`);
    return await getFeed(item?.RssFeedLink);
};

export const getRaahiFeed = async (sessionId: string) => {
    const url = BACKEND_API_URL + `/rss-feeds/search?title=Raahi`;
    const results = await get_(sessionId, url);
    const items = results.RssfeedRecords.Items;
    console.log(JSON.stringify(items, null, 2));
    let item = null;
    if (items.length > 0) {
        item = items[0];
    }
    else {
        return '';
    }
    console.log(`Rss feed link: ${item?.RssFeedLink}`);
    return await getFeed(item?.RssFeedLink);
};

export const getFeed = async (url: string) => {
    // const session = await SessionManager.getSession(sessionId);
    // const accessToken = session.accessToken;
    //console.log(`accessToken = ${accessToken}`);
    const headers = {};
    //headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    //headers['Authorization'] = `Bearer ${accessToken}`;
    //console.log(`Rss feed: ${url}`);
    const res = await fetch(url, {
        method: 'GET',
        headers
    });
    const response = await res.text();
    // console.log(`Rss feed: ${response}`);
    return response;
}

export const getFeedItemById = async (sessionId: string, rssFeedItemId: string ) => {
    const url = BACKEND_API_URL + `/rss-feeds/feed-items/${rssFeedItemId}`;
    return await get_(sessionId, url);
};
