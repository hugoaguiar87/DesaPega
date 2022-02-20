import styled from "styled-components";

export const SearchArea = styled.div`
    width: 250px;
    margin-right: 10px;
    
    .filterName{
        margin: 10px 0;
        font-size: 15px;
    }

    input, select{
        width: 100%;
        height: 40px;
        outline:0;
        border-radius: 5px;
        border: 2px solid #9BB83C;
        font-size: 15px;
        color: #000;
        padding: 10px;
    }

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .categoryItem{
        display: flex;
        align-items: center;
        padding: 10px;
        color: #000;
        border-radius: 5px;
        cursor: pointer;

        img{
            height: 25px;
            width: 25px;
            margin-right: 5px;
        }
        span{
            font-size: 14px;
        }
    }

    .categoryItem:hover, .categoryItem.active{
        background-color: #9BB83C;
        color: white;
    }

    @media (max-width: 700px) {
        width: 100%;

        form {
            margin: 0 5px;
        }

        .filterName{
            text-align: center;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
        }

        li {
            width: 33%;

        }
    }
`

export const AdsArea = styled.div`
    flex:1;

    .ads-list{
        display: flex;
        flex-wrap: wrap;
    }

    h2{
        margin: 0;
        font-size: 20px;
        padding: 0px 20px;
    }

    .loading{
        padding: 0 20px;
        margin-top: 30px;
    }

    @media (max-width: 700px) {
        margin-top: 20px;

        h2{
            text-align:center;
        }

        .ads-list{
            margin-top: 15px;
            div{   
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
            }
            
        }
    }
`

export const PageArea = styled.div`
    display: flex;
    max-width: 1024px;
    margin: auto;
    margin-top: 20px;

    @media (max-width: 700px) {
        flex-direction: column;
        /* justify-content: center;
        align-items: center; */
    }
`