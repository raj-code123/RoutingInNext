'use client'

import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";

export default function Page() {

  return (
    <div className="form_div">
        <form onSubmit={e => e.preventDefault()}>
            <Form
                actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="primary">Submit</Button>
                </SpaceBetween>
                }
            >
                <Container
                header={
                    <Header variant="h2" textAlign="center">
                        Reset Password
                    </Header>
                }
                >
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="Password">
                        <Input />
                    </FormField>
                    <FormField label="Confirm Pasword">
                        <Input />
                    </FormField>
                </SpaceBetween>
                </Container>
            </Form>
            </form>
    </div>
  );
}