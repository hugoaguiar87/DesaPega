import styled from "styled-components";

export const SearchArea = styled.div`
    background-color: #DDD;
    border-bottom: 1px solid #CCC;
    padding: 20px 0;
    
    .search--container{
        max-width: 1024px;
        margin: auto;
    }

    .search--box {
        display: flex;
        background: #19DB8A;
        padding: 20px 15px;
        border-radius: 15px;
        box-shadow: 1px 1px 5px black;

        form{
            flex: 1;
            display: flex;

            input, select {
                outline: 0;
                border: 0;
                height: 40px;
                border-radius: 10px;
                margin-right: 20px;
                font-size: 15px;
                color: #000;
            }

            input{
                flex: 1;
                padding: 0 15px;
            }

            select{
                width: 180px;
            }
            button{
                outline: 0;
                border: 0;
                border-radius: 10px;
                font-size: 15px;
                font-weight: bold;
                height: 40px;
                color: white;
                background-color: #0089FF;
                cursor: pointer;
                padding: 0 15px;

                &:hover{
                    background-color: #006FCE ;
                }

            }
        }
    }

    .search--list{
        margin-top: 25px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .categories{
            display: flex;
            align-items: center;
            text-decoration: none;
            color: black;
            height: 50px;
            width: 25%;
            margin: 10px 0;

            &:hover{
                color: #999;
            }

            img{
                margin-right: 5px;
            }
        }
    }

    @media (max-width: 700px) {
        .search--box form {
            flex-direction: column;

            input{
                margin:0;
                margin-bottom: 15px;
                padding: 10px;
            }

            select {
                width: 100%;
                margin-bottom: 15px;
            }
        }
    }

    .search--list {
        .categories {
            width: 50%;
            padding: 15px;
        }
    }    
`

export const AdsArea = styled.div`
    .ads--container{
        max-width: 1024px;
        margin: auto;
        .seeAll{
            text-align: right;
            a{
                color: black;
                font-weight: bold;
                &:hover{
                   color: blue;
                }
            }
            
        }
    }

    .ads--list {
        display: flex;
        flex-wrap: wrap;
    }

    @media (max-width: 700px) {
        .ads--container{
            h2{
                text-align: center;
            }

            p{
                text-align: center;
            }
        }

        .ads--list{
            
            div{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
            }
        }
    }
`