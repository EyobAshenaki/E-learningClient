export default function ({ store, redirect }) {
  if (store.getters['auth/isLoggedIn']) {
    return redirect('/home')
  }
}
