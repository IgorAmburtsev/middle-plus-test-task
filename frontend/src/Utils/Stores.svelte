<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { setContext, onMount } from "svelte";
  import { axiosInstance } from "./http";
  import type { user } from "./types";

  const user = writable<user | string>("");
  const loginState: Writable<string> = writable("");
  const openModal = writable(false);
  const chatsList = writable([]);
  const selectedChat = writable("");

  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get<user>("/auth/user");
      $user = data;
    } catch (error) {
      console.log(error);
    }
  }

  $: if (!$user) {
    getUser()
  }

  onMount(() => {
    Notification.requestPermission()
  });

  setContext("user", user);
  setContext("loginState", loginState);
  setContext("openModal", openModal);
  setContext("chatsList", chatsList);
  setContext("selectedChat", selectedChat);
</script>

<slot />
