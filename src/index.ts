import { watch } from 'vue'

export default function delayWatch(watchRef: (watchRef: any) => void, callback: (newState: any, oldState: any) => void, interval = 1000, syncCallback: (newState: any, oldState: any) => void = () => {}): ReturnType<typeof watch> {
  // Stores the last update time
  let lastUpdateTime = 0;
  // timeout timer will be stored here to destroy if newer changes get recognized before timer ends
  let changeTimer: ReturnType<typeof setTimeout>;

  // I'm a cool helper that kills the timer safely
  const killTimer = () => { if (changeTimer) clearTimeout(changeTimer); }

  // Watch listener
  return watch(watchRef, async (newState: any, oldState: any) => {
    syncCallback(newState, oldState);

    // Trigger a real update
    const update = () => {
      // Kill timer
      killTimer();
      // Set the last update's time to NOW
      lastUpdateTime = Date.now();
      // Call the callback with the arguments from the native watcher callback
      return callback(newState, oldState);
    }

    // Now is the best time to get what time is now :)))))
    // Oh, so long atime ago!
    const timeSinceLastUpdate = Date.now() - lastUpdateTime;

    // If there we do not need to wait
    if (timeSinceLastUpdate >= interval) {
      update();
    }
    else {
      // Kill current timer
      killTimer();
      // Set new timer to a timer that relates to THIS update (which overwrites the old timer in fact)
      changeTimer = setTimeout(update, interval - timeSinceLastUpdate);
    }
    
  });
}