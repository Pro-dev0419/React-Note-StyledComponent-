import styled from 'styled-components';

interface THeader {
    bgColor: string;
}

export const CustomHeader = styled.header<THeader>`
  display: flex;
  height: 74px;
  background-color: ${(props: any) => props.bgColor};
  padding: 0 50px;

  @media screen and (max-width: 620px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: fit-content !important;
    }
`;

export const HeaderLogoDiv = styled.div`
    display: flex;
    width: 136px;
    padding: 10px 0;
`;

export const AppLogo = styled.img`
    width: 100%;
    pointer-events: none;
`;

export const HeaderContent = styled.div`
    flex: 1;
`;

export const HeaderBtnGroup = styled.div`
    display: flex;
    align-items: center;
`;