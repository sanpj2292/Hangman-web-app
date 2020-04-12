import React, { useContext } from "react";
import { AppContext } from "../../contexts/context-provider";
import Spinner from "../styled/spinner";

const WithSpinner = (WrappedComponent) => {
    const LoadSpinner = () => {
        const { loading } = useContext(AppContext);
        console.log(`WithSpinner HOC: ${loading}`)
        return (
            loading ? <Spinner /> : <WrappedComponent />
        );
    }
    return LoadSpinner;
};

export default WithSpinner;