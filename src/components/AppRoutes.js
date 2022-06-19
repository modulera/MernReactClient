import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import { checkAuthenticated, useAuthState, useAuthDispatch } from '../context/auth';

import logger from '../utils/logger';

const PageLoader = () => {
    return (
        <div className="pageLoader">
            <div className="circles">
                <div></div>
                <div></div>
                <div></div>
                <span></span>
            </div>
        </div>
    )
};

const hidePageLoader = ['/signin', '/signup'];

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    const userDispatch = useAuthDispatch();
    const { loading, accessToken, isAuthenticated } = useAuthState();

    const history = useHistory();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        logger('fetching ...');

        let isMounted = true; // note mutable flag
        ; (async () => {
            try {
                await checkAuthenticated(userDispatch, isPrivate, path, history);
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
    }, [userDispatch, isPrivate, path, history]);

    return (
        <Route
            path={path}
            render={(props) => {
                // if (isFetching) logger('Kullanıcı bilgisi alındı...', 'd');

                if (isFetching && isPrivate && !isAuthenticated) {
                    return <Redirect to={{ pathname: "/signin" }} />
                }

                // fetch işlemi tamamlandı ve loading false ise compenenti render ediyoruz
                return ((isFetching && !loading) || hidePageLoader.includes(path)
                    ? <Component {...props} />
                    : <PageLoader />
                );
            }}
            {...rest}
        />
    )
}

export default AppRoutes