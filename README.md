* [setup](#setup)
* [npm scripts](#npm-scripts)
    * [build](#build)
    * [dev](#dev)
    * [lint](#lint)
    * [flow](#flow)
* [CSS & module styling](#css-&-module-styling)
* [Authentication](#authentication)
    * [tetraUser](#tetraUser)
    * [tetraAuth](#tetraAuth)
* [FormBuilder](#formbuilder)
* [Data Access](#dataaccess)

## setup
* run `npm install` via terminal in the project's root directory
* add `dev.tetraengine.com` to /etc/hosts, point it to `127.0.0.1`
* create an environment configuration at `config/index.js`; base configurations for prod/stage/dev are included in the repo. 

# npm scripts

## build

`npm run build`

Builds the application for deployment into `output/bundle.js`

## dev

`npm run dev`

Starts a dev server which compiles the app, listens at `http://dev.tetraengine.com` and re-builds on file changes.

## lint

`npm run lint`

Run ESLint against the codebase and reports errors & warnings (with an exit code of 1). Configured via `package.json` and `.eslintignore`.

## flow

`npm run flow`

Executes [flow](https://flow.org/) against all source files and reports type errors. 

### updating external flow type definitions

The `flow-type` library is used to automatically detect and install necessary type definitions for third-party libraries. To update these definitions run

`npm run update-flow-defs`

# CSS & module styling

React applications are of the opinion that the right separation of concern lives at the component level. The JSX (view), data transformation, tests, styles, etc, all live in the component and you only need to think about that component when making changes. CSS make a mess of things by applying rules globally. To solve for this, at build time both the JSX and CSS code is transformed to allow style encapsulation. This process turns the following file input

```javascript
// Foo.js
import 'foo/some/path/Foo.css'; // bring in Foo.css and automatically apply the styles
export default () => (<div><h1>Hello World</h1></div>);
```

```javascript
// Foo.css
div { margin: 1rem; }
h1 { font-size: 18pt; }
```

into

```javascript
// Foo.js
import 'foo/some/path/Foo.css'; // bring in Foo.css and automatically apply the styles
export default () => (<div className="Foo"><h1 className="foo">Hello World</h1></div>);
```

```javascript
// Foo.css
div.foo { margin: 1rem; }
h1.foo { font-size: 18pt; }
```

which prevents these styles from affecting any other component. The encapsulation is based on filename so the `js` and `css` files must match. 

Global style sheets can be created by adding `/* disable-encapsulation */` to the CSS file.

# Authentication
When logged in the User object and auth functions are passed to React components through context. This allows components to access these values only when needed, and not have them explicitly passed down through `props`. After logging in, the JWT and User object are both persisted via LocalStorage.

There are two recompose helper functions which extract the values into props, usable by the view or other recompose functions:
 
 ```javascript
import {compose} from 'recompose';
import {withTetraAuth, withTetraUser} from 'src/utils/Auth';

export default compose(withTetraAuth(), withTetraUser())(Component);

function Component({tetraAuth, tetraUser}) {
	// ... do something
}

```

## tetraUser
The User object, straight from the API's `/users/me` endpoint.
 
## tetraAuth
Object with functions for interacting with the auth state:
 
 ```javascript
{
	update: (token) => {}, // takes a valid JWT token and retrieves the User object, stores User in state
	logout: () => {} // takes no arguments; removes the user's JWT and clears the tetraUser state
}
```

# FormBuilder
There is a FormBuilder util To make it easier to create Tetra-style forms and handle input validation & errors in the same way everywhere. We'll examine the login form for this example.

The form component is created from `LoginPageView` by calling `formBuilder` with the list of fields and actions. `formBuilder` returns a component that is usable in a JSX view.

Form fields are defined by an object of the shape

```javascript
type FormBuilderField = {
	// name of the field, used internally and by screen readers for accessbility
	name: string,
	
	// material icon name
	icon: string,
	
	// placeholder text to show in the input field
	placeholder: string,
	
	// validation function, receives the field's value and returns a message if its is invalid
	validator: (string) => string | null,
	
	// optional boolean indicating if the field should be masked
	password?: boolean 
}
```

Form actions are defined by an object of the shape

```javascript
type FormBuilderAction = {
	// text shown on the button
	text: string,
	
	// function to determine if the button is disabled or not
	getIsDisabled: ({fieldsAreFilled: boolean, noErrors: boolean}) => boolean,
	
	// onClick handler, it is given the tetraAuta and tetraUser objects in
	// addition to a form object containing the field values
	// The return Promise is how success & errors are communicated to the form.
	// Promise rejections are converted to error messages, and both rejections
	// and resolves let formBuilder know it's time to remove the action's spinner.
	onClick: ({tetraAuth: any, tetraUser: any, form: any}) => Promise<*>
}
```

**LoginView.js**

```javascript
const LoginForm = formBuilder({
	fields: [
		{
			name: 'email',
			icon: 'email',
			placeholder: 'John.doe@me.com',
			validator: getEmailError
		},
		{
			name: 'password',
			icon: 'lock_outline',
			placeholder: 'Password',
			validator: getPasswordError,
			password: true
		}
	],
	actions: [
		{
			text: 'SIGN IN',
			getIsDisabled: ({fieldsAreFilled, noErrors}) => !(fieldsAreFilled && noErrors),
			onClick: ({tetraAuth, form: {email, password}}) => loginUser({email, password})
				.then(({token}) => tetraAuth.update(token))
				.catch(e => {
					const errorMessages = [];
					let formErrorMessage = 'There was an error logging in.';

					if (e.response && e.response.data) {
						const errors = e.response.data;

						if (errors.email) {
							errorMessages.push({field: 'email', message: formatEmailErrors(errors.email)});
						}

						if (errors.password) {
							errorMessages.push({field: 'password', message: formatPasswordErrors(errors.password)});
						}

						if (errors.non_field_errors) {
							formErrorMessage = formatNonFieldErrors(errors.non_field_errors);
						}
					}

					errorMessages.push({field: 'form', message: formErrorMessage});
					throw errorMessages;
				})
		}
	]
});

export default compose(
	withProps(() => ({LoginForm}))
)(LoginPageRender);
```

**LoginPageRender.js**

```javascript
export default function LoginPage({LoginForm}: LoginPageProps) {
	return (
		<div className="loginPage">
			<div className="header">Login</div>

			<div className="pageContents">
				<LoginForm/>

				<div className="footer">
					or <Link to="/password-reset">reset your password</Link>
				</div>
			</div>
		</div>
	);
}
```

# Data Access

To allow components to describe and manage their own data needs there is a `WithData` util that works with `recompose` to inject asynchronous data.

```javascript
import withData from 'src/utils/WithData';
import loadSomething from 'src/services/someService';

function Foo({isLoading, data, error}) {
	return (
		<div>
		    <div display-if={isLoading}>Loading ...</div>
		    <div display-if={error}>There was an error: {error}</div>
		    <div display-if={data}>Got your data! {data}</div>
		</div>
	);
}

export default compose(
	withData(() => loadSomething())
)(Foo)
```

The `withData` function takes a function argument that returns a promise. Until the promise resolves or rejects the injected `isLoading` property is true. If the promise resolves that value is passed as the `data` prop, if it rejects the value is passed as `error`.

There is an additional property that is injected by `withData` in case the loader needs to be called again: `refetch`. When called it will set `isLoading` back to false and call the loader function again.
