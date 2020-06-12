<script>
	import PollStore from '../stores/PollStore.js';
	import {createEventDispatcher} from 'svelte';
	import Button from './shared/Button.svelte';
	const dispatch = createEventDispatcher();
	let fields = {topic: '', optionOne: '', optionTwo: ''};
	let errors = {topic: '', optionOne: '', optionTwo: ''};
	let valid = false; 

	const submitHandler = () => {
		valid = true;
		// topic validation
		if(fields.topic.trim().length < 6) {
			valid = false;
			errors.topic = "bruh... This doesn't make any sense!";
		} else {
			errors.topic = '';
		}
		// optionOne validation
		if(fields.optionOne.trim().length < 1) {
			valid = false;
			errors.optionOne = "bruh...";
		} else {
			errors.optionOne = '';
		}
		// optionTwo validation
		if(fields.optionTwo.trim().length < 1) {
			valid = false;
			errors.optionTwo = "bruh...";
		} else {
			errors.optionTwo = '';
		}

		// add if valid
		if(valid){
			let poll = {
				...fields,
				optionOneVotes: 0,
				optionTwoVotes: 0,
				id: (new Date()).toString()
			}
			// save to store
			// PollStore.update(prevPolls => {
			// 	return [...prevPolls, poll];
			// })
			addPoll(poll).then(data => {
				dispatch('add');
			});
			
		}

		async function addPoll(poll){
			try {
				const reqOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(poll),
				};
				const response = await fetch("http://localhost:80/polls", reqOptions);				
				return await response.json();
			} catch (err) {
				console.log(err);
			}
		}


	};

</script>

<form on:submit|preventDefault={submitHandler}>
	<div class="form-field">
		<label for="topic">Topic</label>
		<input type="text" id="topic"
			bind:value={fields.topic}>
		<div class="error">
			{errors.topic}
		</div>
	</div>
	<div class="form-field">
		<label for="option-one">Option One</label>
		<input type="text" id="option-one"
			bind:value={fields.optionOne}>
		<div class="error">
			{errors.optionOne}
		</div>
	</div>
	<div class="form-field">
		<label for="option-two">Option Two</label>
		<input type="text" id="option-two"
			bind:value={fields.optionTwo}>
		<div class="error">
			{errors.optionTwo}
		</div>
	</div>
	<Button>create</Button>
</form>

<style>
	form{
		width: 400px;
		margin: 0 auto;
		text-align: center;
	}
	.form-field{
		margin: 20px auto;
	}
	input{
		width: 100%;
		border-radius: 5px;
	}
	label{
		margin: 10px auto;
		text-align: start;
	}
	.error {
		color: #FF4343;
	}
</style>