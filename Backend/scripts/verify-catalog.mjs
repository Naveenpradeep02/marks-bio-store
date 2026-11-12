import http from "http";

function get(path) {
  return new Promise((resolve, reject) => {
    http.get("http://127.0.0.1:5000/api" + path, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function verify() {
  const prods = await get("/products");
  console.log("Total Products returned by API:", prods.length);
  prods.forEach((p) => {
    console.log(
      `[${p.id}] ${p.name} | ₹${p.price} | Vars: ${p.variants.length} | Imgs: ${p.images.length} | Cat: ${p.mainCategoryName} > ${p.categoryName}`
    );
  });
  const brands = await get("/brands");
  console.log("Total Brands:", brands.length);
  const cats = await get("/categories?tree=true");
  console.log("Top Category Trees:", cats.length);
  process.exit(0);
}

verify().catch((e) => {
  console.error(e);
  process.exit(1);
});
