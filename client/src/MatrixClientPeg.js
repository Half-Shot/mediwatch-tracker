/**
 * This class will hold the matrix client
 */
import * as Matrix from "matrix-js-sdk";

export const E_NOLOGIN = 1;

export class MatrixClientPeg {
    constructor() {
        this.client = null;
    }

    async attemptToGetLoggedIn() {
        const accessToken = window.localStorage["mx_accesstoken"];
        const baseUrl = window.localStorage["mx_url"];

        if (!accessToken || !baseUrl) {
            throw E_NOLOGIN;
        }

        // We have enough to get going with, so get going.
        this.config = Matrix.createClient({
            accessToken,
            baseUrl,
        });

        // Connect!
        await client.startClient({initialSyncLimit: 10});
        return client;
    }

    setClient(client) {
        this.client = client;
    }

    getClient() {
        return this.client;
    }
}

const instance = new Config();

export default instance;