'use strict'
const { formatters } = use('Validator')

class StoreUser {
  get rules () {
    return {
      username: 'required|max:100',
      email: 'required|email|max:150|unique:users:email',
      password: 'required|max:100'
    }
  }

  get validateAll(){
    return true
  }

  get formatters(){
    return formatters.JsonApi
  }
}

module.exports = StoreUser
