<script>
	import {onMount, onDestroy} from 'svelte';
	import Card from './shared/Card.svelte';
	import {fade, slide, scale} from 'svelte/transition';
	import {flip} from 'svelte/animate';
	import PollDetails from './PollDetails.svelte'

	export let polls = [];

	onMount(async () => {
		try {
			console.log("mounted")
			const response = await fetch('http://localhost:80/polls');
			const data = await response.json();	
			polls = data;			
		} catch (error) {
			console.log(error);
		}
	});

</script>

<div class="poll-list">
	{#each polls as poll(poll.id)}
		<div 
			in:slide out:slide|local 
			animate:flip={{duration: 400}}> 
				<Card>			
					<PollDetails {poll} />					
			</Card>
		</div>
		{:else}
			<p>Loading...</p>
	{/each}
</div>

<style>
	.poll-list{
		display: grid;	
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
</style>