# Third-party software

This offline-ready demo includes a small vendored React v16.0.0 and ReactDOM browser runtime in `public/vendor` to avoid requiring npm downloads just to run the MVP. React is MIT licensed; see https://github.com/facebook/react/blob/main/LICENSE . The historical runtime is appropriate for evaluating this prototype, not recommended for a security-sensitive production application. Before production, upgrade to an actively maintained version of React and a modern bundling system.

The editable JSX source is `src/App.jsx`. `public/app.js` is its compiled JavaScript build output.
