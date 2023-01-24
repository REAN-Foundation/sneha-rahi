import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import type { PersonRole} from "$lib/types/domain.models";
import { error } from '@sveltejs/kit';

/////////////////////////////////////////////////////////////////////

export const getPersonRoles = async (): Promise<PersonRole[]> => {
    try {

        const headers = {};
        headers['Content-Type'] = 'application/json';
        headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
        const url = BACKEND_API_URL + '/types/person-roles';

        const res = await fetch(url, {
            method: 'GET',
            headers
        });
        const response = await res.json();

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(`status code: ${response.HttpCode}`);
            console.log(`error message: ${response.Message}`);
            return [];
        }
        return response.Data.PersonRoleTypes;
    }
    catch (err) {
        const errmsg = `Error retrieving person roles: ${err.message}`;
        console.log(errmsg);
        throw error(500, errmsg);
    }
}

export const getPersonRoleById = (PersonRoles: PersonRole[], roleId) => {
    // console.log(`Person roles = ${JSON.stringify(PersonRoles, null, 2)}`);
    // console.log(`Person roles = ${JSON.stringify(PersonRoles, null, 2)}`);
    const role = PersonRoles.find(x => x.id === roleId);
    console.log(`role: ${JSON.stringify(role, null, 2)}`);
    return role.RoleName;
}

export const getGenderTypes = async () : Promise<string[]> => {

    try {

        const headers = {};
        headers['Content-Type'] = 'application/json';
        headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
        const url = BACKEND_API_URL + '/types/genders';
            const res = await fetch(url, {
            method: 'GET',
            headers
        });
        const response = await res.json();

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(`status code: ${response.HttpCode}`);
            console.log(`error message: ${response.Message}`);
            return [];
        }

        return response.Data.GenderTypes;
    }
    catch (err) {
        const errmsg = `Error retrieving gender types: ${err.message}`;
        console.log(errmsg);
        throw error(500, errmsg);
    }
}