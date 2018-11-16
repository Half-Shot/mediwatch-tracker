/**
 * This class will hold the matrix client
 */
import * as Client from "matrix-js-sdk";

export class MatrixClientPeg {
    constructor() {
        this.client = null;
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