import { getAllLinkages } from '../../../../api/services/linkages';
import type { PageServerLoad } from "./$types";

////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event) => {
    try {
        const sessionId = event.cookies.get('sessionId');
        const userId = event.params.userId;
        const allLinkages = await getAllLinkages(sessionId);
        console.log(`All linkages = ${JSON.stringify(allLinkages)}`);
        return {
            userId,
            allLinkages
        };
    }
    catch (error) {
        console.error(`Error retrieving linkages: ${error.message}`);
        return {
            location: `/home`,
        };
    }
};