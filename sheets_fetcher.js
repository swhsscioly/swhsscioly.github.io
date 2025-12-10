async function fetchData() {
  try {
    const url = "https://corsproxy.io/https://docs.google.com/spreadsheets/d/e/2PACX-1vShLix4SLBGRaIInfZdSZl7yiVqOUZaVju3QS3ct_2znOVl9rXNgjd28P9yNnXBNmqulXxtHJMTo6LC/pub?gid=0&single=true&output=csv&_=" + new Date().getTime();
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split("\n").map(r=>r.split(",")).filter((a) => {return a[2] == "Yes"});
  }
  catch (err) {
    console.log(err);
  }
}

async function fetchProcessData() {
  try {
    const data = await Promise.race([
      fetchData(),
      new Promise((_, r) => setTimeout(() => r("timeout"), 5000))
    ]);

    var result = data.filter(r => r[2] === "Yes").map(r => [r[0], r[1]]);
    if (result == []) {
      return [["General Info", "https://docs.google.com/document/d/1Y_XDXPSnIZ-nqElenfrqkj9lGlP7dRmJjgecJvEKlrY/edit?tab=t.0"]];
    }
  } catch {
    return [["General Info", "https://docs.google.com/document/d/1Y_XDXPSnIZ-nqElenfrqkj9lGlP7dRmJjgecJvEKlrY/edit?tab=t.0"]];
  }
}


