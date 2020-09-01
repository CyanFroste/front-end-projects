import {writable} from 'svelte/store';

const getPolls = async () => {
	try {
		const response = await fetch(`http://localhost:80/polls`);
		const data = await response.json();

		console.log(data);
			
		return data;
		
	} catch (error) {
		console.log(error);
	}
};



const PollStore = writable(getPolls())

export default PollStore;