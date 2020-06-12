<script>
	import PollStore from '../stores/PollStore.js';
	import {tweened} from 'svelte/motion';
	import Button from './shared/Button.svelte';
	export let poll;
	// reactive values
	$: totalVotes = poll.optionOneVotes + poll.optionTwoVotes;
	$: percentOne = Math.floor((poll.optionOneVotes / totalVotes) * 100) || 0;
	$: percentTwo = Math.floor((poll.optionTwoVotes / totalVotes) * 100) || 0;

	// tweened values
	const tweenedOne = tweened(0);
	const tweenedTwo = tweened(0);
	$: tweenedOne.set(percentOne);
	$: tweenedTwo.set(percentTwo);


	// handle votes
	const handleVote = (option, id) => {
		PollStore.update(prevPolls => {
			let pollsCopy = [...prevPolls]
			let votedPoll = pollsCopy.find(poll =>  poll.id == id);		
			if(option === 'one')
				votedPoll.optionOneVotes++;
			if(option === 'two')
				votedPoll.optionTwoVotes++;
			return pollsCopy;
		});
	};

	const handleDelete = (id) => {
		PollStore.update(prevPolls => {
			return prevPolls.filter(poll => poll.id != id);
		});
	};

</script>

<div class="poll">
	<h3>{poll.topic}</h3>
	<p>Total votes : <b>{totalVotes}</b></p>
	<div class="option" on:click={() => handleVote('one', poll.id)} >
		<span>{poll.optionOne} ( {poll.optionOneVotes} votes ) </span>
		<div class="percent percent-one" style="width: {$tweenedOne}%"></div>
		
	</div>
	<div class="option" on:click={() => handleVote('two', poll.id)}>
		<span>{poll.optionTwo} ( {poll.optionTwoVotes} votes ) </span>
		<div class="percent percent-two" style="width: {$tweenedTwo}%"></div>
		
	</div>

	<div class="delete-poll">
		<Button 
			on:click={() => handleDelete(poll.id)}>
			delete
		</Button>
	</div>

	
</div>

<style>
	h3{
		margin: 0 auto;
		color: #404040;
	}
	p {
		margin-top: 7px;
		font-size: 10pt;
		color: #404040;
	}
	.option{
		background: #EEE;
		border-radius: 5px;
		margin: 10px auto;
		height: 42px;
		cursor: pointer;
		position: relative;
	}
	.option:hover{
		opacity: 0.7;
	}
	span{
		display: inline-block;
		position: absolute;
		color: #404040;
		padding: 10px 20px;
	}
	.percent{
		height: 100%;
		border-radius: 5px;
		box-sizing: border-box;
	}
	.percent-one{
		border-left: 4px solid #18f2b2;
		background: rgba(24, 242, 178, 0.4);
	}
	.percent-two{
		border-left: 4px solid #FF4343;
		background: rgba(255, 67, 67, 0.4);
		
	}
	.delete-poll{
		margin-top: 40px;
		text-align: right;
	}

</style>