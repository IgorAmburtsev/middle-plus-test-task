<script lang="ts">
	import { fade } from "svelte/transition";
	import loupe from "@Assets/loupe.svg";
	import checkmark from "@Assets/checkmark.svg?raw";
	import send from "@Assets/send.svg?raw";
</script>

<div class="wrapper" in:fade>
	<div class="chat">
		<div class="chat__decorator">
			<div class="left">
				<div class="top-bar">
					<div class="logo">Gigachat|D|</div>
					<div class="search">
						<img src={loupe} alt="loupe" />
					</div>
				</div>
				<div class="users">
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
					<div class="user">
						<div class="user__name">User</div>
						<div class="user__text">Ahuennoe ochen' pryam pizdec rabotaet eeeeeee</div>
						<div class="user__readed">
							{@html checkmark}
						</div>
					</div>
				</div>
				<div class="bottom-bar"></div>
			</div>
			<div class="right">
				<div class="top-bar" />
				<div class="messages">
					<div class="message flex-start">
						<div class="text other flex-start">12321312</div>
					</div>
					<div class="message flex-end">
						<div class="text my">321312312312312312312</div>
					</div>
				</div>
				<div class="bottom">
					<textarea class="textarea" />
					<div class="send">
						{@html send}
					</div>
				</div>
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
					.top-bar {
						height: 60px;
						width: 100%;
						background-color: black;
						border-radius: 11px 0 0 0;
						box-sizing: border-box;
						padding: 0 15px 0 15px;
						border-bottom: 1px solid black;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.logo {
							font-size: 30px;
							text-transform: uppercase;
							font-weight: 700;
						}

						.search {
							width: 30px;
							height: 30px;
						}
					}

					.users {
						height: 100%;

						display: flex;
						flex-direction: column;
						overflow-y: scroll;
						box-sizing: border-box;
						border-left: 10px solid black;
						border-right: 5px solid black;
						border-bottom: 10px solid black;
						border-radius: 0px 0px 0px 11px;

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

							&:last-child {
								border: none;
							}
						}
					}
				}

				.right {
					flex: 3;
					display: flex;
					width: 100%;
					flex-direction: column;
					.top-bar {
						height: 65px;
						width: 100%;
						background-color: black;
						border-radius: 0 11px 0 0;
						box-sizing: border-box;
						padding: 0 15px 0 0px;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.messages {
						width: 100%;
						height: 90%;
						box-sizing: border-box;
						border-right: 10px solid black;
						position: relative;
						padding-left: 10px;
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
								border-radius: 5px;
								height: fit-content;
								&.my {
									background-color: rgb(87, 87, 87);
								}
								&.other {
									background-color: rgb(32, 32, 32);
								}
							}
						}
					}
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
						}
					}
				}
			}
		}
	}
</style>
