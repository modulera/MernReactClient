import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import { checkAuthenticated, useAuthState, useAuthDispatch } from '../context/auth';

import logger from '../utils/logger';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    const authState = useAuthState();
    const dispatch = useAuthDispatch();

    const history = useHistory();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        logger('fetching ...');

        let isMounted = true; // note mutable flag
        ; (async () => {
            try {
                await checkAuthenticated(dispatch, isPrivate, path, history);
                if (isMounted) { // add conditional check
                    setIsFetching(true);
                    logger('fetched !!!');
                } else logger("aborted setState on unmounted component", 'e');
            } catch (err) {
                setIsFetching(true);
                logger(err, 'e');
            }
        })();

        return () => { isMounted = false; };
    }, [dispatch, isPrivate, path, history]);

    return (
        <Route
            path={path}
            render={(props) => {
                return isFetching && (isPrivate && !Boolean(authState.accessToken) ? (
                    <Redirect to={{ pathname: "/login" }} />
                ) : (
                    <Component {...props} />
                ))
            }}
            {...rest}
        />
    )
}

export default AppRoutes