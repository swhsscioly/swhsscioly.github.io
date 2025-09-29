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
  var result = [];
  const data = await fetchData();
  for (const row of data) {
    if (row[2] == "Yes") {
      result.push([row[0], row[1]]);
    }
  }
  
  return result;
}

