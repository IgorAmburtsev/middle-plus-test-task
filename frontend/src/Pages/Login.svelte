<script lang="ts">
	import LoginForm from "@Components/LoginForm.svelte";
	import { getContext } from "svelte";
	import RegisterForm from "@Components/RegisterForm.svelte";
	import type { Writable } from "svelte/store";
    import { axiosInstance } from "@Utils/http";
	import { fly } from 'svelte/transition';

	const loginState = getContext<Writable<string>>("loginState");
</script>

<div class="wrapper d-flex">
	<div class="form d-flex">
		<div class="form__decorator" />
		<div class="form__title">GigaChat|D|</div>
		{#if $loginState === "register"}
            <RegisterForm />
        {:else if $loginState === "login"}
			<LoginForm />
		{:else if !$loginState}
			<button class="form__button" on:click={() => $loginState = "login"}>Log in</button>
			<button class="form__button" on:click={() => $loginState = "register"}>Register</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		height: 100%;
		justify-content: center;
		align-items: center;
		.form {
			background-color: white;
			width: 390px;
			border-radius: 20px;
			height: 520px;
			position: relative;
			gap: 15px;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: rgb(0, 0, 0);

			&__decorator {
				position: absolute;
				width: 95%;
				height: 97%;
				border: 2px solid black;
				box-sizing: border-box;
				border-radius: 15px;
				padding: 15px;
			}

			&__title {
				font-size: 30px;
				font-weight: 700;
				letter-spacing: 2px;
				text-transform: uppercase;
			}

			&__button {
				height: 40px;
				color: white;
				width: 70%;
				background-color: #232323;
				border-radius: 5px;
				box-sizing: border-box;
				transition: 0.3s ease;
				font-size: 16px;
				z-index: 10;


				&:hover {
					background-color: black;
				}

				&:focus {
					transform: scale(0.99);
				}
			}
		}
	}
</style>
