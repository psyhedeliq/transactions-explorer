import styled from 'styled-components';

export const HomeWrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
`;

export const Title = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin-bottom: 1rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 0.5rem;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;
