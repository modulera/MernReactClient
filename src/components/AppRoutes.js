import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import { checkAuthenticated, useAuthState, useAuthDispatch } from '../context/auth';

import logger from '../utils/logger';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    const { loading, accessToken, isAuthenticated } = useAuthState();
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
                // if (isFetching) logger('Kullanıcı bilgisi alındı...', 'd');

                if (isFetching && isPrivate && !isAuthenticated) {
                    return <Redirect to={{ pathname: "/login" }} />
                }

                // fetch işlemi tamamlandı ve loading false ise compenenti render ediyoruz
                return (isFetching && !loading ? (
                    <Component {...props} />
                ) : (
                    <div className="pageLoader">
                        <div className="circles">
                            <div></div>
                            <div></div>
                            <div></div>
                            <span></span>
                        </div>
                    </div>
                ));
            }}
            {...rest}
        />
    )
}

export default AppRoutes