<script lang="ts">
	import { fade } from "svelte/transition";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import type { user } from "@Utils/types";
	import type { userLogin } from "@Utils/types";
	import { axiosInstance } from "@Utils/http";

	const loginState = getContext<Writable<string>>("loginState");
	const user = getContext<Writable<user>>("user");

	const formData:userLogin = {
		username: "",
		password: "",
	}	

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const data = await axiosInstance.post<user>('/auth/login', formData)
		console.log(data)
	}
</script>

<div in:fade class="wrapper">
	<div class="subtitle">Register</div>
	<div class="inputs">
		<div class="input">
			<label for="username" class="label">Username</label>
			<input type="text" id="username" class="input" bind:value={formData.username}/>
		</div>
		<div class="input">
			<label for="password" class="label">Password</label>
			<input type="password" id="password" class="input" bind:value={formData.password}/>
		</div>

		<button on:click={handleSubmit} class="button">Log in</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="button_reg" on:click={() => ($loginState = "register")}>Register</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		padding: 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.subtitle {
		font-size: 22px;
		font-weight: 500;
		text-transform: uppercase;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		gap: 25px;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 25px 15px 25px 15px;

		.input {
			position: relative;
			width: 100%;
			.label {
				background-color: white;
				position: absolute;
				top: -10px;
				left: 10px;
				padding: 0 5px 0 5px;
				z-index: 10;
			}
			.input {
				width: 100%;
				border-radius: 5px;
				height: 35px;
				font-size: 18px;
				box-sizing: border-box;
				padding: 15px 0px 15px 15px;
				border: 1px solid #232323;
			}
		}
	}

	.button {
		height: 40px;
		color: white;
		width: 100%;
		background-color: #232323;
		border-radius: 5px;
		box-sizing: border-box;
		transition: 0.3s ease;
		z-index: 10;
		font-size: 16px;

		&:hover {
			background-color: black;
		}

		&:focus {
			transform: scale(0.99);
		}
	}

	.button_reg {
		width: 100%;
		color: black;
		text-align: center;
		width: fit-content;
		box-sizing: border-box;
		transition: 0.3s ease;
		z-index: 10;
		cursor: pointer;
		text-decoration: underline;
		text-decoration-color: white;
		&:hover {
			text-decoration-color: black;
		}
	}
</style>
