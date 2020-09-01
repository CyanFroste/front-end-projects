<script>
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import Tabs from './components/shared/Tabs.svelte';
	import CreatePoll from './components/CreatePoll.svelte';
	import PollList from './components/PollList.svelte';
	import {fade, slide, scale} from 'svelte/transition';
	
	// tabs
	let items = ['Active Polls', 'Create New'];
	let activeItem = 'Active Polls'

	const changeTab = e => {
		activeItem = e.detail;
	};

	// polls management
	// (new Date()).toString()

	const handleAddPoll = (e) => {
		activeItem = 'Active Polls';
	};

</script>

<Header />
<main>
	<Tabs {items} {activeItem} on:changeTab={changeTab} />
	{#if activeItem === 'Create New'}
		<div in:fade>
			<CreatePoll on:add={handleAddPoll} />	
		</div>
	{:else if activeItem === 'Active Polls'}
		<PollList />
	{/if}
</main>
<Footer />

<style>
	
	main{
		max-width: 960px;
		margin: 40px auto;
	}
	
</style>