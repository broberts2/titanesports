# Arclight-React

My personal collection of commonly used react components using material-ui

## Installing

```
npm install arclight-react
```

## Components API

### Header

Basic website header/nav-bar

```javascript
import { Header } from "arclight-react";

<Header
  data={{
    title: "Some Title",
    links: [
      {
        cnt: <Component />,
        cb: () => console.log("Click")
      }
    ],
    logo: { src: require("./logo.png"), height: "50px" }
  }}
/>;
```

### Drawer

Slider menu that opens from the left, top, right, or bottom

```javascript
import { Drawer } from "arclight-react";

<Drawer
  direction={"left"}
  buttonText={"Open"}
  items={[
    {
      text: "Thing",
      icon: <Component />
    }
  ]}
/>;
```

### Video Loop

Responsive background video loop

```javascript
import { VideoLoop } from "arclight-react";

<div style={{ height: "500px" }}>
  <VideoLoop
    duration={12000}
    videos={require("./videos/videos.js")}
  ></VideoLoop>
</div>;
```

Video object export example (used for the 'videos' prop)

```javascript
module.exports = [
  {
    src: require("./waves.mp4"),
    type: "video/mp4"
  }
];
```

### Loader

Standard web spinner when waiting for async requests

```javascript
```

### Modal

Responsive modal popup

```javascript
```

### HCard

Responsive horizontal grid layout for components

```javascript
import { HCard } from "arclight-react";

<HCard
  style={"a"}
  data={{
    content: [<Component />, <Component />, <Component />]
  }}
/>;
```

### FontAwesomeIcon

JSX wrapper for Font Awesome Icons

```javascript
import { FontAwesomeIcon } from "arclight-react";

<FontAwesomeIcon
  style={"b"}
  data={{ img: "accusoft", type: "brands", size: "50%" }}
/>;
```

### Border

A stylistic border component (in-progress)

```javascript
import { Border } from "arclight-react";

### TO BE COMPLETED ###

```

### Alert

Standard alert messages

```javascript
import { Alert } from "arclight-react";

<Alert
  cb={() => console.log("Hello!")}
  style={"a"}
  type={"error"}
  data={{ text: "Check out this stuff!", title: "Yolo!" }}
/>;
```

### SpeedDial

An accordion-like menu button that expands and contracts

```javascript
import { SpeedDial } from "arclight-react";

<SpeedDial
  style={"a"}
  direction={"right"}
  hidden={false}
  data={[
    { icon: <Component />, name: "Copy" },
    { icon: <Component />, name: "Save" },
    { icon: <Component />, name: "Print" },
    { icon: <Component />, name: "Share" },
    { icon: <Component />, name: "Like" }
  ]}
/>;
```

### VideoButton

Responsive button with video background

```javascript
import { VideoButton } from "arclight-react";

<VideoButton
  style={"a"}
  data={{
    src: require("./abstract_blue.mp4"),
    type: "video/webm",
    cnt: (
      <FontAwesomeIcon
        style={"a"}
        color={"white"}
        data={{ img: "accusoft", type: "brands", size: "50%" }}
      />
    )
  }}
/>;
```

### Table

Responsive table

```javascript
import { Table } from "arclight-react";

<Table
  style={"a"}
  title={"Market Analysis"}
  headCells={[
    {
      id: "item",
      numeric: false,
      label: "Stock"
    },
    {
      id: "openingPrice",
      numeric: true,
      label: "Opening Price USD",
      format: "usd"
    },
    {
      id: "closingPrice",
      numeric: true,
      label: "Closing Price USD",
      format: "usd"
    },
    {
      id: "profitLoss",
      numeric: true,
      label: "Profit / Loss",
      format: "usd"
    },
    {
      id: "profitLossPercentage",
      numeric: true,
      label: "Profit / Loss",
      format: "percentage"
    }
  ]}
  data={[
    {
      item: "Microsoft (MSFT)",
      openingPrice: 305,
      closingPrice: 3.7,
      profitLoss: -1 * (305 - 3.7),
      profitLossPercentage: (1 - 3.7 / 305) * -1
    },
    {
      item: "Ford (F)",
      openingPrice: 25,
      closingPrice: 452,
      profitLoss: -1 * (25 - 452),
      profitLossPercentage: 452 / 25
    },
    {
      item: "AT&T (T)",
      openingPrice: 262,
      closingPrice: 260,
      profitLoss: -1 * (262 - 260),
      profitLossPercentage: (1 - 260 / 262) * -1
    }
  ]}
  dial={
    <SpeedDial
      style={"a"}
      direction={"left"}
      hidden={false}
      data={[
        {
          icon: <FileCopyIcon onClick={data => console.log(data)} />,
          name: "Copy"
        },
        {
          icon: <SaveIcon onClick={data => console.log(data)} />,
          name: "Save"
        },
        {
          icon: <PrintIcon onClick={data => console.log(data)} />,
          name: "Print"
        },
        {
          icon: <ShareIcon onClick={data => console.log(data)} />,
          name: "Share"
        },
        {
          icon: <FavoriteIcon onClick={data => console.log(data)} />,
          name: "Like"
        }
      ]}
    />
  }
  selectionDial={
    <SpeedDial
      style={"a"}
      direction={"left"}
      hidden={false}
      data={[
        {
          icon: <FileCopyIcon onClick={data => console.log(data)} />,
          name: "Copy"
        },
        {
          icon: <SaveIcon onClick={data => console.log(data)} />,
          name: "Save"
        }
      ]}
    />
  }
/>;
```

## Authors

- **Broc Roberts** - [broberts2](https://github.com/broberts2)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Material-UI [Material-UI](https://material-ui.com/)
