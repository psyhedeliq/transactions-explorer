import styled from 'styled-components';

export const AddressText = styled.span`
    word-break: break-all;
`;

export const AddressWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 1rem;

    @media (max-width: 768px) {
        padding: 0 2rem;
    }
`;

export const Title = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin-bottom: 1rem;
`;

export const Balance = styled.p`
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin-bottom: 1rem;
`;

export const SortButtons = styled.div`
    margin-bottom: 1rem;
`;

export const SortButton = styled.button`
    margin-right: 0.5rem;
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

export const TransactionList = styled.ul`
    list-style-type: none;
    padding: 0 0 60px 0;
    width: 100%;
    max-width: 600px;
`;

export const TransactionItem = styled.li`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

export const TransactionLink = styled.a`
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

export const TransactionAmount = styled.span`
    font-weight: bold;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`;

export const TransactionTime = styled.span`
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.secondary};
    text-align: center;
`;
