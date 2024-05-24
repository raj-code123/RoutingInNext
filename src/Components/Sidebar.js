import * as React from "react";
import SideNavigation from "@cloudscape-design/components/side-navigation";

export default function  Sidebar(){
  const [activeHref, setActiveHref] = React.useState(
    "#/page1"
  );
  return (
    <SideNavigation
      activeHref={activeHref}
      header={{
        href: "#/",
        logo: { alt: "logo", src: "/logo-large.svg" }
      }}
      onFollow={event => {
        if (!event.detail.external) {
          event.preventDefault();
          setActiveHref(event.detail.href);
        }
      }}
      items={[
        { type: "link", text: "Page 1", href: "#/page1" },
        { type: "link", text: "Page 2", href: "#/page2" },
        { type: "link", text: "Page 3", href: "#/page3" },
        { type: "link", text: "Page 4", href: "#/page4" }
      ]}
    />
  );
}