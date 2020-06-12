<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let activeItem;
  export let items;
</script>

<nav class="tabs">
  <ul>
    {#each items as item}
      <li
        class:active={item === activeItem}
        on:click={() => dispatch('changeTab', item)}>
        <div>{item}</div>
      </li>
    {/each}
  </ul>
</nav>


<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    list-style-type: none;
    display: flex;
    padding: 0;
    justify-content: center;
  }
  li {
		font-size: 14pt;
		color: #404040;
		font-weight: 600;
    margin: 0 20px;
    padding: 10px;
    cursor: pointer;
  }

  .active {
    color: #ff4343;
    border-bottom: 1px solid #ff4343;
  }
</style>


