import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from "react-router-dom";

import { checkAuthenticated, useAuthState, useAuthDispatch } from '../../context/auth';

function Test(props) {
    console.log('component render edildi');

    // ### Simple useEffect-1
    // const [counter, setCounter] = useState(0);
    // useEffect(() => {
    //     console.log('UseEffect çalıştı');
    //     if (counter >= 5) return;
    //     setCounter(counter + 1);
    // }, [counter]);


    const history = useHistory();
    const [isFetching, setIsFetching] = useState(false);

    const authState = useAuthState();
    const authDispatch = useAuthDispatch();

    // ### Simple useEffect-2
    useEffect(() => {
        console.log('UseEffect çalıştı');

        // console.log(authDispatch);

        let isMounted = true; // note mutable flag

        ; (async () => {
            try {
                await checkAuthenticated(authDispatch, false, history.location.pathname, history);
                console.log('fetched user =>', isMounted);
                if (isMounted) { // add conditional check
                    setIsFetching(true);
                } else console.error("aborted setState on unmounted component", 'e');
            } catch (err) {
                setIsFetching(true);
                console.error(err);
            }
        })();

        return () => {
            console.log('isMounted =>', isMounted);
            isMounted = false;
        };
    }, []);

    return (
        <>
            {/* <div style={{ padding: 10 }}>
                <h1>Simple useEffect-1</h1>
                <h3>{`Counter: ${counter}`}</h3>
            </div> */}

            <div style={{ padding: 10 }}>
                <h1>Simple useEffect-2</h1>
                <h3>{`authState: ${JSON.stringify(authState)}`}</h3>
            </div>
        </>
    )
}

export default Test