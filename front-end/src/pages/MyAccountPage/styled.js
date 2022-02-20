import styled from "styled-components";

export const PageArea = styled.div`
    max-width: 1024px;
    margin:auto;

    .infos{
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

        .area--info{
            width: 100%;
            font-size: 14px;
            padding: 5px;
        }
    }

    .info--button{
            background-color: #0089FF;
            border: 0;
            outline: 0;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
            color: #FFF;
            font-size: 15px;
            margin-right: 25px;

            &:hover {
                background-color: #006FCE;
            }

            &:active{
                background-color: #999;
            }
        }

    .ad--container, .inactive{
        flex:1;
        display:flex;
        background-color: #26EB64;
        margin-bottom: 15px;
        height: 50px;
        border-radius: 15px;
        padding: 10px;
        align-items: center;
        font-weight: bold;
        cursor:pointer;
        transition: all ease 0.3s;

        &:hover{
            background-color: #1BF6DC;
            color: white;
        }

        button{
            background-color: #0089FF;
            border: 0;
            outline: 0;
            border-radius: 5px;
            font-size: 15px;
            color: #FFF;
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 10px;

            &:hover{
                background-color: #006FCE ;
            }
        }

        span{
            flex:1;
        }
    }

    .inactive{
        background-color: #DDD;
        font-weight: normal;

        &:hover{
            background-color: #999 ;
        }
    }


`

export const EditUserModal = styled.div`
    .form{
        background-color: #DDD;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;
        width: 60%;
        margin-bottom: 20px;

        .modal--form--area{
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
        }

        .modal--form--title{
            width: 30%;
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            padding-right: 10px;
        }

        .modal--form--input{
            flex: 1;

            input{
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #DDD;
                outline: 0;
                border-radius: 5px;
                transition: all ease 0.4s;

                &:focus{
                    border: 1px solid black;
                }
            }
        }

        button {
            background-color: #0089FF;
            border: 0;
            outline: 0;
            border-radius: 5px;
            font-size: 15px;
            color: #FFF;
            padding: 5px 10px;
            cursor: pointer;

            &:hover{
                background-color: #006FCE ;
            }
        }
    }

    @media (max-width: 700px) {
        .form{
            width: 95%;

            .modal--form--area{
                flex-direction: column;
            }

            .modal--form--title{
                width: 100%;
                text-align: center;
                margin-bottom: 5px;
            }

            .modal--form--input {
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