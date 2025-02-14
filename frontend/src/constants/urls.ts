const baseUrl = 'http://localhost/api'

const login = '/login';
const refresh = '/refresh'
const orders = '/orders'
const comment = orders + '/addComment'
const groups = '/groups'
const addGroup = groups + '/addGroup'
const updateOrder = orders + '/update'

const urls = {
  login: {
    base: login
  },
  refresh: {
    base: refresh
  },
  orders: {
    base: orders,
    update: updateOrder
  },
  comments: {
    base: comment
  },
  groups: {
    base: groups,
    addGroup: addGroup
  }
}

export {
  baseUrl,
  urls
}