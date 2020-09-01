 <script>
	export let type = 'primary';
	export let inverse = false;
 </script>

<button class={type} class:inverse={inverse} on:click >
	<slot></slot>
</button>


 <style>
	button{
		border: 0;
		cursor: pointer;
		border-radius: 5px;
		font-weight: bold;
		padding: 6px 12px;
		text-transform: uppercase;		
	}
	.primary {
		background-color: #FF4343;
		color: #FFF;
	}
	.primary.inverse {
		background-color: #FFF;
		color: #FF4343;
		padding: 5px 11px;
		border: 1px solid #FF4343;
	}
 </style>