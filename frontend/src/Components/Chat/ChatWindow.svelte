<script lang="ts">
  import type { user, chatInstance } from "@Utils/types";
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { socket } from "@Utils/http";
  import { format, addHours } from "date-fns";

  const user = getContext<Writable<user>>("user");

  export let selectedChat: chatInstance;
  let messages: {
    userTo: string;
    userFrom: string;
    messageText: string;
    createdDate: string;
    id: number;
    edited: boolean;
  }[] = [];

  let container: HTMLDivElement;
  let messageId: number | null;
  let editing: boolean = false;
  let input: HTMLInputElement;

  const editMessage = (id: number) => {
    socket.emit("editMessage", {
      chatId: selectedChat.chatId,
      id: id,
      messageText: input.value,
    });
    editing = false;
    messageId = null;
  };

  onMount(() => {
    container.scrollTop = container.scrollHeight;

    const observer = new MutationObserver(() => {
      container.scrollTop = container.scrollHeight;
    });

    observer.observe(container, { childList: true, subtree: true });
  });

  $: socket.emit("findMessages", { chatId: selectedChat.chatId }),
    (messages = []);

  $: socket.on("updateMessages", (data) => {
    messages = [];
    messages = [...messages, ...data];
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="messages" bind:this={container}>
  {#if selectedChat}
    {#each messages as message}
      <div
        class="message {message.userTo !== $user.usertag
          ? 'flex-end'
          : 'flex-start'}"
      >
        {#if message.userFrom === $user.usertag && editing && messageId === message.id}
          <div
            class="editing {message.userTo !== $user.usertag ? 'my' : 'other'}"
          >
            <input
              value={message.messageText}
              bind:this={input}
              class="input"
            />
            <button class="done" on:click={() => editMessage(message.id)}
              >Done</button
            >
          </div>
        {:else}
          <div
            class="text {message.userTo !== $user.usertag ? 'my' : 'other'}"
            on:mouseenter={() =>
              message.userFrom !== $user.usertag
                ? (messageId = null)
                : (messageId = message.id)}
            on:mouseleave={() => (messageId = null)}
          >
            {#if message.edited}
            <div class="status">
              edited
            </div> 
            {/if}
            {message.messageText}
            <div class="underText">
              <div class="date">
                {format(addHours(new Date(message.createdDate), 2), "HH:mm")}
              </div>

              <div
                class="edit"
                class:visible={messageId === message.id}
                on:click={() =>
                  messageId === message.id ? (editing = !editing) : null}
              >
                edit
              </div>
            </div>
          </div>
        {/if}
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
    border-right: 5px solid black;
    position: relative;
    padding-left: 10px;
    overflow-y: scroll;
    padding-right: 10px;
    padding-bottom: 10px;
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
        min-width: 120px;
        border-radius: 5px;
        height: fit-content;
        .status{
          font-size: 13px;
          color: rgb(190, 190, 190);
        }
        &.my {
          background-color: rgb(87, 87, 87);
          text-align: right;
        }
        &.other {
          background-color: rgb(32, 32, 32);
          text-align: left;
        }

        .underText {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: rgb(190, 190, 190);

          .edit {
            opacity: 0;
            transition: 0.3s ease;

            &.visible {
              opacity: 1;
            }
          }
        }
      }

      .editing {
        width: fit-content;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        &.my {
          background-color: rgb(87, 87, 87);
        }
        &.other {
          background-color: rgb(32, 32, 32);
        }
        .input,
        .done {
          font-size: 20px;
          font-size: 20px;
          padding: 5px;
          font-weight: 500;
        }

        .input {
          border-radius: 4px 0 0 4px;
        }
        .done {
          border-radius: 0 4px 4px 0;
          background-color: white;
          border-left: 1px solid black;
        }
      }
    }
  }
</style>
