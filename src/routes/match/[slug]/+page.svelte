<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';

    export let data: PageData;
</script>

<ul>
    {#each data.messages as msg}
        <li>
            From: {msg.senderId} <br />
            To: {msg.receiverId} <br />
            Message: {msg.message}
        </li>
    {/each}
</ul>

<form method="post" use:enhance>
    <label for="message">Message</label>
	<input name="message" id="message" required /><br />
    <input name="receiverId" id="receiverId" value={data.receiverId} type="hidden" />
    <input name="senderId" id="senderId" value={data.senderId} type="hidden" />
    <button>Continue</button>
</form>
