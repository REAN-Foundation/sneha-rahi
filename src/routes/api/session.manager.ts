
export interface Session {
    sessionId?      : string;
    accessToken?    : string;
    userId?         : string;
    email?          : string;
    phone?          : string;
    username?       : string;
    profileImageUrl?: string
    fullName?       : string;
    firstName?      : string;
    roleId?         : string;
    age?            : string;
    expiryDate?     : Date;
}

export class SessionManager {

    static _sessions = [];

    static addSession = (sessionId: string, session: Session): Promise<Session|null> => {
        if (!session?.sessionId) {
            return null;
        }
        //console.log(`Adding session: ${JSON.stringify(session)}`);
        const existingSession = SessionManager._sessions.find((x) => x.sessionId === sessionId);
        if (existingSession) {
            //Remove existing
            SessionManager._sessions = SessionManager._sessions.filter((x) => x.sessionId !== sessionId);
        }
        //console.log(`Add new session: ${JSON.stringify(session, null, 2)}`);
        SessionManager._sessions.push(session);
        return Promise.resolve(session);
    }

    static getSession = (sessionId): Promise<Session|null> => {
        const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
        if (!session) {
            console.log(`Missing session for : sessionId`);
            return Promise.resolve(null);
        }
        //console.log(SessionHelper._sessions.length);
        //console.log(`Retrieving existing session: ${JSON.stringify(session, null, 2)}`);
        return Promise.resolve(session);
    };

    static isValid = (sessionId): Promise<boolean> => {
        //console.log(`Checking session validity!`);
        //console.log(`${JSON.stringify(SessionHelper._sessions, null, 2)}`);
        const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
        if (!session) {
            return Promise.resolve(false);
        }
        //console.log(`Retrieving existing session: ${JSON.stringify(session, null, 2)}`);
        if (session.expiryDate < new Date()) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    };

    static removeSession = (sessionId): Promise<Session|null> => {
        const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
        if (!session) {
            return Promise.resolve(null);
        }
        SessionManager._sessions = SessionManager._sessions.filter((x) => x.sessionId !== sessionId);
        console.log(`Removing session: ${JSON.stringify(session, null, 2)}`);
        return Promise.resolve(session);
    };

    static constructSession = async (user, token: string, expiryDate: Date): Promise<Session> => {

        console.log(`Constructing session!`);
        console.log(`User: ${user.id}`);
        console.log(`Token: ${token}`);
        console.log(`Expiry date: ${expiryDate.toISOString()}`);

        if(!user || !token || !expiryDate) {
            return null;
        }
        const session: Session = {
            accessToken    : token,
            sessionId      : user.SessionId,
            userId         : user.id,
            email          : user.Person.Email,
            phone          : user.Person.Phone,
            username       : user.UserName,
            profileImageUrl: user.profileImageUrl?? null,
            fullName       : user.Person.FirstName && user.Person.LastName ?
                (user.Person.FirstName + ' ' +  user.Person.LastName) : null,
            firstName      : user.Person.FirstName ?? null,
            roleId         : user.RoleId,
            age            : user.Age,
            expiryDate     : expiryDate
        };
        return Promise.resolve(session);
    }

};
