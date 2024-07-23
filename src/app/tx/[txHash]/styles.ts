import styled from 'styled-components';

export const TransactionWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (max-width: 768px) {
        padding: 0 2rem;
    }
`;

export const Title = styled.h1`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin-bottom: 1rem;
`;

export const DetailItem = styled.p`
    margin-bottom: 0.5rem;
    word-break: break-all;
`;

export const TransactionLink = styled.a`
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    word-break: break-all;

    &:hover {
        text-decoration: underline;
    }
`;
