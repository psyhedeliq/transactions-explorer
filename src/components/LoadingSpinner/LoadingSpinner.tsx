import React from 'react';
import { SpinnerWrapper, Spinner } from './LoadingSpinner.styles';

const LoadingSpinner: React.FC = () => {
    return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    );
};

export default LoadingSpinner;
