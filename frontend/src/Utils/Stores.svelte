<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { setContext } from 'svelte';

    const user = writable('');
    const loginState:Writable<string> = writable('');

    setContext('user', user);
    setContext('loginState', loginState);
</script>

<slot />