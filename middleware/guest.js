export default function ({ store, redirect }) {
  if (!process.server && store.getters['auth/isLoggedIn']) {
    return redirect('/home')
  }
}
