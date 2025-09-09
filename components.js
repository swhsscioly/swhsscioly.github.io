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

const typographyVariants = {
  "navbar": {fontSize: "20px", fontWeight: "50", lineHeight: "10px"},
  "body-small":  { fontSize: "23px", fontWeight: "40", lineHeight: "30px" },
  "body-medium": { fontSize: "20px", fontWeight: "50", lineHeight: "25px" },
  "headline-small": { fontSize: "30px", fontWeight: "100000", lineHeight: "30px" },
  "headline-medium": { fontSize: "50px", fontWeight: "700", lineHeight: "45px" },
  "headline-large": { fontSize: "70px", fontWeight: "1000", lineHeight: "75px" },
  "headline-xlarge": { fontSize: "90px", fontWeight: "1000", lineHeight: "95px" }
};

function isMobile() {
  return window.outerWidth <= 768;
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
  node.style.textAlign = align;
  
  if (color) node.style.color = color;
  node.style.fontFamily = font;

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

  if (margin != null) node.style.margin = margin;
  if (padding) node.style.padding = padding;
  node.style.border = border;
  node.style.borderRadius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
  if (width) node.style.width = width;
  if (height) node.style.height = height;
  if (backgroundColor) node.style.backgroundColor = backgroundColor;

  node.style.display = "flex";
  node.style.justifyContent = "center";
  node.style.alignItems = "center";

  if (child) node.append(child);
  
  animations.forEach(anim => node.classList.add(anim));

  return node;
}

function Image({id="", src, alt = "", width, height, objectFit = "cover", borderRadius, className, animations = []}) {
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
  
  node.loading = "lazy";
  animations.forEach(anim => node.classList.add(anim));
  
  return node; 
}

function Row({ children = [], gap = "10px", align = "center", justify = "center"}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "row";
  node.style.gap = gap; // space between elements
  node.style.alignItems = align; // vertical alignment
  node.style.justifyContent = justify; // horizontal alignment

  children.forEach(child => node.append(child));

  return node;
}

function Column({ children = [], gap = "10px", align = "center", justify = "center"}) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.flexDirection = "column";
  node.style.gap = gap;               // space between elements
  node.style.alignItems = align;      // horizontal alignment
  node.style.justifyContent = justify; // vertical alignment

  children.forEach(child => node.append(child));

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
  align
}) {
  const node = document.createElement("div");
  node.style.width = width;
  node.style.height = height;
  node.style.backgroundColor = color;
  
  if (margin) node.style.margin = margin;
  if (padding) node.style.padding = padding;
  if (child) node.appendChild(child);
  return node;
}

function Menu({ children = [], side = "left", width = "250px", background = "#fff", padding = "10px", margin = "10px"}) {
  const node = document.createElement("div");
  node.style.position = "fixed";
  node.style.top = "0";
  node.style[side] = `-${width}`;
  node.style.width = width;
  node.style.height = "100%";
  node.style.background = background;
  node.style.boxShadow = side === "left" ? "2px 0 10px rgba(0,0,0,0.1)" : "-2px 0 10px rgba(0,0,0,0.1)";
  node.style.display = "flex";
  node.style.flexDirection = "column";
  node.style.padding = padding;
  node.style.margin = margin;
  node.style.transition = "all 0.3s ease";
  
  children.forEach(child => node.appendChild(child));
  
  let open = false;
  function toggle() {
    open = !open;
    node.style[side] = open ? "0" : `-${width}`;
  }

  return toggle;
}
