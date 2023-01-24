
export class Helper {

    static isEmail = (str: string): boolean => {

        const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!str)
            return false;

        if (str.length > 254)
            return false;

        const valid = emailRegex.test(str);
        if (!valid)
            return false;

        const parts = str.split("@");
        if (parts[0].length > 64)
            return false;

        const domainParts = parts[1].split(".");
        if (domainParts.some(function (part) { return part.length > 63; }))
            return false;

        return true;
    };

    static truncateText = (text, numChars) => {
		const txt = text.length > numChars ? text.substring(0, numChars-3) + '...': text;
        return txt;
	}

    static hasProperty = (obj, prop) => {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };

    static isEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    static isOtp = (str: string): boolean => {
        if (str.length < 4 || str.length > 6) {
            return false;
        }
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (Helper.isDigit(c)) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    };

    static isUrl = (str) => {
        if (!str) {
            return false;
        }
        try {
            new URL(str);
            return true;
        } catch (err) {
            return false;
        }
    };

    static formatDate = (date) => {
        const d = new Date(date);
        const month = ('00' + (d.getMonth() + 1).toString()).slice(-2);
        const day = ('00' + d.getDate().toString()).slice(-2);
        const year = d.getFullYear();
        return [year, month, day].join('-');
    };

    static isPhone = (str: string): boolean => {
        if (!str) {
            return false;
        }
        if (str.length < 6 || str.length > 11) {
            return false;
        }
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (Helper.isDigit(c) || c === '-') {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    };

    static sanitizePhone = (phone: string): string => {
        if (!phone) {
            return phone;
        }
        if (phone.startsWith('1000001') || phone.startsWith('1000002')) {
            //Internal test phone numbers
            return phone;
        }
        const prefix = '+91-';
        if (!phone.startsWith(prefix)) {
           return prefix + phone
        }
        return phone;
    }

    static isAlpha = (c) => {
        const alphas = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphas.indexOf(c) !== -1;
    };

    static isAlphaVowel = (c) => {
        const alphas = 'aeiouAEIOU';
        return alphas.indexOf(c) !== -1;
    };

    static isDigit = (c) => {
        const digits = '0123456789';
        return digits.indexOf(c) !== -1;
    };

    static isAlphaNum = (c) => {
        return Helper.isAlpha(c) || Helper.isDigit(c);
    };

    static hasAlpha = (str: string) => {
        for (const c of str) {
            if (Helper.isAlpha(c)) {
                return true;
            }
        }
        return false;
    };

    static createResponse = (action: 'message' | 'redirect' | 'error' | 'data', content: string) => {
        return new Response(JSON.stringify({
			action: action,
			content: content
		}))
    };

    static toBase64 =  async (file): Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    static dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    };

    static downloadAsInlineObjectUrl = (response) => {
        return Helper.dataURLtoBlob(response.Data.Buffer);
    };

    static getFileExtensionFromMimeType = (mimeType) => {
        const parts = mimeType.split('/');
        return parts.pop();
    };

    static b64toBlob = async (base64Buffer, mimeType) => {
        const res = await fetch(`data:${mimeType};base64,${base64Buffer}`);
        const blob = await res.blob();
        return blob;
    };

}
