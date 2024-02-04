const fs = require("fs");
const axios = require("axios");

// Read the data.json file
const data = fs.readFileSync("public/data.json");
const domains = JSON.parse(data);

// Create the logo folder if it doesn't exist
if (!fs.existsSync("public/logo-cache")) {
  fs.mkdirSync("public/logo-cache");
}

// Download the favicons for each domain
domains.forEach(async (domain) => {
  try {
    const response = await axios.get(
      `https://www.google.com/s2/favicons?domain=${
        new URL(domain.url).hostname
      }&sz=256`,
      { responseType: "stream" }
    );
    const fileName = `public/logo-cache/${new URL(domain.url).hostname}.png`;
    const writer = fs.createWriteStream(fileName);
    response.data.pipe(writer);
    console.log(`Downloaded favicon for ${domain.url}`);
  } catch (error) {
    console.error(
      `Error downloading favicon for ${domain.name}: ${error.message}`
    );
  }
});
