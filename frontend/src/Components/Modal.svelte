<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import { clickOutside } from "@Utils/clickOutside";
  import { axiosInstance } from "@Utils/http";
  import type { user } from "@Utils/types";
  import { socket } from "@Utils/http";
  let searchText = "";
  let userList = [];
  let filtredList = userList;
  const openModal = getContext<Writable<boolean>>("openModal");
  const user = getContext<Writable<user>>("user");
  const selectedChat = getContext<Writable<number>>("selectedChat");

  onMount(async () => {
    try {
      const { data } = await axiosInstance.get("/users/all");
      userList = data;
    } catch (error) {
      console.log(error);
    }
  });

  const createChat = async (usertag:string) => {
    try {
      const { data } = await axiosInstance.post("/chats/create", {
        usertag: $user.usertag,
      })

      await axiosInstance.post("/chats/addUser", {
        chatId: data.chatId,
        usertag: usertag
      })


      $openModal = false
      socket.emit('chatCreate')
      $selectedChat = data.chatId
    } catch (e) {
      console.log(e);
    }
  }

  $: if (searchText) {
    filtredList = userList.filter(
      (user) =>
        (user.usertag.toLowerCase().includes(searchText.toLowerCase()) ||
        ("@" + user.username.toLowerCase()).includes(searchText.toLowerCase())) && user.usertag !== $user.usertag
    );
  }
</script>

<div class="modal" in:fly out:fly>
  <div
    class="modal__content"
    use:clickOutside
    on:outclick={() => ($openModal = false)}
    popup
  >
    <div class="decorator" />
    <div class="search">
      <input
        type="text"
        placeholder="Search..."
        class="search__input"
        bind:value={searchText}
      />
    </div>
    <div class="users-list">
      {#if searchText}
        {#each filtredList as user}
          <div class="user">
            <div class="user__right">
              <div class="name">
                {user.username}
              </div>
              <div class="usertag">
                @{user.usertag}
              </div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="user__left">
              <div class="button" on:click={() => createChat(user.usertag)}>
                Create Chat
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    &__content {
      width: 600px;
      height: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      align-items: center;
      border-radius: 10px;
      position: relative;
      background-color: white;

      .decorator {
        position: absolute;
        width: 97%;
        height: 97%;
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 7px;
        padding: 15px;
      }

      .search {
        width: 90%;
        height: 30px;
        padding-top: 5px;
        padding-left: 10px;
        border: 1px solid black;
        border-radius: 5px;
        z-index: 10;
        &__input {
          font-size: 20px;
          width: 100%;
        }
      }

      .users-list {
        width: 90%;
        height: 85%;

        .user {
          color: black;
          font-size: 22px;
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 1px solid black;

          &__right {
            font-weight: 600;
            .name {
              text-transform: capitalize;
            }
          }

          &__left {
            position: relative;
            .button {
                width: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 18px;
                border-radius: 7px;
                background-color: #232323;
                height: 50px;
                z-index: 10;
            }
          }
        }
      }
    }
  }
</style>
