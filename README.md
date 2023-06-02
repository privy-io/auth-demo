# Privy Demo

This is a browser and mobile optimized demo of Privy.

## Useful Code Snippets

These are the specific points of integration:

### `pages/_app.tsx`

- The `PrivyProvider` is our top-level component in the hierarchy.
- In the `PrivyProvider`, we also pass in:
  - our Privy `appId` (retrieved from the Privy Console)
  - a `config` to customize the look and feel of the Privy modal
  - an (optional) `onSuccess` callback that redirects the user to the dashboard page upon login.

### `pages/index.tsx`

- This landing page includes a button that invokes Privy's `login` hook when clicked. This prompts the user to sign-in with a wallet or their email address.

### `pages/dashboard.tsx`

- If a user is not `authenticated`, we redirect them back to our landing page. Note that we first check if `ready` is true before taking any actions based off of the `authenticated` hook. This ensures we do not take any actions based off of outdated authentication state that will soon be updated.
- We use the `user` object to show the user's DID and linked accounts.
- The `link-` methods allows the user to link additional accounts if they have not already connected one of that type.
- The `logout` method allows the user to logout.

## Installation

```sh
# Clone repo
git clone git@github.com:privy-io/auth-demo.git
cd auth-demo

# Create .env.local file from example, filling in your Privy App ID.
cp .env.example.local .env.local

# Install dependencies
npm i

# Start the demo
npm run dev
```
