import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
    id: "ceer-user",
    state: (): UserState => ({
        token: "",
        userInfo: { name: "mikasa" }
    }),
    getters: {},
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        // Set setUserInfo
        setUserInfo(userInfo: UserState["userInfo"]) {
            this.userInfo = userInfo;
        }
    },
    persist: piniaPersistConfig("ceer-user")
});
