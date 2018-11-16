/**
 * This class will hold the matrix client
 */
const Matrix = require("matrix-js-sdk");

export const E_NOLOGIN = 1;

export class MatrixClientPeg {
    constructor() {
        this.client = null;
    }

    attemptToGetLoggedIn() {
        if (this.client != null) {
            return;
        }
        this.client = (async () => {
            const accessToken = window.localStorage["mx_accesstoken"];
            const baseUrl = window.localStorage["mx_url"];
            const userId = window.localStorage["mx_userId"];
    
            if (!accessToken || !baseUrl) {
                throw E_NOLOGIN;
            }
    
            // We have enough to get going with, so get going.
            this.client = Matrix.createClient({
                accessToken,
                baseUrl,
                userId,
            });
    
            // Connect!
            this.client.startClient({initialSyncLimit: 10});
            return this.client;
        })();
    }

    unsetClient(nukeTheTokens = false) {
        this.client = null;
        if (nukeTheTokens) {
            window.localStorage.removeItem("mx_accesstoken");
            window.localStorage.removeItem("mx_userId");
            // Don't remove the URL because they might want that to log back in with.
        }
    }

    getClient() {
        return this.client;
    }
}

const instance = new MatrixClientPeg();

export default instance;