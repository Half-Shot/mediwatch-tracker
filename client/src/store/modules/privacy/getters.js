import * as types from '@/store/types';

import {SECURITY_LEVELS_MAP} from "./privacy";

export default {
    securityLevel(state) {
        const level = 2;
        state.rooms.forEach((rLevel) => {
            if (rLevel < level) { level = rLevel; }
        });
        console.log(state.rooms, SECURITY_LEVELS_MAP);
        return SECURITY_LEVELS_MAP[level];
    },
};
