import type { PageServerLoad } from "./$types";
import Parser from 'rss-parser';
import { getCommunityFeed, getRaahiFeed } from "../../../../api/services/newsfeed";
import { TimeHelper } from "$lib/utils/time.helper";

////////////////////////////////////////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageServerLoad = async (event) => {
    try {
      const sessionId = event.cookies.get('sessionId');
      const raahiFeed = await getRaahiFeed(sessionId);
      const communityFeed = await getCommunityFeed(sessionId);
      // console.log("communityFeed...",communityFeed);
      // console.log("communityFeed type...",typeof(communityFeed));
      console.log("rss feeds---",await loadRSSFeeds(raahiFeed, 
        communityFeed));
      return await loadRSSFeeds(raahiFeed, 
        communityFeed
        );
        //return await loadStaticFeeds();
    }
    catch (error) {
        console.error(`Error retrieving news-feed: ${error.message}`);
    }
};

// async function loadStaticFeeds() {
//   const newsItems = [];
//   const newsFeeds = [];
//   const parser = new Parser();
//   const feed = await parser.parseURL(RAAHI_UPDATES_NEWSFEED_RSS_LINK);
//   console.log(feed.title);
//   feed.items.forEach(item => {
//     newsItems.push({
//       title: item.title,
//       link: item.link,
//       pubDate: hrt(new Date(item.pubDate), '%relative% ago'),
//       description: item.description,
//       source: item.source
//     });
//   });

//   const newsfeed = await parser.parseURL(COMMUNITY_UPDATES_NEWSFEED_RSS_LINK);
//   console.log(newsfeed.title);
//   newsfeed.items.forEach(item => {
//     newsFeeds.push({
//       title: item.title,
//       link: item.link,
//       pubDate: hrt(new Date(item.pubDate), '%relative% ago')
//     });
//   });
//   return {
//     newsItems,
//     newsFeeds
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function loadRSSFeeds(raahiFeed, communityFeed) {

  console.log(`${raahiFeed}`);
  console.log(`${communityFeed}`);

  // const raahiFeedItems = [];
  const communityFeedItems = [];

  const parser = new Parser();

  // const raahifeed_ = await parser.parseString(raahiFeed);
  // console.log(raahifeed_.title);
  // raahifeed_.items.forEach(item => {
  //   console.log(JSON.stringify(item, null, 2));
  //   raahiFeedItems.push({
  //     id: item.guid,
  //     title: item.title,
  //     link: item.link,
  //     pubDate: hrt(new Date(item.pubDate), '%relative% ago'),
  //     content: item.content,
  //     image: item.enclosure?.url,
  //     author: item.author,
  //   });
  // });

  const communityFeed_ = await parser.parseString(communityFeed);
  console.log(communityFeed_.title);
  communityFeed_.items.forEach(item => {
    console.log(JSON.stringify(item, null, 2));
    communityFeedItems.push({
      id: item.guid,
      title: item.title,
      link: item.link,
      pubDate: TimeHelper.getHumanReadableDate(item.pubDate),
      date: new Date(item.pubDate),
      content: item.content,
      image: item.enclosure?.url,
      author: item.author,
    });
  });
  // console.log("Raahi feed items",raahiFeedItems);
  console.log("Community feed items",communityFeedItems);
  const communityFeedItemsSort=communityFeedItems.sort((a, b) => b.date - a.date);
  return {
    // raahiFeedItems: raahiFeedItems,
    communityFeedItems: communityFeedItemsSort
  };
}
