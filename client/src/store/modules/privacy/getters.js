import * as types from '@/store/types';

import {SECURITY_LEVELS_MAP} from "./privacy";

export default {
    securityLevel(state) {
        console.log("SEC:", state.securityLevel);
        return SECURITY_LEVELS_MAP[state.securityLevel || 2];
    },
};
