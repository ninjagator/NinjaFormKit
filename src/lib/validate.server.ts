import crypto from 'crypto';
import type { FormConfig } from '$lib/form/form.config.js';
import { bytesToHumanReadable } from '$lib/utils.server.js';

/**
 * Bad password function
 * @param plainTextPassword
 * @returns string | undefined
 */
async function badPasswordCheck(plainTextPassword: string) {
	const hash = crypto.createHash('sha1').update(plainTextPassword).digest('hex');

	const prefix = hash.substring(0, 5);
	const suffix = hash.substring(5, hash.length);

	try {
		const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

		if (res.status === 200) {
			const body = await res.text();

			const resultArr = body.split('\r\n').map((i: string) => {
				const parts = i.split(':');
				return parts[0];
			});

			if (resultArr.some((item: string) => item.toLocaleLowerCase() === suffix)) {
				return ' looks insecure, please create a stronger password';
			}

			return undefined;
		}
	} catch (error) {
		console.error('Error checking password:', error);
		return undefined;
	}
}

/**
 * Validate function
 * @param request Request
 * @param config FormConfig
 * @returns Promise<{ values: FieldValues<T>; errors: Record<string, string | undefined>; hasErrors: boolean; }>
 */
export async function validate<T extends FormConfig>(request: Request, config: T) {
	const data = await request.formData();

	const errors: Record<string, string | undefined> = {};

	type FieldValues<T extends FormConfig> = {
		[K in keyof T['fields']]: T['fields'][K]['type'] extends 'file'
			? File
			: T['fields'][K]['type'] extends 'checkbox' | 'toggle'
				? boolean
				: string;
	};

	const values: FieldValues<T> = {} as FieldValues<T>;

	for (const [key, field] of Object.entries(config.fields)) {
		let tempValue: string | boolean | File;
		switch (field.type) {
			case 'file': {
				tempValue = data.get(key)?.valueOf() as File;
				break;
			}
			case 'checkbox': {
				tempValue = data.get(key) === 'on' ? true : false;
				break;
			}
			case 'toggle': {
				tempValue = data.get(key) === 'on' ? true : false;
				break;
			}
			default: {
				tempValue = data.get(key) as string;
				break;
			}
		}

		values[key as keyof FieldValues<T>] = tempValue as FieldValues<T>[keyof FieldValues<T>];

		errors[key] = await validateField(field, tempValue, values, config);
	}

	const hasErrors = Object.values(errors).some((error) => error !== undefined);

	return { values, errors, hasErrors };
}

/**
 * Validate field function
 * @param field FormField
 * @param value string | boolean | File
 * @param values Record<string, string | boolean | File>
 * @param config FormConfig
 * @returns Promise<string | undefined>
 */
export async function validateField<T extends FormConfig['fields'][string]>(
	field: T,
	value: string | boolean | File,
	values: Record<string, string | boolean | File> = {},
	config: FormConfig
) {
	if (field.validate) {
		// Check for falsey values
		if (field.validate.required) {
			if (value === undefined || value === null) {
				return `${field.label} is required`;
			}

			if (typeof value === 'string' && value.trim() === '') {
				return `${field.label} is required`;
			}

			if (typeof value === 'boolean' && !value) {
				return `${field.label} is required`;
			}

			if (value instanceof File && value.size === 0) {
				return `${field.label} is required`;
			}
		}

		// Check string length
		if (field.validate.maxLength) {
			if (typeof value === 'string' && value.length > field.validate.maxLength) {
				return `${field.label} is too long. Max length is ${field.validate.maxLength} characters`;
			}
		}

		// Check string length
		if (field.validate.minLength) {
			if (typeof value === 'string' && value.length < field.validate.minLength) {
				return `${field.label} is too short. Minimum length is ${field.validate.minLength} characters`;
			}
		}

		if (field.validate.isEmail) {
			if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				return `${field.label} is not a valid email`;
			}
		}

		// Check if valid number string and greater than min
		if (field.validate.min) {
			if (typeof value === 'string' && parseInt(value) < field.validate.min) {
				return `${field.label} must be greater than ${field.validate.min}`;
			}
		}

		// Check if valid number string and less than max
		if (field.validate.max) {
			if (typeof value === 'string' && parseInt(value) >= field.validate.max) {
				return `${field.label} must be less than ${field.validate.max}`;
			}
		}

		// Check for bad password
		if (
			field.variant === 'password' &&
			typeof value === 'string' &&
			field.validate.badPasswordCheck
		) {
			const error = await badPasswordCheck(value);
			if (error) {
				return `${field.label}${error}`;
			}
		}

		// Check file size
		if (field.type === 'file' && value instanceof File) {
			if (field.validate.maxSize) {
				if (value.size > field.validate.maxSize) {
					return `${field.label} is too large. Max size is ${bytesToHumanReadable(field.validate.maxSize)}`;
				}
			}

			if (field.validate.mimeTypes) {
				if (!field.validate.mimeTypes.includes(value.type as string)) {
					return `${field.label} is not a valid file type`;
				}
			}
		}

		// Check if value is a number
		if (field.validate.isNumber) {
			if (isNaN(Number(value))) {
				return `${field.label} must be a number`;
			}
		}

		// Check matches another fields value
		if (field.validate.matches) {
			if (value !== values[field.validate.matches]) {
				return `${field.label} does not match ${config.fields[field.validate.matches].label}`;
			}
		}

		// Check only letters
		if (field.validate.isAlpha) {
			if (typeof value === 'string' && /^[A-Za-z]+$/.test(value.trim())) {
				return `${field.label} must contain only alphabetic characters`;
			}
		}

		// Check if string only string or number
		if (field.validate.isAlphanumeric) {
			if (typeof value === 'string' && !/^[A-Za-z0-9]+$/.test(value)) {
				return `${field.label} must contain only letters and numbers`;
			}
		}

		// Check if string is a floadt
		if (field.validate.isFloat) {
			if (typeof value === 'string' && !/^[+-]?\d+(\.\d+)?$/.test(value)) {
				return `${field.label} must be a valid float`;
			}
		}

		// Check if valid date string
		if (field.validate.isDate && typeof value === 'string') {
			if (isNaN(Date.parse(value))) {
				return `${field.label} must be a valid date`;
			}
		}

		// Check if valid time string
		if (field.validate.isTime) {
			if (typeof value === 'string' && !/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
				return `${field.label} must be a valid time`;
			}
		}

		return undefined;
	}
}
