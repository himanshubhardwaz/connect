<script lang="ts">
	export let field: string | undefined = '';
	export let error: string | undefined = '';

	let errorElements = new Map<string, HTMLElement>();

	function addError(field: string, errorMessage: string) {
		const errorField = document.getElementById(field) as HTMLElement;
		if (errorField) {
			const errorMsgDiv = document.createElement('div');
			errorMsgDiv.textContent = errorMessage;
			errorMsgDiv.classList.add('text-red-500', 'mt-1', 'form-submission-server-error');
			errorField.parentNode?.appendChild(errorMsgDiv);
			errorElements.set(field, errorMsgDiv);
		}
	}

	function clearErrors() {
		errorElements.forEach((element) => {
			element.remove();
		});
		errorElements.clear();
	}

	$: {
		clearErrors();
		if (error && field) {
			addError(field, error);
		}
	}
</script>
