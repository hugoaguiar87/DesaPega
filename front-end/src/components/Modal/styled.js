import styled from 'styled-components';

export const ModalArea = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    .container{
        background-color: white;
        width: 60%;
        min-height: 60%;
        color: black;
        border-radius: 20px;

        .close{
            background-color: transparent;
            outline: none;
            width: 32px;
            height: 32px;
            border: none;
            cursor: pointer;
            right: calc(-100% + 64px);
            top: 16px;
            display: flex;
            position: relative;
            align-items: center;
        }
    }
    
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    @media (max-width: 700px) {
        .container{
            width: 100%;
        }
    }
`