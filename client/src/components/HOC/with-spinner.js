import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/context-provider";
import Spinner from "../styled/spinner";
import { generateAction } from "../../contexts/actions";
import { mountWithWordMeanPOS } from "../../contexts/context-util";

const WithSpinner = (WrappedComponent) => {
    const LoadSpinner = () => {
        const { loading, dispatch } = useContext(AppContext);
        
        useEffect(() => {
            if (loading) {
                mountWithWordMeanPOS(dispatch, generateAction);
            }
        }, [loading]);

        return (
            loading ? <Spinner /> : <WrappedComponent />
        );
    }
    return LoadSpinner;
};

export default WithSpinner;