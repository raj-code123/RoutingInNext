'use client'
import * as React from "react";
import axios from "axios";
import '../App.css'
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import { Badge, BreadcrumbGroup, ButtonDropdown, Container, Form, FormField, Input, Link, SideNavigation } from "@cloudscape-design/components";
import { Nav } from "../../Components/Nav";
import { MdArrowBackIos } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";

// import data from '../../../data.json';
// export const getToken = () => {
//   let token =  window.localStorage.getItem('token');
//   return token;
// };

export default function DataTable() {
  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([]);
  const [
    currentPageIndex,
    setCurrentPageIndex
  ] = React.useState(1);
  const [activeHref, setActiveHref] = React.useState(
    "#/page2"
  );
  const [sidebar,setSidebar] = React.useState(false);
  const [popup,setPopup] = React.useState(false);
  const [apiData, setApiData] = React.useState([]);
  const [ buttonData,setButtonData] = React.useState("");
  const [dropdownData, setDropdownData] = React.useState("");
  let Token = Cookies.get("userToken");
  const [popupData, setPopupData] = React.useState({
    merchant_id: "A1B1AA62",
    title: "",
    description: "",
    availability: "in stock",
    condition: "refurbished",
    price: "3.2 BHD",
    link: "https://www.amazon.in/GERONIMO-STILTON-MONA-MOUSA-CODE/dp/0439661641",
    image_link: "https://cdn.shopify.com/s/files/1/0404/8850/1416/products/51MwTReoxWL._SX343_BO1_204_203_200_325x470.jpg?v=1597689458",
    brand: "Home",
    google_product_category: "Media > Books",
    fb_product_category: "",
    sale_price_effective_date: "",
    item_group_id: "",
    color: "",
    size: "",
    material: "",
    pattern: "",
    shipping: "",
    shipping_weight: 1.4,
    shipping_weight_unit: "kg"
   })
  const npage = apiData ? Math.ceil(apiData.length / 5) : 0;
  const lastIndex = currentPageIndex * 5;
  const firstIndex = lastIndex - 5;
  const records = apiData?.slice(firstIndex, lastIndex);
  const handleDropdownSelect = (e) => {
    setButtonData(e.detail.id);
    setDropdownData(e.detail.id);
    setSidebar(true);
  };
  console.log(records);

  const handleChange = (e) => {
    const {name , value} = e.target;
    setPopupData({...popupData,[name]:value});
  }

  const menuSections = [
    { type: "link", text: "Home", href: "#/page1" },
    { type: "link", text: "Catalog", href: "#/page2" },
    {
      type: "link",
      text: "Order",
      href: "#/page3",
      info: <Badge color="green">23</Badge>
    },
    { type: "link", text: "Active Offers", href: "#/page4" },
    { type: "link", text: "Season Sale", href: "#/page5" },
  ];

  if (dropdownData === "users") {
    menuSections.push(
      {
        type: "section",
        text: "Users",
        items: [
          { type: "link", text: "Manages User", href: "#/page22" },
          { type: "link", text: "Serviceable User", href: "#/page23" },
          { type: "link", text: "Delivery User", href: "#/page6" },
          { type: "link", text: "Order User", href: "#/page7" },
        ],
      }
    );
  } else if(dropdownData === "product"){
    menuSections.push(
      {
        type: "section",
        text: "product",
        items: [
          { type: "link", text: "Manages product", href: "#/page22" },
          { type: "link", text: "Serviceable product", href: "#/page23" },
          { type: "link", text: "Delivery product", href: "#/page6" },
          { type: "link", text: "Order product", href: "#/page7" },
        ],
      }
    );
  } else if(dropdownData === "orders"){
    menuSections.push(
      {
        type: "section",
        text: "Order",
        items: [
          { type: "link", text: "Manages orders", href: "#/page22" },
          { type: "link", text: "Serviceable orders", href: "#/page23" },
          { type: "link", text: "Delivery orders", href: "#/page63" },
          { type: "link", text: "Order orders", href: "#/page32" },
        ],
      }
    );
  }
  React.useEffect(() => {
       fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/list/A1B1AA62`,{},
        { 
          headers: {"Authorization" :`bearer ${Token}`}
        }
      );
      console.log(response.data);
      return setApiData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const deleteapiData = async (id) =>{
    console.log(id);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/delete/${id}`,{is_active:false},
        { headers: {"Authorization" :`bearer ${Token}`}},
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  const addapiData = async () => {
    console.log(popupData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/add`,
        popupData,
        {
          headers: {
            "Authorization": `bearer ${Token}`,
          }
        }
      );
      console.log(response.data);
      setPopup(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const updateApiData = async () => {
    console.log("click updateApiData");
    let id = selectedItems[0].id;
    console.log(id);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/update/${id}`,
        popupData,
        {
          headers: {
            "Authorization": `bearer ${Token}`,
          }
        }
      );
      console.log(response.data);
      setPopup(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  return (
    <>
        <Nav dropdownData={dropdownData} setDropdownData={setDropdownData} handleDropdownSelect={handleDropdownSelect}/>
        <div className="breadcrumb"></div>
        <div className="data-container table_custom">
            <div  className="side-table">
              <div className="nav-toggle">
                <CiMenuBurger onClick={() => setSidebar(true)} />
                <BreadcrumbGroup
                  items={[
                          { text: "Home", href: "#" },
                          {
                            text: "Dashboard",
                            href: "#components/breadcrumb-group"
                          }
                      ]}
                      ariaLabel="Breadcrumbs"
                />
              </div>
              
              <div className="cover-table">
                <Table
                  onSelectionChange={({ detail }) =>
                        setSelectedItems(detail.selectedItems)
                    }
                    selectedItems={selectedItems}
                    ariaLabels={{
                        selectionGroupLabel: "Items selection",
                        allItemsSelectionLabel: ({ selectedItems }) =>
                        `${selectedItems.length} ${
                            selectedItems.length === 1 ? "item" : "items"
                        } selected`,
                        itemSelectionLabel: ({ selectedItems }, item) =>
                        item.title
                    }}
                    columnDefinitions={[
                        {
                        id: "variable",
                        header: "Title",
                        cell: item => <Link href={item.link}>{item.title}</Link>,
                        sortingField: "name",
                        isRowHeader: true
                        },
                        {
                        id: "value",
                        header: "Description",
                        cell: item => item.description,
                        sortingField: "alt"
                        },
                        {
                        id: "price",
                        header: "Price",
                        cell: item => item.price
                        },
                        {
                        id: "description",
                        header: "Availablity",
                        cell: item => item.availability
                        },
                        {
                        id: "condition",
                        header: "Condition",
                        cell: item => item.condition
                        },
                        {
                          id: "actions",
                          header: "Actions",
                          cell: item => (
                            <Button
                              variant="inline-link"
                              ariaLabel={`Download ${item.id}`}
                              onClick={() => deleteapiData(item.id)}
                            >
                              Delete
                            </Button>
                          ),
                          minWidth: 90
                        }
                    ]}
                    columnDisplay={[
                        { id: "variable", visible: true },
                        { id: "value", visible: true },
                        { id: "price", visible: true },
                        { id: "description", visible: true },
                        { id: "condition", visible: true },
                        { id: "actions", visible: true },
                    ]}
                    items={records}
                    loadingText="Loading resources"
                    selectionType="multi"
                    trackBy="id"
                    empty={
                        <Box
                        margin={{ vertical: "xs" }}
                        textAlign="center"
                        color="inherit"
                        >
                        <SpaceBetween size="m">
                            <b>No resources</b>
                            <Button>Create resource</Button>
                        </SpaceBetween>
                        </Box>
                    }
                    filter={
                        <TextFilter
                        filteringPlaceholder="Find resources"
                        filteringText=""
                        />
                    }
                    header={
                        <div className="main-header">
                            <Header
                            counter={
                                selectedItems.length
                                ? "(" + selectedItems.length + "/10)"
                                : "(10)"
                            }
                            >
                                Manage Catalog
                            </Header>
                            <div className="button-cover">
                                <ButtonDropdown
                                    items={[
                                        { text: "Deactivate", id: "deactive", disabled: false },
                                        { text: "Activate", id: "active", disabled: false },
                                        { text: "Edit", id: "edit", disabled: false },
                                        { text: "Delete", id: "delete", disabled: false },
                                    ]}
                                    onItemClick={(e) => handleDropdownSelect(e)}
                                    >
                                    Actions
                                </ButtonDropdown>
                                {
                                  selectedItems.length == 0 &&  <Button onClick={() => setPopup(!popup)} variant="primary">Add New</Button>
                                }
                                
                                {
                                  selectedItems.length == 1 &&  <Button onClick={() => setPopup(!popup)} variant="primary">Update</Button>
                                }
                               
                            </div> 
                        </div>
                    }
                    pagination={
                      <Pagination
                        currentPageIndex={currentPageIndex}
                        onChange={({ detail }) =>
                          setCurrentPageIndex(detail.currentPageIndex)
                        }
                        pagesCount={npage}
                      />
                    }
                    preferences={
                        <CollectionPreferences
                        title="Preferences"
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        preferences={{
                            pageSize: 10,
                            contentDisplay: [
                            { id: "variable", visible: true },
                            { id: "value", visible: true },
                            { id: "type", visible: true },
                            { id: "description", visible: true }
                            ]
                        }}
                        pageSizePreference={{
                            title: "Page size",
                            options: [
                            { value: 10, label: "10 resources" },
                            { value: 20, label: "20 resources" }
                            ]
                        }}
                        wrapLinesPreference={{}}
                        stripedRowsPreference={{}}
                        contentDensityPreference={{}}
                        contentDisplayPreference={{
                            options: [
                            {
                                id: "variable",
                                label: "Variable name",
                                alwaysVisible: true
                            },
                            { id: "value", label: "Text value" },
                            { id: "type", label: "Type" },
                            { id: "description", label: "Description" }
                            ]
                        }}
                        stickyColumnsPreference={{
                            firstColumns: {
                            title: "Stick first column(s)",
                            description:
                                "Keep the first column(s) visible while horizontally scrolling the table content.",
                            options: [
                                { label: "None", value: 0 },
                                { label: "First column", value: 1 },
                                { label: "First two columns", value: 2 }
                            ]
                            },
                            lastColumns: {
                            title: "Stick last column",
                            description:
                                "Keep the last column visible while horizontally scrolling the table content.",
                            options: [
                                { label: "None", value: 0 },
                                { label: "Last column", value: 1 }
                            ]
                            }
                        }}
                        />
                  }
                />
              </div>
            </div>
            <div className={`side-modal ${sidebar ? "active" : ""}`}>
              <div className="top_bar">
                <span className="info">
                    <a href="js:">Browser</a>
                </span>
                <span onClick={() => setSidebar(false)} className="right_arrow">
                    <MdArrowBackIos />
                </span>
              </div>
              <SideNavigation
                activeHref={activeHref}
              //   header={{ href: "#/", text: "Service name" }}
                onFollow={event => {
                  if (!event.detail.external) {
                    event.preventDefault();
                    setActiveHref(event.detail.href);
                  }
                }}
                items={menuSections}
              />
            </div>
            <div className={`${popup ? "popup active" : "popup"}`}>
            <form onSubmit={e => e.preventDefault()}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button onClick={() => setPopup(!popup)} formAction="none" variant="link">
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      if(selectedItems.length === 1){
                        updateApiData();
                      } else {
                        addapiData();
                      }
                    }} variant="primary">Submit</Button>
                  </SpaceBetween>
                }
              >
                <Container
                  header={
                    <Header variant="h2">
                      Add DataTable
                    </Header>
                  }
                >
                  <SpaceBetween direction="vertical" size="l">
                    <FormField label="Title">
                    <input type="text" name="title" value={popupData.title} onChange={handleChange} />
                    </FormField>
                    <FormField label="Price">
                      <input type="text" name="price" value={popupData.price} onChange={handleChange} />
                    </FormField>
                    <FormField label="Availablity">
                      <input type="text" name="availability" value={popupData.availability} onChange={handleChange} />
                    </FormField>
                    <FormField label="Condition">
                    <input type="text" name="condition" value={popupData.condition} onChange={handleChange} />
                    </FormField>
                  </SpaceBetween>
                </Container>
              </Form>
            </form>
            </div>
            <div onClick={() => setSidebar(true)} className={`Burgur-menu ${ sidebar ? "active" : ""}`}>
                <CiMenuBurger />
            </div>
        </div>
    </>
  );
}