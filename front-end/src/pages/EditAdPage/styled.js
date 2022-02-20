import styled from "styled-components";

export const PageArea = styled.div`
    max-width: 1024px;
    margin: auto;

    .form{
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;

        .area{
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 80%;
        }

        .area--title{
            width: 200px;
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            padding-right: 10px;
        }

        .area--input{
            flex: 1;

            input, textarea{
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

            textarea{
                resize:none;
                height: 150px;
            }

            select{
                outline: 0;
                border: 1px solid #DDD;
                padding: 5px;
                width: 100%;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
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

    .img--container{
        display: flex;
        flex-wrap: wrap;
        margin: 20px 0;
        flex:1;

        .img--area{
            margin: 5px;
            width: 24%;
            min-height: 350px;
            background-color: white;
            border-radius: 10px;
            padding: 5px;
            border: 1px solid #DDD;
            cursor: pointer;
            transition: all ease 0.3s;

            &:hover{
                border: 1px solid black;
            }

            img{
                width:100%;
                border-radius: 10px;
            }
            .default{
                display: flex;
                margin: 5px 0;
                font-size: 17px;
                display: flex;
                align-items: center;
                padding: 0 5px;

                span{
                    font-weight: bold;
                    margin-right: 5px;
                }

                small{
                    flex:1;
                    font-size: 18px;
                }

                button{
                    font-size: 12px;
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

            .del{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;
            }
        }
    }

    @media (max-width: 700px) {
        h2 {
            text-align: center;
        }

        .form {
            width: 100%;
            padding: 0;

            .area{
                flex-direction: column;
                max-width: 100%;
            }

            .area--title{
                text-align: center;
                margin-bottom: 10px;
            }

            .area--input{
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }
        }

        .img--container{
            flex-direction: column;
            align-items: center;

            .img--area {
                width: 90%;
            }
        }
    }
`
