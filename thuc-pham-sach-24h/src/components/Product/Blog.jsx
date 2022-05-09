import React, { useState } from "react";
import styled from "styled-components";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { Box, Link } from "@mui/material";

const LI = styled.li`
  border: 1px solid #51aa1b;
  border-radius: 11px;
  list-style: none;
  margin-bottom: 1rem;
  width: 100%;
  &:hover {
    border: 1px solid orange;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;
const IMG = styled.img`
  border-radius: 9px 0 0 9px;
`;
const Content = styled.span`
  text-align: left;
  font-size: 14px;
  padding-left: 5px;
`;
const LinkStyled = styled(Link)`
  &&& {
    text-decoration: none;
    color: black;
  }
`;
const Cotainer = styled.div`
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default function Blog() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Cotainer>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Blog - tin tức" value="1" />
              </TabList>
            </Box>
            <TabPanel style={{ padding: 0 }} value="1">
              <ul style={{ margin: "1rem 0 0 0", padding: 0 }}>
                <LI>
                  <LinkStyled href="/tin-tuc">
                    <Wrapper>
                      <IMG
                        src={require("./IMG/cach-lam.jpg")}
                        alt="cachlam"
                        width="77px"
                        height="61px"
                      />
                      <Content style={{ fontSize: "14px", textAlign: "left" }}>
                        Lorem ipsum dolor sit amet consectetur{" "}
                      </Content>
                    </Wrapper>
                  </LinkStyled>
                </LI>
                <LI>
                  <LinkStyled href="/tin-tuc">
                    <Wrapper>
                      <IMG
                        src={require("./IMG/cach-lam.jpg")}
                        alt="cachlam"
                        width="77px"
                        height="61px"
                      />
                      <Content style={{ fontSize: "14px", textAlign: "left" }}>
                        Lorem ipsum dolor sit amet consectetur{" "}
                      </Content>
                    </Wrapper>
                  </LinkStyled>
                </LI>
                <LI>
                  <LinkStyled href="/tin-tuc">
                    <Wrapper>
                      <IMG
                        src={require("./IMG/cach-lam.jpg")}
                        alt="cachlam"
                        width="77px"
                        height="61px"
                      />
                      <Content style={{ fontSize: "14px", textAlign: "left" }}>
                        Lorem ipsum dolor sit amet consectetur{" "}
                      </Content>
                    </Wrapper>
                  </LinkStyled>
                </LI>
                <LI>
                  <LinkStyled href="/tin-tuc">
                    <Wrapper>
                      <IMG
                        src={require("./IMG/cach-lam.jpg")}
                        alt="cachlam"
                        width="77px"
                        height="61px"
                      />
                      <Content style={{ fontSize: "14px", textAlign: "left" }}>
                        Lorem ipsum dolor sit amet consectetur{" "}
                      </Content>
                    </Wrapper>
                  </LinkStyled>
                </LI>
              </ul>
            </TabPanel>
          </TabContext>
        </Box>
      </Cotainer>
    </>
  );
}
