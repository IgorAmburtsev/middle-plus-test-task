<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { user } from "@Utils/types";
    import Login from "./Login.svelte";
    import Chat from "./Chat.svelte";

    const user = getContext<Writable<user>>("user");
</script>

{#if $user}
    <Chat />
{:else}
    <Login />
{/if}

