import styled from 'styled-components';

export const Item = styled.div`
    max-width: 200px;
    margin: 15px;
    border-radius: 10px;
    border: 1px solid white;
    padding: 5px;
    background-color: white;
    transition: all ease 0.3s;

    &:hover{
        border: 1px solid black;
        background-color: #EEE;
    }
    
    a{
        text-decoration:none;       
        color: black;

        .item--Image img{
            width: 100%;
            border-radius: 5px;
        }

        .item--Title{
            font-weight: bold;
        }

    }

    @media (max-width: 700px) {
        max-width: 80%;
        margin: 0;
        padding: 0;
    }

`