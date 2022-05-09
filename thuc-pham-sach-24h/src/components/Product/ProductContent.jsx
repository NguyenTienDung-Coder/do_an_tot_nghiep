import React from 'react';
import styled from 'styled-components';


    const IMGStyled=styled.div`
    text-align: center;
    `
    const ContentWrapper=styled.div`
    text-align: left; 
    `
    const ContentText=styled.p`
    font-size: 14px;
    `
    const IMGProduct=styled.img`
      width: 100%;
    `

export default function ProductContent() {
  return (
    <>
    <ContentWrapper>
        <h4>Title: Ba rọi 1 nắng</h4>
        <IMGStyled><IMGProduct src={require('./IMG/ba-roi-mot-nang.jpg')} alt="ba-roi-mot-nang"/></IMGStyled>
        <ContentText>Content 1: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, perferendis. Earum tempora pariatur laudantium iure aliquid a enim incidunt veritatis impedit dicta minima facere corporis, explicabo excepturi nisi eius qui.</ContentText>
        <IMGStyled><IMGProduct src={require('./IMG/ba-roi-1-nang-full.jpg')} alt="ba-roi-mot-nang"/></IMGStyled>
        <ContentText>Content 2: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum eaque doloremque inventore distinctio unde recusandae velit quam odit? Corrupti, exercitationem dolorem facilis mollitia repudiandae amet quisquam cumque esse quam assumenda!</ContentText>
        <IMGStyled><IMGProduct src={require('./IMG/ba-roi-mot-nang-krongpa.jpg')} alt="ba-roi-mot-nang"/></IMGStyled>
        <ContentText>Content 3: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident nulla natus amet illo aut. Impedit laudantium pariatur dignissimos fugit sunt, sit nemo asperiores officia aperiam quam reprehenderit ad illo beatae.</ContentText>
        <IMGStyled><IMGProduct src={require('./IMG/ba-roi-mot-nang-finished.jpg')} alt="ba-roi-mot-nang"/></IMGStyled>
        <ContentText>Content 4: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti eos cumque iste odio quidem dolorum nulla, ullam, ducimus id quis corrupti praesentium officiis, obcaecati autem minima nesciunt omnis exercitationem temporibus?</ContentText>
    </ContentWrapper>
    
    </>
  )
}
