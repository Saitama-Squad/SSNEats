import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import canteen from "./assets/canteen.jpeg";
import styled from 'styled-components';
import students from "./assets/students.jpeg";
import Font from 'react-font'
export const CardContainer = styled.div`
  height: 500px;
  border-radius: 10px;
  width: 400px;
  background-color: white;
  padding: 5px;
  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 450px;
    height: 562px;
  }
  margin-right: 5vw;
`;
export const Text = styled.h1`
  font-size: 25px;
  font-weight: 300;
  margin-left: 50px;
  margin-top: 20px;
`
export const Texts = styled.h1`
  font-size: 25px;
  font-weight: 300;
  margin-left: 125px;
  margin-top: 80px;
`
export const Heading = styled.h1`
  font-size: 70px;
  font-weight: 500;
  color: white;
  text-align: center;
  margin-top: 20px;
`;
export const SubHead = styled.h1`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;
function Navbar(props) {
    return (
        <div>
          <Font family='Monoton'>
            <Heading align="center">SSNEats</Heading>
          </Font>
            <div>
            <div className="pt-10 mb-16 font-sans text-3xl text-center font-semibold">
              <Font family="Ultra">
                <SubHead>Continue As</SubHead>
              </Font>
            </div>
            <div className="flex justify-center">
            <Link to="/shop">
            <CardContainer>
              <img src={canteen} alt="canteen" />
              <Font family='Ultra'>
                <Text>Food Court Owner</Text>
              </Font>
            </CardContainer>
            </Link>

            <Link to="/user">
            <CardContainer>
              <img src={students} alt="students"/>
              <Font family='Ultra'>
                <Texts>Students</Texts>
              </Font>
            </CardContainer>
            </Link>
            </div>
            </div>
        </div>
    )   
}

export default Navbar;