
export const askQuery = async ( message: string, phone: string, type: string) => {
    const model = {
        phoneNumber: phone,
        type: type,
        message: message
    }
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['authentication'] = 'zxcv';
    const body = JSON.stringify(model);
	const url = 'https://reancare-api-dev.services.reanfoundation.org:443/v1/SNEHA/SNEHA_SUPPORT/zxcv/receive';
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log("response",response);
    return response;
};

