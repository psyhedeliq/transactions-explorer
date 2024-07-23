import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    background-color: ${(props) => props.theme.colors.primary};
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled.h1`
    color: white;
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.xlarge};
    font-weight: 700;
`;
