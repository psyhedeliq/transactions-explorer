import { ErrorWrapper } from './ErrorMessage.styles';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <ErrorWrapper>{message}</ErrorWrapper>;
};

export default ErrorMessage;
