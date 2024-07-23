import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: 1rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
`;
