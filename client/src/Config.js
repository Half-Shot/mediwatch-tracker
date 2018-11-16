/**
 * Configuration for the app.
 */
class Config {
    constructor() {
        // Load dat config.
        this.loadFailure = false;
        this.result = this._fetchConfig().then(() => {
            console.log("Got config:", this._config);
            return true;
        }).catch((ex) => {
            this.loadFailure = ex.message;
            return ex.message;
        })
    }

    loadResult () {
        return this.result;
    }

    async _fetchConfig() {
        const res = await fetch("./config.json");
        this._config = await res.json();
    }

    getDefaultHomeserver() {
        return this._config.defaultHomeserver || "https://104.248.165.185";
    }
}

const config = new Config();

export default config;