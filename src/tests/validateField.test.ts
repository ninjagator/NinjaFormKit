import { describe, it, expect } from 'vitest';
import { validateField } from '$lib/validate.server.js';
import type { FormConfig } from '$lib/form/form.config.js';

describe('field validation', async () => {
	const formConfig = {
		method: 'post',

		fields: {
			email: {
				type: 'text',
				label: 'Email',
				placeholder: 'Enter your email...',
				icon: 'ic:baseline-email',
				validate: {
					required: true,
					isEmail: true
				}
			},
			password: {
				type: 'text',
				label: 'Password',
				variant: 'password',
				placeholder: 'Enter your password...',
				icon: 'ic:baseline-lock',
				validate: {
					required: true,
					badPasswordCheck: true,
					minLength: 8,
					maxLength: 20
				}
			},
			age: {
				type: 'text',
				variant: 'number',
				label: 'Age',
				placeholder: 'Enter your age...',
				icon: 'ic:baseline-lock',
				validate: {
					required: true,
					min: 18,
					max: 100
				}
			},
			confirmPassword: {
				type: 'text',
				label: 'Confirm Password',
				variant: 'password',
				placeholder: 'Confirm your password...',
				icon: 'ic:baseline-lock',
				validate: {
					required: true,
					matches: 'password'
				}
			}
		}
	} satisfies FormConfig;

	const values = {
		email: '',
		password: 'pass',
		confirmPassword: 'pass2'
	};

	it('Email is required', async () => {
		const result = await validateField(formConfig.fields.email, '', values, formConfig);
		expect(result).toBe('Email is required');
	});

	it('Email is valid', async () => {
		const result = await validateField(
			formConfig.fields.email,
			'test@test.com',
			values,
			formConfig
		);
		expect(result).toBe(undefined);
	});

	it('Email format is invalid', async () => {
		const result = await validateField(formConfig.fields.email, 'invalidemail', values, formConfig);
		expect(result).toBe('Email is not a valid email');
	});

	it('Passwords do not match', async () => {
		const result = await validateField(
			formConfig.fields.confirmPassword,
			'pass2',
			values,
			formConfig
		);
		expect(result).toBe('Confirm Password does not match Password');
	});

	it('Password is too short', async () => {
		const result = await validateField(formConfig.fields.password, 'pass', values, formConfig);
		expect(result).toBe('Password is too short. Minimum length is 8 characters');
	});

	it('Password is too long', async () => {
		const result = await validateField(
			formConfig.fields.password,
			'passwordpasswordpassword',
			values,
			formConfig
		);

		expect(result).toBe('Password is too long. Max length is 20 characters');
	});

	it('Password is insecure', async () => {
		const result = await validateField(formConfig.fields.password, 'password', values, formConfig);
		expect(result).toBe('Password looks insecure, please create a stronger password');
	});

	it('Age is required', async () => {
		const result = await validateField(formConfig.fields.age, '', values, formConfig);
		expect(result).toBe('Age is required');
	});

	it('Age is too low', async () => {
		const result = await validateField(formConfig.fields.age, '17', values, formConfig);
		expect(result).toBe('Age must be greater than 18');
	});

	it('Age is too high', async () => {
		const result = await validateField(formConfig.fields.age, '101', values, formConfig);
		expect(result).toBe('Age must be less than 100');
	});
});
