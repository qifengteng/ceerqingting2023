import { defineStore } from "pinia";
import { KeepAliceState } from "@/stores/interface";

export const useKeepAliveStore = defineStore({
    id: "ceer-keepAlive",
    state: (): KeepAliceState => ({
        keepAliveName: []
    }),
    actions: {
        // Add keepAliveName
        async addKeepAliveName(name: string) {
            !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
        },
        // Remove KeepAliveName
        async removeKeepAliveName(name: string) {
            this.keepAliveName = this.keepAliveName.filter(item => item !== name);
        },
        async setKeepAliveName(keepAliveName: string[] = []) {
            this.keepAliveName = keepAliveName;
        }
    }
});
