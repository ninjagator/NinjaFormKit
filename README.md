# Ninja Form Kit

Ninja Form Kit is a TypeScript first SvelteKit-based form library designed to simplify form creation and validation in your SvelteKit applications.

## Table of Contents

- [Ninja Form Kit](#ninja-form-kit)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Validate the form with actions](#validate-the-form-with-actions)
    - [Form Config Options](#form-config-options)
    - [FormField Options](#formfield-options)
  - [Validation](#validation)
    - [Validation Options](#validation-options)
  - [Styling](#styling)
  - [More examples](#more-examples)
    - [Register Form](#register-form)
    - [Login Form](#login-form)

## Installation

To install Ninja Form Kit, use npm or yarn:

```sh
npm install ninjaformkit
# or
yarn add ninjaformkit

```

## Usage

In your `+page.server.ts`, define a `formConfig` object to configure your form. You can specify options such as the form method, action, fields, and validation rules. To ensure type safety, ensure that your `formConfig` conforms to `FormConfig`. Note: `formConfig` should be defined outside the load function to ensure that the actions have access.

```ts

const formConfig = {
	method: 'post',
	fields: {
		email: {
			type: 'text',
			variant: 'email',
			placeholder: 'Enter your email...',
			label: 'Email',
			validate: {
				required: true,
				isEmail: true
			}
		},
		message: {
			type: 'textarea',
			placeholder: 'Enter your message...',
			label: 'Message',
			validate: {
				required: true,
				minLength: 10,
				maxLength: 500
			}
		},
		submit: {
			type: 'submit',
			label: 'Submit'
		}
	}
} satisfies FormConfig;

export const load: PageServerLoad = async () => {
	return { formConfig };
};

```

### Validate the form with actions

```ts

export const actions = {
	default: async ({ request }) => {
		const { errors, hasErrors, values } = await validate(request, formConfig);

		if (hasErrors) {
			return fail(400, { errors });
		}

	// Process the type safe form values 
        await sendEmail({
            email: values.email, // string
            message: values.message // string
        });
        
        return redirect(301, '/');
 
	}
} satisfies Actions;

```

### Form Config Options

The `formConfig` object allows you to configure various aspects of your form. Below is a table explaining each option:

| Option      | Type                                                                 | Description                                                                                   |
|-------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `action`    | `string`                                                             | The URL to which the form data will be submitted. Optional.                                   |
| `encType`   | `'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain'` | The encoding type for the form. Optional.                                                     |
| `method`    | `'get' \| 'post'`                                                    | The HTTP method to use when submitting the form. Required.                                    |
| `fields`    | `Record<string, FormField>`                                          | An object where each key is a field name and the value is a `FormField` object. Required.     |
| `runLoader` | `boolean` | Denotes weather to run sveltekits `invalidateAll` hook. Optional

### FormField Options

Each field in the `fields` object is a `FormField` with the following options:

| Option          | Type                                                                 | Description                                                                                   |
|-----------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `type`          | `'text' \| 'textarea' \| 'submit' \| 'checkbox' \| 'radio' \| 'toggle' \| 'hidden' \| 'select' \| 'file' \| 'html' \| 'datetime'` | The type of the form field. Required.                                                         |
| `label`         | `string`                                                             | The label for the form field. Required.                                                       |
| `defaultValue`  | `string \| number \| null`                                           | The default value for the form field. Optional.                                               |
| `defaultChecked`| `boolean`                                                            | The default checked state for checkbox, radio, or toggle fields. Optional.                    |
| `width`         | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12`         | The width of the form field, used for fieldset grid layout. Optional. Defaults to 12.                       |
| `variant`       | `'password' \| 'email' \| 'text' \| 'color' \| 'number'`             | The variant of the form field, specifying a more specific type. Works with the "text" input type. Defaults to "text". Optional.                     |
| `placeholder`   | `string`                                                             | The placeholder text for the form field. Optional.                                            |
| `multiple`      | `boolean`                                                            | Whether the field allows multiple values (e.g., for file and select inputs). Optional.                   |
| `break`         | `boolean`                                                            | Weather to break into a new row in grid. Optional.                                     |
| `icon`          | `string`                                                             | An icon to display with the form field. This relies on @iconify library (e.g. `material-symbols:verified-user`) Optional.                                             |
| `options`       | `{ value: string \| number; label: string; }[]`                      | An array of options for select and radio fields. Each option has a `value` and a `label`. Optional. Note Select and Radio inputs will throw an error if these values are not set.    |
| `disabled`      | `boolean`                                                            | Whether the form field is disabled. Optional.                                                 |
| `before`        | `string`                                                             | Content to display before the form field. Optional.                                           |
| `after`         | `string`                                                             | Content to display after the form field. Optional.                                            |
| `validate`      | `object`                                                             | Validation rules for the form field. Optional.          

## Validation                                      

Ninja Form Kit currently has 19 validate options.

### Validation Options

The `validate` object allows you to specify validation rules for the form field. Below is a table explaining each option:

| Option            | Type          | Description                                                                                   |
|-------------------|---------------|-----------------------------------------------------------------------------------------------|
| `required`        | `boolean`     | Whether the field is required.                                                                |
| `minLength`       | `number`      | The minimum length of the field value.                                                        |
| `maxLength`       | `number`      | The maximum length of the field value.                                                        |
| `min`             | `number`      | The minimum value for numeric fields.                                                         |
| `max`             | `number`      | The maximum value for numeric fields.                                                         |
| `isEmail`         | `boolean`     | Whether the field value should be a valid email address.                                      |
| `isUrl`           | `boolean`     | Whether the field value should be a valid URL.                                                |
| `isNumber`        | `boolean`     | Whether the field value should be a valid number.                                             |
| `isFloat`         | `boolean`     | Whether the field value should be a valid float.                                              |
| `isAlpha`         | `boolean`     | Whether the field value should contain only alphabetic characters.                            |
| `isAlphanumeric`  | `boolean`     | Whether the field value should contain only alphanumeric characters.                          |
| `isDate`          | `boolean`     | Whether the field value should be a valid date.                                               |
| `isTime`          | `boolean`     | Whether the field value should be a valid time.                                               |
| `isDateTime`      | `boolean`     | Whether the field value should be a valid date-time.                                          |
| `mimeTypes`       | `Array<string>`| An array of acceptable MIME types for file inputs.                                            |
| `maxSize`         | `number`      | The maximum file size for file inputs, in bytes.                                              |
| `matches`         | `string`      | A regex pattern that the field value should match.                                            |
| `badPasswordCheck`| `boolean`     | Whether to check the field value against a list of common bad passwords. Utilises pwned passwords API.                   |

## Styling

Ninja Form Kit is built with tailwind and is very customisible. Breakpoints are determined with @tailwindcss/container-queries plugin. Add the following options to your tailwind.config.js

```js

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ninjaFormKit: {
					default: '#0073aa',
					defaultDark: '#005f8b',
					hover: '#005f8b',
					hoverDark: '#004c6e',
					inputBg: '#f3f4f6',
					inputBgDark: '#1a202c',
					text: '#000000',
					textDark: '#ffffff',
					placeholder: '#a0aec0',
					placeholderDark: '#a0aec0',
					border: '#e2e8f0',
					borderDark: '#2d3748',
					error: '#e53e3e',
					errorDark: '#e53e3e',
					outline: '#0073aa',
					outlineDark: '#005f8b',
					buttonText: '#ffffff',
					buttonTextDark: '#ffffff'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/container-queries')]
};

```

## More examples

### Register Form

```ts 
const formConfig = {
	method: 'post',
	fields: {
		username: {
			type: 'text',
			label: 'Username',
			placeholder: 'Enter your username...',
			width: 5,
			validate: {
				required: true,
				minLength: 3,
				maxLength: 20
			}
		},
		email: {
			type: 'text',
			variant: 'email',
			label: 'Email',
			placeholder: 'Enter your email...',
			width: 7,
			validate: {
				required: true,
				isEmail: true
			}
		},
		referer: {
			type: 'select',
			label: 'Referer',
			placeholder: 'Select an option...',
			width: 4,
			options: [
				{ label: 'Google', value: 'google' },
				{ label: 'Friend', value: 'friend' },
				{ label: 'Other', value: 'other' }
			],
			break: true,
			validate: {
				required: true
			}
		},
		accountType: {
			type: 'radio',
			label: 'Account Type',
			width: 8,
			options: [
				{ label: 'Personal', value: 'personal' },
				{ label: 'Business', value: 'business' }
			],
			validate: {
				required: true
			}
		},
		password: {
			type: 'text',
			variant: 'password',
			label: 'Password',
			placeholder: 'Enter your password...',
			width: 6,
			validate: {
				required: true,
				minLength: 8,
				badPasswordCheck: true
			}
		},
		confirmPassword: {
			type: 'text',
			variant: 'password',
			label: 'Confirm Password',
			placeholder: 'Confirm your password...',
			width: 6,
			validate: {
				required: true,
				matches: 'password'
			}
		},
		newsletter: {
			type: 'checkbox',
			label: 'Subscribe to newsletter',
			defaultChecked: true
		},
		submit: {
			type: 'submit',
			label: 'Submit'
		}
	}
} satisfies FormConfig;

```

### Login Form

```ts

const formConfig = {
	method: 'post',
	fields: {
		email: {
			type: 'text',
			variant: 'email',
			placeholder: 'Enter your email...',
			label: 'Email',
			validate: {
				required: true,
				isEmail: true
			},
                        after: `<a href="/reset-password" class="text-sm mt-3 text-right">Forgot Password</a>`
		},
		password: {
			type: 'text',
			variant: 'password',
			placeholder: 'Enter your password...',
			label: 'Password',
			validate: {
				required: true
			}
		},
		rememberMe: {
			type: 'checkbox',
			label: 'Remember me'
		},
		submit: {
			type: 'submit',
			label: 'Submit'
		}
	}
} satisfies FormConfig;

```