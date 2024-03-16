<script lang="ts">
  import checkmark from "@Assets/checkmark.svg?raw";
  import plus from "@Assets/plus.svg?raw";
  import { axiosInstance } from "@Utils/http";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { socket } from "@Utils/http";
  import type { chatInstance, ChatList, chats, user } from "@Utils/types";

  const openModal = getContext<Writable<boolean>>("openModal");
  const chatsList = getContext<Writable<ChatList[]>>("chatsList");
  const selectedChat = getContext<Writable<chatInstance>>("selectedChat");
  const user = getContext<Writable<user>>("user");


  const getChats = async () => {
    try {
      const { data } = await axiosInstance.post<ChatList[]>(
        "/chats/getChats",
        $user
      );

      $chatsList = data.chats;
    } catch (error) {
      console.log(error);
    }
  }
  onMount(async () => {
    getChats()
  });

  $: socket.on('chatCreated', async () => {
    await getChats()
  })

  const selectChat = async (chat:chatInstance) => {
    const chatPattern = {
      chatId: chat.chatId,
      chatName: chat.chatName,
      users: chat.users,
    }
    $selectedChat = chatPattern
  }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="users">
  {#each $chatsList as chat}
    <!-- svelte-ignore missing-declaration -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="user" on:click={() => selectChat(chat)}>
      <div class="user__name">{chat.chatName ? chat.chatName :  chat.users[0].username}</div>
      {#if chat.messages}
      <div class="user__text">
        chat.messages.at(-1)
      </div>
      <div class="user__readed">
        {@html checkmark}
      </div>
      {/if}
    </div>
  {/each}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="add" on:click={() => ($openModal = !$openModal)}>
    {@html plus}
  </div>
</div>

<style lang="scss">
  .users {
    height: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    box-sizing: border-box;
    border-left: 10px solid black;
    border-right: 5px solid black;

    &::-webkit-scrollbar {
      width: 5px;
      height: 0px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 1);
    }

    &::-webkit-scrollbar-thumb {
      width: 5px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0px;
    }

    .user {
      width: 100%;
      display: flex;
      flex-direction: column;
      color: black;
      border-bottom: 2px solid;
      height: 80px !important;
      min-height: 80px;
      justify-content: center;
      gap: 10px;
      position: relative;
      align-items: flex-start;
      box-sizing: border-box;
      padding-left: 15px;

      &__readed {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 15px;
        bottom: 10px;

        &.readed {
          :global(svg path) {
            fill: black;
          }
        }

        :global(svg path) {
          fill: rgb(151, 151, 151);
        }
      }

      &__name {
        font-size: 22px;
        font-weight: 600;
      }

      &__text {
        font-size: 18px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 90%;
        white-space: nowrap;
      }
    }

    .add {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background-color: black;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
