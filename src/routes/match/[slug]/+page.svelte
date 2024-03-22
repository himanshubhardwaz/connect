<script lang="ts">
	import type { PageData } from "./$types";
    import { enhance } from '$app/forms';

    export let data: PageData;
</script>

{#if data.chat?.expired}
    <p class="text-red-500 text-lg">Chat Expired</p>
    {:else}
    <ul>
        {#each data.messages as msg}
            <li>
                From: {msg.senderId} <br />
                To: {msg.receiverId} <br />
                Message: {msg.message}
            </li>
        {/each}
    </ul>
{/if}

<form method="post" action="?/send-message" use:enhance>
    <label for="message">Message</label>
	<input name="message" id="message" required /><br />
    <input name="receiverId" id="receiverId" value={data.receiverId} type="hidden" />
    <input name="senderId" id="senderId" value={data.senderId} type="hidden" />
    <button disabled={data.chat?.expired}>Continue</button>
</form>


<form method="post" action="?/leave-chat" use:enhance>
    <button disabled={data.chat?.expired}>Leave</button>
</form>