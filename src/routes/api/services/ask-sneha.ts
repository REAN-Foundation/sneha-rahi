import { BOT_API_URL, BOT_API_AUTHENTICATION} from "$env/static/private";

export const askQuery = async ( message: string, phone: string, type: string) => {
    const model = {
        phoneNumber: phone,
        type: type,
        message: message
    }
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['authentication'] = BOT_API_AUTHENTICATION ;
    const body = JSON.stringify(model);
	const url = BOT_API_URL;
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log("response",response);
    return response;
};

