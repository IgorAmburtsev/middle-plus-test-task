<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { user } from "@Utils/types";
  import Login from "./Login.svelte";
  import Chat from "./Chat.svelte";
  import Modal from "@Components/Modal.svelte";

  const user = getContext<Writable<user>>("user");
  const openModal = getContext<Writable<boolean>>("openModal");
</script>

{#if !$user.usertag}
  <Login />
{:else}
  <Chat />
{/if}

{#if $openModal}
  <Modal />
{/if}
