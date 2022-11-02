# Privy Auth Demo

This is a simple browser and mobile optimized demo of Privy Auth. 

## Useful Code Snippets
Here, we outline the specific integration points with Privy Auth in this demo app.

### `pages/_app.tsx`
- The `PrivyProvider` is our top-level component in the hierarchy.
- In the `PrivyProvider`, we also pass in:
  - our Privy `appId` (retrieved from the Privy Console)
  - an (optional) `onSuccess` callback that redirects the user to the dashboard page upon login. 

### `pages/index.tsx`
- This landing page includes a `button` that invokes Privy Auth's `login` hook when clicked. This prompts the user to sign-in with a wallet or their email address. 

### `pages/dashboard.tsx`
- If a user is not `authenticated`, we redirect them back to our landing page. Note that we first check if `ready` is true before taking any actions based off of the `authenticated` hook. This ensures we do not take any actions based off of outdated authentication state that will soon be updated.
- We use the `user` object to show the user's DID and linked accounts.
- The `linkEmail` and `linkWallet` hooks to allow a user to link those accounts if they have not already connected them.
- The `logout` hook to allow the user to logout. 


## Installation

```sh
# Clone repo
git clone git@github.com:privy-io/privy-auth-demo.git
cd privy-auth-demo

# Create .env.local file from example, filling in your Privy App ID.
cp .env.example.local .env.local

# Install dependencies
npm i

# Start the demo
npm run dev
```
