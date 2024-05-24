'use client'
import * as React from "react";
import Wizard from "@cloudscape-design/components/wizard";
import { Box, Button, ButtonDropdown, ColumnLayout, Container, Form, FormField, Grid, Header, Input, Link, RadioGroup, SpaceBetween } from "@cloudscape-design/components";
import { Nav } from "../Components/Nav";
import './App.css';

export default function Home () {
  const [
    activeStepIndex,
    setActiveStepIndex
  ] = React.useState(0);
  const [value, setValue] = React.useState("second");
  console.log(value);
  const [sidebar,setSidebar] = React.useState(false);
  const [ buttonData,setButtonData] = React.useState("");
  const [dropdownData, setDropdownData] = React.useState("");
  const handleDropdownSelect = (e) => {
    setButtonData(e.detail.id);
    setDropdownData(e.detail.id);
    setSidebar(true)
  };
  return (
    <>
     <Nav dropdownData={dropdownData} setDropdownData={setDropdownData} handleDropdownSelect={handleDropdownSelect}/>
    <div className="custom-class">
        <Wizard
            i18nStrings={{
            stepNumberLabel: stepNumber =>
            `Step ${stepNumber}`,
            collapsedStepsLabel: (stepNumber, stepsCount) =>
            `Step ${stepNumber} of ${stepsCount}`,
            skipToButtonLabel: (step, stepNumber) =>
            `Skip to ${step.title}`,
            navigationAriaLabel: "Steps",
            cancelButton: "Cancel",
            previousButton: "Previous",
            nextButton: "Next",
            submitButton: "Launch instance",
            className:"custom-container"
        }}
        onNavigate={({ detail }) =>
            setActiveStepIndex(detail.requestedStepIndex)
        }
        activeStepIndex={activeStepIndex}
        allowSkipTo
        steps={[
            {
            title: "Basic Information",
            info: <Link variant="info">Info</Link>,
            description:
                "Provide all of the information asked below to serve you better.",
            content: (
                <form onSubmit={e => e.preventDefault()}>
                    <Form>
                        <Container
                header={
                    <Header variant="h2">
                        Your Personal Details
                    </Header>
                }
                className="custom-container"
                >
                <div
                    className="full-size"
                    >
                        <FormField label="First Name">
                        <Input />
                        </FormField>
                        <FormField label="Middle Name">
                        <Input />
                        </FormField>
                        <FormField label="Last Name">
                        <Input />
                        </FormField>
                        <FormField label="Gender">
                        <Input />
                        </FormField>
                        <FormField label="Email Id">
                        <Input />
                        </FormField>
                        <FormField label="Mobile No:">
                        <Input />
                        </FormField>
                        <FormField label="Alternate No.">
                        <Input />
                        </FormField>
                </div>
                
                <Header className="extra-heading" variant="h2">
                        Your Address Details
                </Header>
                <div
                    className="full-size"
                    >
                        <FormField label="Building / Plot / Flat No.">
                        <Input />
                        </FormField>
                        <FormField label="Area Name">
                        <Input />
                        </FormField>
                        <FormField label="Road No.">
                        <Input />
                        </FormField>
                        <FormField label="Block No.">
                        <Input />
                        </FormField>
                </div>
                <Header className="extra-heading" variant="h2">
                        Business Details
                </Header>
                <div
                    className="full-size"
                    >
                        <FormField label="Commercial Bussiness Name">
                        <Input />
                        </FormField>
                        <FormField label="Registration No.">
                        <Input />
                        </FormField>
                        <FormField label="Registration Type">
                        <Input />
                        </FormField>
                        <FormField label="CPR No.">
                        <Input />
                        </FormField>
                </div>
                </Container>
                    </Form>
                </form>
            )
            },
            {
            title: "Payment Method",
            content: (
                <Container
                className="custom-container payment"
                header={
                    <Header variant="h2">
                    Payment Method
                    </Header>
                }
                >
                <SpaceBetween direction="vertical" size="l">
                <RadioGroup
                    onChange={({ detail }) => setValue(detail.value)}
                    value={value}
                    className="payment_div"
                    items={[
                        { value: "second", label: "UPI" },
                        { value: "first", label: "Net banking" },
                        { value: "third", label: "Debit Card" }
                    ]}
                    />
                    {
                        value === "second" && 
                        <>
                        <form onSubmit={e => e.preventDefault()}>
                            <Form
                                actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary">Pay</Button>
                                </SpaceBetween>
                                }
                            
                            >
                                <Container
                                header={
                                    <Header variant="h2">
                                        Upi Information
                                    </Header>
                                }
                                className="payment_container"
                                >
                                <Grid gridDefinition={[{ colspan: 6 }]}>
                                    <FormField label="UPI Id">
                                    <Input />
                                    </FormField>
                                </Grid>
                                </Container>
                            </Form>
                        </form>
                        </>
                    }
                    {
                        value === "first" && 
                        <>
                        <form>
                            <Form>
                                <Container
                                header={
                                    <Header variant="h2">
                                        Net Banking Information
                                    </Header>
                                }
                                className="payment_container"
                                >
                                    <Link external href="https://www.bankofbaroda.in/personal-banking/digital-products/instant-banking/bob-world-internet-bankingA">
                                        Learn more
                                    </Link>
                                </Container>
                            </Form>
                        </form>
                        </>
                    }
                    {
                        value === "third" && 
                        <>
                        <form onSubmit={e => e.preventDefault()}>
                            <Form
                                actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary">Pay</Button>
                                </SpaceBetween>
                                }
                            
                            >
                                <Container
                                header={
                                    <Header variant="h2">
                                        Card Information
                                    </Header>
                                }
                                className="payment_container"
                                >
                                <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 },{ colspan: 6 }, { colspan: 6 }]}>
                                    <FormField label="Card Number">
                                    <Input />
                                    </FormField>
                                    <FormField label="Expiration Date">
                                    <Input />
                                    </FormField>
                                    <FormField label="Card Holder Name">
                                    <Input />
                                    </FormField>
                                    <FormField label="CVV">
                                    <Input />
                                    </FormField>
                                </Grid>
                                </Container>
                            </Form>
                        </form>
                        </>
                    }
                </SpaceBetween>
                </Container>
            ),
            },
            {
            title: "Delivery provider",
            content: (
                <Container
                header={
                    <Header variant="h2">
                    Delivery provider
                    </Header>
                }
                className="custom-container"
                >
                    <ButtonDropdown
                    items={[
                        { text: "Ali Express", id: "rm", disabled: false },
                        { text: "Maruti Express", id: "mv", disabled: false },
                        { text: "FedEx Express", id: "mv", disabled: false },
                    ]}
                    >
                    Choose One
                </ButtonDropdown>
                </Container>
            ),
            },
            {
            title: "Review and launch",
            content: (
                <form onSubmit={e => e.preventDefault()}>
                    <Form>
                        <Container
                header={
                    <Header variant="h2">
                        Your Personal Details
                    </Header>
                }
                className="custom-container"
                >
                <div
                    className="full-size"
                    >
                        <FormField label="First Name">
                        <Input />
                        </FormField>
                        <FormField label="Middle Name">
                        <Input />
                        </FormField>
                        <FormField label="Last Name">
                        <Input />
                        </FormField>
                        <FormField label="Gender">
                        <Input />
                        </FormField>
                        <FormField label="Email Id">
                        <Input />
                        </FormField>
                        <FormField label="Mobile No:">
                        <Input />
                        </FormField>
                        <FormField label="Alternate No.">
                        <Input />
                        </FormField>
                </div>
                <Header className="extra-heading" variant="h2">
                        Your Address Details
                </Header>
                <div
                    className="full-size"
                    >
                        <FormField label="Building / Plot / Flat No.">
                        <Input />
                        </FormField>
                        <FormField label="Area Name">
                        <Input />
                        </FormField>
                        <FormField label="Road No.">
                        <Input />
                        </FormField>
                        <FormField label="Block No.">
                        <Input />
                        </FormField>
                </div>
                <Header className="extra-heading" variant="h2">
                        Business Details
                </Header>
                <div
                    className="full-size"
                    >
                        <FormField label="Commercial Bussiness Name">
                        <Input />
                        </FormField>
                        <FormField label="Registration No.">
                        <Input />
                        </FormField>
                        <FormField label="Registration Type">
                        <Input />
                        </FormField>
                        <FormField label="CPR No.">
                        <Input />
                        </FormField>
                </div>
                </Container>
                    </Form>
                </form>
            )
            }
        ]}
        />
    </div>
    </>
  );
}