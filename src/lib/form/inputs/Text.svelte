<script lang="ts">
	import { type FormField } from '$lib/form/form.config.js';
	import Icon from '@iconify/svelte';
	export let field: FormField;
	export let key: string;
	export let error: string | undefined = undefined;
	let variant = field.variant || 'text';
	let passwordReveal = false;

	const togglePassword = () => {
		const input = document.getElementById(key) as HTMLInputElement;
		if (input.type === 'password') {
			input.type = 'text';
			passwordReveal = true;
		} else {
			input.type = 'password';
			passwordReveal = false;
		}
	};
</script>

<div class="flex flex-col">
	{#if field.before}
		{@html field.before}
	{/if}
	<label
		for={key}
		class="text-sm font-semibold text-ninjaFormKit-text dark:text-ninjaFormKit-textDark mb-1"
		>{field.label}
		{#if field.validate !== undefined}<span class="text-red-500">*</span>{/if}</label
	>
	<div class="relative">
		{#if field.icon}
			<Icon
				icon={field.icon}
				class="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400"
			/>
		{/if}
		<input
			type={variant}
			id={key}
			name={key}
			class={`border ${error ? 'border-ninjaFormKit-error  dark:border-ninjaFormKit-errorDark' : 'border-ninjaFormKit-border'} rounded-md p-2 bg-ninjaFormKit-inputBg dark:bg-ninjaFormKit-inputBgDark text-ninjaFormKit-text dark:text-ninjaFormKit-textDark outline-ninjaFormKit-default w-full${field.icon ? ' pl-8' : ''} ${variant === 'password' ? 'pr-8' : ''} ${field.disabled ? 'cursor-not-allowed' : 'cursor-text'}`}
			placeholder={field.placeholder}
			value={field.defaultValue ?? ''}
			aria-invalid={error ? 'true' : 'false'}
			disabled={field.disabled}
		/>
		{#if field.variant === 'password'}
			<button
				on:click={togglePassword}
				type="button"
				class="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-400 cursor-pointer"
			>
				<Icon icon={passwordReveal ? 'mdi:eye-off' : 'mdi:eye'} />
			</button>
		{/if}
	</div>
	{#if error}
		<p id={`${key}-error`} class="text-ninjaFormKit-error dark:text-ninjaFormKit-errorDark text-sm">
			{error}
		</p>
	{/if}
	{#if field.after}
		{@html field.after}
	{/if}
</div>
