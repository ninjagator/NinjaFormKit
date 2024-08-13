import { expect, test } from '@playwright/test';

test('Form is rendered', async ({ page }) => {
	await page.goto('/contact');
	// Expect a form with an email field
	const form = await page.$('form');
	expect(form).not.toBeNull();
});

test('Form has expected fields', async ({ page }) => {
	await page.goto('/contact');
	// Expect a form with an email field
	const email = await page.$('input[name=email]');
	expect(email).not.toBeNull();
	// Expect a form with a message field
	const message = await page.$('textarea[name=message]');
	expect(message).not.toBeNull();

	// Expect a form with a submit button
	const submit = await page.$('button[type=submit]');
	expect(submit).not.toBeNull();
});

test('Form validation', async ({ page }) => {
	await page.goto('/contact');
	// Fill in email field
	await page.fill('#email', 'foo');
	// Submit the form
	await page.click('button[type=submit]');

	const emailInput = await page.locator('#email');
	const messageInput = await page.locator('#message');

	// Expect an error state
	const emailAriaInvalid = await emailInput.getAttribute('aria-invalid');

	expect(emailAriaInvalid).toBe('true');

	// Expect an error state
	const messageAriaInvalid = await messageInput.getAttribute('aria-invalid');
	expect(messageAriaInvalid).toBe('true');

	const emailError = await page.locator('#email-error');
	expect(await emailError.textContent()).toContain('Email is not a valid email');

	const messageError = await page.locator('#message-error');
	expect(await messageError.textContent()).toContain('Message is required');
});
