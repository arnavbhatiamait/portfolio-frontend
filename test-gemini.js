const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log("API Response:");
    if (data.models) {
      console.log("Supported Models:");
      data.models.forEach((m) => console.log(m.name));
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  })
  .catch((err) => console.error("Fetch Error:", err));
