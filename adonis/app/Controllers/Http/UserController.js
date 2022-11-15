'use strict'
const User = use('App/Models/User')
class UserController {

    async store({request, response}){
        const data = request.only(['username', 'email', 'password'])
        await User.create(data)
        return response.created({
            status: "OK"
        })
    }
}

module.exports = UserController
