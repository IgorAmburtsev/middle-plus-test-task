<script lang="ts">
  import send from "@Assets/send.svg?raw";
  import { socket } from "@Utils/http";
  import type { chatInstance, user } from "@Utils/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let selectedChat: chatInstance;

  const user = getContext<Writable<user>>("user");

  let messageText: string = "";

  const sendMessage = () => {
    let messagePattern = {
      messageText: messageText,
      userFrom: $user.usertag,
      userTo: selectedChat.users[0].usertag,
      chatId: selectedChat.chatId,
    };
    socket.emit("createMessage", messagePattern);
    messageText = "";
    socket.on("createdMessage", (data) => {
      if (data.userTo === $user.usertag) {
        new Notification(`You recieve a message ${data.userTo}!`, {body: `New message from ${data.userFrom}`});
      }
      socket.emit("findMessages",  { chatId: selectedChat.chatId, userTo: selectedChat.users[0].usertag });
    });
    return;
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bottom">
  <textarea class="textarea" bind:value={messageText} />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="send" on:click={sendMessage}>
    {@html send}
  </div>
</div>

<style lang="scss">
  .bottom {
    width: 100%;
    height: fit-content;
    border-radius: 0 0 11px 0;
    background: black;
    box-sizing: border-box;
    padding: 10px 10px 6px 0px;
    position: relative;
    .textarea {
      width: 100%;
      height: 120px;
      padding-left: 10px;
      box-sizing: border-box;
      padding-top: 10px;
      font-size: 20px;
      border-radius: 0 0 11px 0;
    }
    .send {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 40px;
      border-radius: 50%;
      right: 20px;
      z-index: 10;
    }
  }
</style>
