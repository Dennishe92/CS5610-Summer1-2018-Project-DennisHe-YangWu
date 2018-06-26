const USER_API_URL = 'http://localhost:8080/api/user';
const USER_API_LOGIN = 'http://localhost:8080/api/login';
const USER_API_LOGOUT = 'http://localhost:8080/api/logout';
const PROFILE_API_URL = 'http://localhost:8080/api/profile';
const CUSTOMER_API_URL = 'http://localhost:8080/api/customer';
const SELLER_API_URL = 'http://localhost:8080/api/seller';
const DELIVERY_API_URL = 'http://localhost:8080/api/delivery';

let _singleton = Symbol();
class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    deleteUser(customerId) {

    }

    login(user) {
        return fetch(USER_API_LOGIN, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(function(response) {
                if (response.status === 409 || response.status === 500) {
                    return null;
                } else {
                    return response.json();
                }
            })
    }

    logout() {
        return fetch(USER_API_LOGOUT, {
            method: 'post',
            credentials: 'same-origin'
        });
    }

    populateProfile() {
        return fetch(PROFILE_API_URL, {
            credentials: 'same-origin'
        }).then(function(response) {
                if (response.status === 409) {
                    return null;
                } else {
                    return response.json();
                }
                // return response.json();
            });
    }

    updateUser(userId, user) {
        return fetch(USER_API_URL + '/', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
        })
    }

    createUser(userType, user) {
        return fetch(USER_API_URL + '/' + userType, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
        }).then(function(response) {
            if (response. status === 409 || response.status === 500) {
                return null
            } else {
                return response.json();
            }
        })
    }

    findUserByUsername(username) {
        return fetch(
            USER_API_URL + '/' + username, {
                credentials: 'same-origin'
            }).then(function (response) {
            return response.json();
        });
    }

    findRecipesByCustomer() {
        return fetch(
            CUSTOMER_API_URL  + '/recipes', {credentials: 'same-origin'})
            .then(function (response) {
                    return response.json();
                }
            )
    }

    findProductsBySeller(userId) {
        return fetch(
            SELLER_API_URL + '/' + userId + '/product'
        ).then(function (response) {
            return response.json();
        })
    }

    // findOrdersByCustomer() {
    //     return fetch(
    //         CUSTOMER_API_URL + '/orders')
    //         .then(function (response) {
    //             // if (response.status === 409 || response.status === 500) {
    //             //     return null;
    //             // } else {
    //             //     return response.json();
    //             // }
    //         return response.json();
    //     })
    // }

    findOrdersByCustomer(username) {
        return fetch(
            CUSTOMER_API_URL + '/' + username + '/orders')
            .then(function (response) {
                // if (response.status === 409 || response.status === 500) {
                //     return null;
                // } else {
                //     return response.json();
                // }
                return response.json();
            })
    }

    findOrdersByDelivery(userId) {
        return fetch(
            DELIVERY_API_URL + '/' + userId + '/order'
        ).then(function (response) {
            return response.json();
        })
    }

    findCurrentUser() {
        return fetch(
            'http://localhost:8080/api/currentUser')
            .then(function(response) {
                return response.json();
            }
        )
    }
}

export default UserService;