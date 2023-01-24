import type { LoginModel, OtpModel } from "$lib/types/domain.models";
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from "$env/static/private";
import { Helper } from "$lib/utils/helper";
//import type { UserModel } from "$lib/types/domain.models";
import { delete_, get_, post_, put_ } from "./common";

////////////////////////////////////////////////////////////////

export const sendOtp = async (phone: string, loginRoleId: number) => {

    const model: LoginModel = getOtpModel(phone, loginRoleId);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/users/generate-otp';

    // console.log(body);
    // console.log(url);
    // console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    return response;
};

const getOtpModel = (phone: string, loginRoleId: number): OtpModel => {
    const loginModel: OtpModel = {
        Phone: Helper.sanitizePhone(phone),
        RoleId: loginRoleId ?? 2,
        Purpose: 'Login'
    };
    return loginModel;
}

////////////////////////////////////////////////////////////////////////////////////

export const registerUser = async (
    firstName: string,
    lastName: string,
    birthDate: Date,
    phone: string,
    address: string
) => {

    const model = {
        FirstName: firstName,
        LastName: lastName,
        BirthDate: birthDate,
        Phone: phone,
        Address: {
            Type: "Home",
            AddressLine: address,
            Location: address
        }
    };
    if (Helper.isPhone(phone)) {
        model.Phone = Helper.sanitizePhone(phone);
    }
    console.log(JSON.stringify(model, null, 2))

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/patients';

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log("response", response);
    return response;
};

// const getUserModel = (
//     firstName: string,
//     lastName: string,
//     birthDate: Date,
//     phone: string,
//     address: string
// ): UserModel => {
//     const userModel: UserModel = {};
//     userModel.FirstName = firstName;
//     userModel.LastName = lastName;
//     userModel.BirthDate = birthDate;
//     userModel.Address.AddressLine = address;
//     userModel.Address.Type = "Home";

//     if (Helper.isPhone(phone)) {
//         userModel.Phone = Helper.sanitizePhone(phone);
//     }
//     return userModel;
// };

////////////////////////////////////////////////////////////////////////////////////

export const loginWithOtp = async (otp: string, phone: string, loginRoleId: number) => {

    const model: LoginModel = getLoginModel(otp, phone, loginRoleId);
    console.log(JSON.stringify(model, null, 2));

    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    const url = BACKEND_API_URL + '/users/login-with-otp';

    console.log(body);
    console.log(url);
    console.log(JSON.stringify(headers, null, 2));

    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    return response;
};

const getLoginModel = (otp: string, phone: string, loginRoleId: number): LoginModel => {
    const loginModel: LoginModel = {
        Phone: Helper.sanitizePhone(phone),
        LoginRoleId: loginRoleId ?? 2,
    };
    if (Helper.isOtp(otp)) {
        loginModel.Otp = otp;
    }
    return loginModel;
}

////////////////////////////////////////////////////////////////////////////////////

export const searchUsersByName = async (sessionId: string, name?: string, phone?: string) => {
    let url = BACKEND_API_URL + '/patients/search?pbirthDateIndex=0&itemsPerPbirthDate=5';
    if (name) {
        url += `&name=${name}`;
    }
    if (phone) {
        url += `&phone=${phone}`;
    }
    return await get_(sessionId, url);
};

////////////////////////////////////////////////////////////////////////////////////

export const logout = async (sessionId: string) => {
    const url = BACKEND_API_URL + `/users/logout`;
    return await post_(sessionId, url, {});
};

////////////////////////////////////////////////////////////////////////////////////

export const getUserById = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/patients/${userId}`;
    return await get_(sessionId, url);
};

///////////////////////////////////////////////////////////////////////////////////////////

export const updateProfile = async (
    sessionId: string,
    userId: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    phone: string,
    address: string,
) => {
    const body = {
        FirstName: firstName,
        LastName: lastName,
        BirthDate: birthDate,
        Phone: phone,
        Address: {
            Type: "Home",
            AddressLine: address,
            City: address,
        }
    };
    console.log(JSON.stringify(body, null, 2));
    const url = BACKEND_API_URL + `/patients/${userId}`;
    return await put_(sessionId, url, body);
};

export const updateProfileImage = async (
    sessionId: string,
    userId: string,
    profileImageResourceId: string,
) => {
    const body = {
        ImageResourceId: profileImageResourceId,
    };
    console.log(profileImageResourceId);
    const url = BACKEND_API_URL + `/patients/${userId}`;
    return await put_(sessionId, url, body);
};

///////////////////////////////////////////////////////////////////

export const deleteAccount = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/patients/${userId}`;
    return await delete_(sessionId, url);
};