import React, { useState } from "react";
import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";

import { useApp } from "../context/app";
import IconButton from "../components/IconButton";
import Loading from "../components/generic/Loading";
import IntegerField from "../components/generic/IntegerField";
import ProgressBar from "../components/generic/ProgressBar";


const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  const { toggleNavigation } = useApp();
  const [integer, setInteger ] = useState(0)
  return <>


    <header>
    <div>
        <IconButton icon='list' onClick={toggleNavigation} />
        <h1>Documentation</h1>
    </div>
</header>



    <Container>
      <div>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
        

        <DocumentComponent
          title="IntegerField"
          component={<IntegerField value={integer}  onChange={setInteger} />}
          propDocs={[
            {
              prop: "min",
              description: "The minimum acceptable value",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "max",
              description: "The maximum acceptable value",
              type: "number",
              defaultValue: "99",
            },
            {
              prop: "value",
              description: "The value to set",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "onChange",
              description: "The value change handler",
              type: "function",
              defaultValue: "()=>{}",
            },
            {
              prop: "fontSize",
              description: "Font size in rems",
              type: "number",
              defaultValue: "1.5",
            },
            {
              prop: "fomtColor",
              description: "CSS color for the font",
              type: "string",
              defaultValue: "whitesmoke",
            },
            {
              prop: "bgColor",
              description: "CSS color for the background ",
              type: "string",
              defaultValue: "#212121",
            },
          ]}
        />
        

        <DocumentComponent
          title="ProgressBar"
          component={
            <div style={{ width:100 }}>
              Basic
              <ProgressBar value={66.66}  limit={100} active={true} />
              Segmented
              <ProgressBar segmented={true} value={6}  limit={10} active={true} />
              </div>
            }
          propDocs={[
            {
              prop: "segmented",
              description: "Is this a segmented progress bar or justr a basic one?",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "value",
              description: "The current value",
              type: "number",
              defaultValue: "0",
            },
            {
              prop: "limit",
              description: "The maximum value to reach for completion",
              type: "number",
              defaultValue: "10",
            },
            {
              prop: "active",
              description: "Is it in active state?",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "done",
              description: "Has the progress completed?",
              type: "boolean",
              defaultValue: "false",
            },
            {
              prop: "size",
              description: "The height of the progress bar (in rems)",
              type: "number",
              defaultValue: "1",
            },
            {
              prop: "defaultColor",
              description: "CSS color for displaying inactive or incomplete portions",
              type: "string",
              defaultValue: "gray",
            },
            {
              prop: "activeColor",
              description: "CSS color for highlighting currently active fill indicator",
              type: "string",
              defaultValue: "green",
            },
            {
              prop: "doneColor",
              description: "CSS color for highlighting completed fill indicator(s)",
              type: "string",
              defaultValue: "blue",
            },
          ]}
        />



      </div>
    </Container>
    </>
};

export default Documentation;
//min = 0, max = 99, value, onChange