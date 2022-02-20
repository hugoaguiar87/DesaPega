import styled from "styled-components";

export const Button = styled.button`
    cursor: pointer;
    margin-right: 4px;
    border:0;
    height: 30px;
    width: 30px;
    border-radius: 20px;

    background-color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease 0.1s;

    color: black;

    &:hover{
        background-color: #DDD;
    }
    
`

export const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`