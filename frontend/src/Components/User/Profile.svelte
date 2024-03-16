<script lang="ts">
  import logout from "@Assets/logout.svg?raw";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import type { user } from "@Utils/types";
  import { axiosInstance } from "@Utils/http";

  const user = getContext<Writable<user>>("user");

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      Object.keys($user).forEach((key) => {
        $user[key] = "";
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bottom-bar">
  <div class="profile">
    <div class="name">
      {$user.username}
    </div>
    <div class="tag">
      @{$user.usertag}
    </div>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="logout" on:click={handleLogout}>
    {@html logout}
  </div>
</div>

<style lang="scss">
  .bottom-bar {
    height: 60px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0px 0px 0px 11px;

    .profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px 0 10px;

      .name {
        font-size: 20px;
        font-weight: 600;
        text-transform: capitalize;
      }
      .tag {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .logout {
    box-sizing: border-box;
    padding-right: 10px;
  }
</style>
