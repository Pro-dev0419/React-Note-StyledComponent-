import styled from 'styled-components';

export const MainContent = styled.div`
    margin: 50px;
    border: 1px solid;
    padding: 25px 10px;

    @media screen and (max-width: 620px) {
        margin: 20px;
    }
`;

export const AddNoteBox = styled.div`
  display: flex;
  padding: 0 10px;
`;

export const NoteListBox = styled.div`
    margin-top: 30px;
`;