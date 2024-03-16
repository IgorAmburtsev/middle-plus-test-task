<script lang="ts">
  import type { user, chatInstance } from "@Utils/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { socket } from "@Utils/http";
  import { format } from "date-fns";

  const user = getContext<Writable<user>>("user");

  export let selectedChat: chatInstance;
  let messages: { userTo: string; messageText: string; createdDate: string }[] = [];

  $: socket.emit("findMessages", { chatId: selectedChat.chatId }),
    (messages = []);

  $: socket.on("updateMessages", (data) => {
    messages = [];
    messages = [...messages, ...data];
  });

</script>

<div class="messages">
  {#if selectedChat}
    {#each messages as message}
      <div
        class="message {message.userTo !== $user.usertag
          ? 'flex-end'
          : 'flex-start'}"
      >
        <div class="text {message.userTo !== $user.usertag ? 'my' : 'other'}">
          {message.messageText}
          <div class="date">{format(message.createdDate, "HH:mm")}</div>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .flex-end {
    justify-content: flex-end;
  }

  .flex-start {
    justify-content: flex-start;
  }

  .messages {
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    border-right: 10px solid black;
    position: relative;
    padding-left: 10px;
    overflow-y: scroll;
    padding-right: 10px;
    .message {
      height: fit-content;
      width: 100%;
      display: flex;
      padding-top: 20px;
      box-sizing: border-box;
      .text {
        width: fit-content;
        box-sizing: border-box;
        padding: 10px;
        font-size: 20px;
        border-radius: 5px;
        height: fit-content;
        &.my {
          background-color: rgb(87, 87, 87);
        }
        &.other {
          background-color: rgb(32, 32, 32);
        }
        .date {
          font-size: 15px;
          color: rgb(190, 190, 190);
        }
      }
    }
  }
</style>
