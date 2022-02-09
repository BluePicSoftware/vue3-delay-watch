# Vue 3 Delay watch

## Usage

```javascript
import delayWatch from 'vue3-delay-watch'

const foo = ref('bar');

delayWatch(foo, (newVal, oldVal) => {
  console.log('foo did changed!', newVal);
}, 1000);
```


### Arguments

1. The watcher function or watched target (same as `watch` uses) (**required**)
2. The watcher callback (**required**)
3. The minimum delay in milliseconds between the update hooks (default is `1000`)
4. Sync callback without delay