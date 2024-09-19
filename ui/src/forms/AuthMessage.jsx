import React from 'react';

export default function AuthMessage({authMessage,auth}){

console.log(auth)
    return(
        <div className="modal">
          <div className="logIn-again">
            {authMessage === "Unable to refresh token, please log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage === "Who are you? Please log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage ===
              "Something went wrong, can you please refresh the page and log in again!" ? (
              <>
                <p className="">{authMessage}</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : authMessage ? (
              <>
                <p className="">Something went wrong, please log in again!</p>
                <button onClick={auth} className="btn2">
                  Log In
                </button>
              </>
            ) : null}
          </div>
        </div>
    )
}