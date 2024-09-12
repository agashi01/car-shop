.catch (err=> {
    if (err.data === "you dont have a token in authorization") {
        console.log('where is your authorization?')
    } else if (err.data = 'Invalid token') {
        console.log('who are you?!')
    } else if (err.data === "Token has expired") {
        axiosInstance.post("/token", { token: localStorage.getItem('refreshToken') })
            .then(res => {
                localStorage.setItem('token', res.data)
                console.log('your token has expired you must refresh the page')

            })
    } else if (err.data === "Token verification failed") {
        console.log("something wrong happened")
    }
})