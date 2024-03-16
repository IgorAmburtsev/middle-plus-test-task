<script lang="ts">
  import { fly } from "svelte/transition";
  import ChatWindow from "@Components/Chat/ChatWindow.svelte";
  import ChatArea from "@Components/Chat/ChatArea.svelte";
  import Toolbar from "@Components/User/Toolbar.svelte";
  import UsersList from "@Components/User/UsersList.svelte";
  import Profile from "@Components/User/Profile.svelte";

  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type {chatInstance} from '@Utils/types';

  const selectedChat = getContext<Writable<chatInstance>>("selectedChat");
</script>


<div class="wrapper" in:fly>
  <div class="chat">
    <div class="chat__decorator">
      <div class="left">
        <Toolbar />
        <UsersList />
        <Profile />
      </div>
      <div class="right">
        <div class="top-bar">
          <div class="name">
            {#if $selectedChat.users}
            Chat | {$selectedChat.chatName ? $selectedChat.chatName : $selectedChat?.users[0]?.username}
            {/if}
          </div>
        </div>  
        <ChatWindow selectedChat={$selectedChat}/>
        <ChatArea selectedChat={$selectedChat}/>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .flex-end {
    justify-content: flex-end;
  }

  .flex-start {
    justify-content: flex-start;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .chat {
      border-radius: 20px;
      width: 97%;
      position: relative;
      height: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f2f2f2;

      &__decorator {
        width: 98.5%;
        border-radius: 15px;
        height: 97.2%;
        border: 2px solid black;
        display: flex;
        justify-content: center;

        .left {
          flex: 1;
          border-right: 2px solid black;
          display: flex;
          flex-direction: column;
        }

        .right {
          flex: 3;
          display: flex;
          width: 100%;
          flex-direction: column;
          .top-bar {
            height: 67px;
            width: 100%;
            background-color: black;
            border-radius: 0 11px 0 0;
            box-sizing: border-box;
            padding: 0 15px 0 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .name {
              font-size: 20px;
              text-transform: capitalize;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
</style>
