export function pushUserIdToDataLayer(userId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'setUserId',
      'userId': userId,
    });
  }
