/*
Of Note:

- The majority of the functions return a DOM Element

- When they are composed they effectively create a tree:
  - Each DOM Element is a node
  - Some components can have a child/children

- Rows & Columns can hold multiple children

- The only component that doesn't return a DOM Element is Menu.
  Rather, it returns a function that can be called to toggle it
*/

function isMobile() {
  return window.innerWidth <= 768;
}

let typographyVariants;

if (isMobile()) {
  typographyVariants = {
    "navbar": {fontSize: "20px", fontWeight: "50", lineHeight: "10px", font: "Georgia"},
    "body-small":  { fontSize: "13px", fontWeight: "40", lineHeight: "15px", font: "Georgia" },
    "body-medium": { fontSize: "15px", fontWeight: "50", lineHeight: "18px", font: "Georgia"},
    "headline-small": { fontSize: "20px", fontWeight: "600", lineHeight: "20px", font: "Georgia" },
    "headline-medium": { fontSize : "30px", fontWeight: "600", lineHeight: "30px", font: "Roboto"},
    "headline-large": { fontSize: "30px", fontWeight: "600", lineHeight: "30px", font: "Roboto" }
  };
}
else {
  typographyVariants = {
    "navbar": {fontSize: "20px", fontWeight: "50", lineHeight: "10px", font: "Georgia"},
    "body-small":  { fontSize: "23px", fontWeight: "40", lineHeight: "30px", font: "Georgia" },
    "body-medium": { fontSize: "25px", fontWeight: "50", lineHeight: "30px", font: "Georgia" },
    "headline-small": { fontSize: "30px", fontWeight: "600", lineHeight: "30px", font: "Georgia" },
    "headline-medium": { fontSize: "60px", fontWeight: "600", lineHeight: "60px", font: "Roboto" },
    "headline-large": { fontSize: "70px", fontWeight: "800", lineHeight: "75px", font: "Roboto" }
  };
}

function Text(options) {
  const {
    id = "",
    text = "",
    variant = "body-small",
    align = "left",
    as = "span",
    color = "black",
    font = "Georgia",
    whiteSpace = "normal",
    animations = []
  } = options;

  const node = document.createElement(as);

  const style = typographyVariants[variant];
  node.style.fontSize = style.fontSize;
  node.style.fontWeight = style.fontWeight;
  node.style.lineHeight = style.lineHeight;
  node.style.fontFamily = style.font;

  node.style.textAlign = align;

  if (color) node.style.color = color;

  node.textContent = text;
  node.style.whiteSpace = whiteSpace;

  if (id) node.id = id;

  animations.forEach(anim => node.classList.add(anim));

  return node;
}

function Button(options) {
  const {
    id = "",
    child,
    className,
    onClick = () => console.log("Button Pressed"),
    margin,
    padding = "10px 20px",
    position,
    border = "none",
    borderRadius = 8,
    width,
    height,
    animations = [],
    backgroundColor = "white"
  } = options;
  const node = document.createElement("button");
  node.type = "button";
  node.id = id;
  node.onclick = onClick 
  if (className != null) node.className = className;

  if (position) {
    node.style.position = position;
    node.style.zOrder = "99998";
  }
  if (margin != null) node.style.margin = margin;
  if (padding) node.style.padding = padding;
  node.style.border = border;
  node.style.borderRadius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
  if (width) node.style.width = width;
  if (height) node.style.height = height;
  if (backgroundColor) {
    if (backgroundColor.startsWith("linear-gradient") || backgroundColor.startsWith("radial-gradient")) {
      node.style.background = backgroundColor;
    } else {
      node.style.backgroundColor = backgroundColor;
    }
  }
  node.style.display = "flex";
  node.style.justifyContent = "center";
  node.style.alignItems = "center";

  if (child) node.append(child);
  
  animations.forEach(anim => node.classList.add(anim));

  return node;
}

function Image({id="", src, alt = "", width, height, objectFit = "cover", borderRadius, border, className, animations = []}) {
  const node = document.createElement("img");
  node.id = id;
  node.src = src;
  node.alt = alt;
  
  node.style.display = "block";
  if (width) node.style.width = typeof width === "number" ? width + "px" : width;
  if (height) node.style.height = typeof height === "number" ? height + "px" : height;
  if (borderRadius) node.style.borderRadius = borderRadius;
  node.style.objectFit = objectFit;

  if (className) node.classList.add(className);
  if (border) node.style.border = border;
  
  node.loading = "lazy";
  animations.forEach(anim => node.classList.add(anim));
  
  return node; 
}

function Row({ id = "", children = [], gap = "10px", align = "center", justify = "center", padding, margin}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "row";
  node.style.gap = gap; // space between elements
  node.style.alignItems = align; // vertical alignment
  node.style.justifyContent = justify; // horizontal alignment

  if (id) node.id = id;
  if (padding) node.style.padding = padding;
  if (margin) node.style.margin = margin;



  children.forEach(child => node.append(child));

  return node;
}

function Column({ id = "",  children = [], gap = "10px", align = "center", justify = "center", padding, margin}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "column";
  node.style.gap = gap;               // space between elements
  node.style.alignItems = align;      // horizontal alignment
  node.style.justifyContent = justify; // vertical alignment
  if (id) node.id = id;
  if (padding) node.style.padding = padding;
  if (margin) node.style.margin = margin;

  children.forEach(child => node.append(child))

  return node;
}

function Line({
  width = "100%",
  height = "2px",
  color = "#ccc",
  margin = "10px 0"
}) {
  const node = document.createElement("div");
  node.style.width = width;
  node.style.height = height;
  node.style.backgroundColor = color;
  node.style.margin = margin;
  return node;
}

function SizedBox({
  child,
  width,
  height,
  color = "white",
  margin,
  padding,
  align,
  animations = [],
}) {
  const node = document.createElement("div");
  node.style.width = width;
  node.style.height = height;
  node.style.backgroundColor = color;

  node.style.alignItems = "center";
  node.style.display = "flex";
  node.style.justifyContent = "center";
  
  if (margin) node.style.margin = margin;
  if (padding) node.style.padding = padding;
  if (child) node.appendChild(child);
  if (color) {
    if (color.startsWith("linear-gradient") || color.startsWith("radial-gradient")) {
      node.style.background = color;
    } else {
      node.style.backgroundColor = color;
    }
  }
  animations.forEach(anim => node.classList.add(anim));
  return node;
}

function Menu({ children = [], side = "right", width = "200px", background = "rgba(64, 64, 64, 1)", padding = "10px", margin = "10px"}) {
  const node = document.createElement("div");
  node.style.position = "fixed";
  node.style.zIndex = "99999";
  node.style.top = "0";
  node.style[side] = `-${width}`;
  node.style.width = width;
  node.style.height = "100%";
  node.style.backgroundColor = background;
  node.style.boxShadow = side === "left" ? "1px 0 10px rgba(0,0,0,0.1)" : "-1px 0 10px rgba(0,0,0,0.1)";
  node.style.display = "flex";
  node.style.flexDirection = "column";
  node.style.padding = padding;
  node.style.margin = margin;
  node.style.transition = "all 0.3s ease";
  node.style.opacity = "1";
  
  children.forEach(child => node.appendChild(child));
  
  let open = false;
  function toggle(x) {
    console.log(open, x);
    if (open != x) {
      open = x;
      node.style[side] = x ? "0" : `-${width}`;
    }
  }
  
  document.body.appendChild(node);

  return toggle;
}

function FlexRow({id="", children = [], gap = "10px", align = "center", justify = "center", padding, margin}) {
  //if mobile, returns a column
  //if not, returns row
  if (isMobile()) {
    return Column({id, children, gap, align, justify, padding, margin});
  }
  return Row({id, children, gap, align, justify, padding, margin});
}

function SidePadding({child, width="5%"}) {
  return Row({
    children: [
      SizedBox({width: width, height: "5%"}),
      child,
      SizedBox({width: width, height: "5%"})
    ]
  })
}

function Carousel({id = "", images}) {
  let index = 0;
  let leftButton = SizedBox({
    child: Row({
      children: [
        Button({
          child: Text({
          text: "⮜",
            color: "",
            variant: "headline-small",
          }),
          animations: ["navHoverAnim"],
          backgroundColor: "transparent",
          onClick: () => {
            console.log("previous");
          }, 
        }),
      ]
    }),
    width: "20%",
    height: "6em",
    color: "#a24857"
  });
  let rightButton = SizedBox({
    child: Button({
      child: Text({
      text: "⮞",
        color: "",
        variant: "headline-small",
      }),
      animations: ["navHoverAnim"],
      backgroundColor: "transparent",
      onClick: () => {
        console.log("next");
      }, 
    }),
    width: "20%",
    height: "6em",
    color: "#a24857"
  });


  return Row({
    children: [
      leftButton,
      SizedBox({
        width:"30%", 
        color: "linear-gradient(to right, #a24857, white)",
        height: "6em"
      }),
      Image({
        id: id+"'s displayed image",
        src: images[index],
        height: "6em"
      }),
      SizedBox({
        width:"30%", 
        color: "linear-gradient(to left, #a24857, white)",
        height: "6em"
      }),
      rightButton
    ],
    gap: "0px"
  });
}
