"use client"
import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import Link from "next/link";

export default () => {
  const [
    selectedItems,
    setSelectedItems
  ] = React.useState([]);
  return (
    <Table
    selectionType="multi"
      onSelectionChange={({ detail }) =>

      {
        console.log("Selected", detail )
        setSelectedItems(detail.selectedItems)}
        
      }
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? "item" : "items"
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) =>
        console.log("selccted new",selectedItems)
        //   item.description
      }}
      columnDefinitions={[
        {
          id: "variable",
          header: "Variable name",
          cell: item => <Link href="#">{item.title}</Link>,
        //   sortingField: "name",
          isRowHeader: true
        },
        {
          id: "value",
          header: "Text value",
          cell: item => item.alt,
          sortingField: "alt"
        },
        {
          id: "type",
          header: "Type",
          cell: item => item.type
        },
        {
          id: "description",
          header: "Description",
          cell: item => item.description
        }
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true },
        { id: "type", visible: true },
        { id: "description", visible: true }
      ]}
      items={[
    {
        "_id": "6597e462e6a5b1824174976e",
        "id": "dd4411da-e9de-4adc-bcb0-320bd2eea53e",
        "title": "TEST BOOK 2",
        "description": "Geronimo stilton the mona mousa code #15",
        "availability": "in stock",
        "condition": "refurbished",
        "price": "3.2 BHD",
        "link": "https://www.amazon.in/GERONIMO-STILTON-MONA-MOUSA-CODE/dp/0439661641",
        "image_link": "https://cdn.shopify.com/s/files/1/0404/8850/1416/products/51MwTReoxWL._SX343_BO1_204_203_200_325x470.jpg?v=1597689458",
        "brand": "Home",
        "google_product_category": "Media > Books",
        "fb_product_category": "",
        "quantity_to_sell_on_facebook": null,
        "sale_price": null,
        "sale_price_effective_date": "",
        "item_group_id": "1",
        "gender": null,
        "color": "",
        "size": "",
        "age_group": null,
        "material": "",
        "pattern": "",
        "shipping": "",
        "shipping_weight": 1.4,
        "is_active": true
    },
    {
        "_id": "659b8b529f9e8ca95ec0aeb0",
        "id": "c579ef8b-42c9-4914-831a-58c790a22675",
        "title": "TEST BOOK 2",
        "description": "Geronimo stilton the mona mousa code #15",
        "availability": "in stock",
        "condition": "refurbished",
        "price": "3.2 BHD",
        "link": "https://www.amazon.in/GERONIMO-STILTON-MONA-MOUSA-CODE/dp/0439661641",
        "image_link": "https://cdn.shopify.com/s/files/1/0404/8850/1416/products/51MwTReoxWL._SX343_BO1_204_203_200_325x470.jpg?v=1597689458",
        "brand": "Home",
        "google_product_category": "Media > Books",
        "fb_product_category": "",
        "quantity_to_sell_on_facebook": null,
        "sale_price": null,
        "sale_price_effective_date": "", 
        "item_group_id": "2",
        "gender": null,
        "color": "",
        "size": "",
        "age_group": null,
        "material": "",
        "pattern": "",
        "shipping": "",
        "shipping_weight": 1.4,
        "is_active": true
    }
]}
      loadingText="Loading resources"
      trackBy="id"
    //   selectionType="multi"
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
        <Header
          counter={
            selectedItems.length
              ? "(" + selectedItems.length + "/10)"
              : "(10)"
          }
        >
          Table with common features
        </Header>
      }
      pagination={
        <Pagination currentPageIndex={1} pagesCount={2} />
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
  );
}