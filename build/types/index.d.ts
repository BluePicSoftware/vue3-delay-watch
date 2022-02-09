import { watch } from 'vue';
export default function delayWatch(watchRef: (watchRef: any) => void, callback: (newState: any, oldState: any) => void, interval?: number, syncCallback?: (newState: any, oldState: any) => void): ReturnType<typeof watch>;
