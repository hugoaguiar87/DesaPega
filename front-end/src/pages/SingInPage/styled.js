import styled from "styled-components";

export const PageArea = styled.div`
    max-width: 1024px;
    margin: auto;

    form{
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;

        .area{
            display: flex;
            padding: 10px;
            max-width: 500px;
            align-items: center;
        }

        .area--title{
            width: 200px;
            text-align: right;
            padding-right: 10px;
            font-weight: bold;
            font-size: 14px;
        }

        .area--input{
            flex:1;

            input{
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #DDD;
                border-radius: 5px;
                outline:0;
                transition: all ease 0.3s;

                &:focus {
                    border: 1px solid black;
                }
            }            
        }

        button{
            background-color: #0089FF;
            border: 0;
            outline: 0;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            color: #FFF;
            font-size: 15px;

            &:hover {
                background-color: #006FCE;
            }

        }

    }

    @media (max-width: 700px) {
        h1{
            text-align: center;
        }

        form {
            .area{
                flex-direction: column;
                max-width: 100%
            }

            .area--title{
                width: 100%;
                text-align: center;
                margin-bottom: 5px;
            }

            .area--input{
                width: 100%;
            }
        }
    }
`

export const ErrorMessage = styled.div`
    margin: 10px 0;
    background-color: #FFCACA;
    color: #000;
    border: 2px solid #FF0000;
    padding: 10px;
`