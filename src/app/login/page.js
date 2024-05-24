'use client'
import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";


export default function Page() {
    const [logindata,setLogindata] = React.useState({
        username: '',
        password: '',
    });
    const router = useRouter();
    const handleLogin = async () => {
        try {
          const formData = new FormData();
          formData.append('username', logindata.username);
          formData.append('password', logindata.password);
      
          const result = await axios.post(
            'https://api-uat-ap-south-1-eks.sendbip.com/v1/users/token',
            formData,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
      
          console.log(result);
      
          if (result.status === 200) {
            const data = result.data;
            console.log(data);
            // // localStorage.setItem('userToken', data.access_token);
            Cookies.set('userToken', data.access_token);
            router.push('/datatable');
          } else {
            alert('Please enter correct credentials.');
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login. Please try again.');
        }
      };
      
      
    return (
    <div className="container">
        <div className="form_div">
        <form onSubmit={e => e.preventDefault()}>
            <Form
                actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button onClick={handleLogin} variant="primary">Submit</Button>
                </SpaceBetween>
                }
            >
                <Container
                header={
                    <Header variant="h2" textAlign="center">
                        Login
                    </Header>
                }
                >
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="Username">
                    <Input 
                        value={logindata.username}
                        onChange={event => setLogindata({...logindata,username:event.detail.value}) } 
                    />
                    </FormField>
                    <FormField label="Password">
                    <Input
                        value={logindata.password}
                        onChange={event => setLogindata({...logindata,password:event.detail.value}) } 
                    />
                    </FormField>
                </SpaceBetween>
                </Container>
            </Form>
            </form>
        </div>
   </div>
  );
}