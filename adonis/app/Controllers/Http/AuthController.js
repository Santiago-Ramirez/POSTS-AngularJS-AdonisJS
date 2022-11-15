'use strict'

class AuthController {
    async login({request, response, auth}){
        const {email, password} = request.only(['email', 'password'])
        const token = await auth.withRefreshToken().attempt(email,password)

        return response.ok(token)
    }
    async getUser({response, auth}){
        const user = await auth.getUser()

        return response.ok({
            data: user['username']
        })
    }
}

module.exports = AuthController
