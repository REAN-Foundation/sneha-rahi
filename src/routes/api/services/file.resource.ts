import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { SessionManager } from "../session.manager";
import { error } from "@sveltejs/kit";
import { get_ } from "./common";
import { ServerHelper } from "$lib/server/server.helper";
import axios from 'axios';

////////////////////////////////////////////////////////////////

export const uploadBinary = async (sessionId: string, buffer: Buffer, filename: string, isPublic = true) => {

    const url = BACKEND_API_URL + `/file-resources/upload-binary`;
    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;

	const mimeType = ServerHelper.getMimeTypeFromFileName(filename);
	console.log(`mimeType = ${mimeType}`);

    const headers = {};
    headers['Content-Type'] = 'application/octet-stream';
    headers['filename'] = filename;
    headers['public'] = isPublic ? 'true' : 'false';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['size'] = buffer.length.toString();

    const config = {
        method: 'post',
        url: url,
        headers: headers,
        data: buffer
    };

    // console.log(JSON.stringify(config, null, 2));

    const res = await axios(config);

    const response = res.data;

    if (response['Status'] === 'failure') {
        if(response['HttpCode'] !== 201 && response['HttpCode'] !== 200) {
            console.log(`get_ response message: ${response['Message']}`);
            throw error(response['HttpCode'], response['Message']);
        }
    }

    console.log(`get_ response message: ${response['Message']}`);
    return response;
};

// export const upload = async (sessionId: string, filePath: string, filename: string, isPublic = true) => {

//     const url = BACKEND_API_URL + `/file-resources/upload`;
//     const session = await SessionManager.getSession(sessionId);
//     const accessToken = session.accessToken;

// 	const mimeType = ServerHelper.getMimeTypeFromFileName(filename);
// 	console.log(`mimeType = ${mimeType}`);

//     const p = path.join(process.cwd(), filePath);
//     const form = new FormData();
//     form.append("name", fs.readFileSync(p));
//     //form.append("IsPublicResource", isPublic ? "true" : "false");
//     console.log(filePath);

//     const headers = {
//         ...form.getHeaders()
//     };
//     //headers['enc'] = 'multipart/form-data';
//     // headers['Content-Type'] = "application/x-www-form-urlencoded";
//     headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
//     headers['Authorization'] = `Bearer ${accessToken}`;

//     // const config = {
//     //     method: 'post',
//     //     url: url,
//     //     headers: headers,
//     // };

//     console.log(JSON.stringify(headers, null, 2));
//     console.log(form);

//     const response = await axios.post(url, form, headers);

//     if (response['Status'] === 'failure') {
//         if(response['HttpCode'] !== 201 && response['HttpCode'] !== 200) {
//             console.log(`get_ response message: ${response['Message']}`);
//             throw error(response['HttpCode'], response['Message']);
//         }
//     }

//     console.log(`get_ response message: ${response['Message']}`);
//     return response['Data'];
// };

export const getFileResourceById = async (sessionId, fileResourceId) => {
    const url = BACKEND_API_URL + `file-resources/${fileResourceId}`;
    return await get_(sessionId, url);
};

export const download = async (sessionId, fileResourceId, asAttachment = false) => {

    let url = BACKEND_API_URL + `file-resources/${fileResourceId}/download`;
    if (asAttachment) {
        url = url + `?disposition=attachment`;
    }
    const session = await SessionManager.getSession(sessionId);
    const accessToken = session.accessToken;

    const headers = {};
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
    headers['responseType'] = `arraybuffer`;

    const res = await fetch(url, {
        method: 'GET',
        headers
    });

    const data = await res.arrayBuffer();
    if (data) {
        const responseHeaders = res.headers;
        const contentType = responseHeaders['content-type'];
        const parts = contentType.split('/');
        const extension = parts.pop();
        let filename = 'download-' + Date.now().toString() + '.' + extension;
        if (asAttachment === true) {
            const disposition = responseHeaders['content-disposition'];
            if (disposition) {
                const tokens = disposition.split('filename=');
                if (tokens.length > 1) {
                    filename = tokens[1];
                }
            }
        }
        return {
            success: true,
            Data: {
                Buffer: data,
                FileName: filename,
                MimeType: contentType,
            },
        };
    }
    else {
        const response = await res.json();
        console.log(`get_ response message: ${response.Message}`);
        throw error(response.HttpCode, response.Message);
    }
};

export function downloadAsAttachment(response) {

    const blob = new Blob([response.Data.Buffer]);
    const objUrl = URL.createObjectURL(blob);
    const fileName = response.Data.FileName ?? 'def_download.jpg';

    const a = document.createElement("a");
    a.href = objUrl;
    a.setAttribute('download', fileName);

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(objUrl);
            a.removeEventListener('click', clickHandler);
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();

    document.body.appendChild(a);
}
