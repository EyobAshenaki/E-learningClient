import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    store: window.sessionStorage,
  }).plugin(store)
}
