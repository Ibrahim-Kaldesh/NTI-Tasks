const handle = require("../helper/dealWithJson");

const search = function (req, allProducts) {
  const val = req.query.search;
  let filteredProducts = [];
  if (val) {
    filteredProducts = allProducts.filter(
      (p) => p.name.toLowerCase().includes(val.toLowerCase()) || p.id == val
    );
  }
  return { val, filteredProducts, hasProducts: filteredProducts.length };
};

class Procucts {
  // show home page
  static showHome(req, res) {
    const allProducts = handle.readFromJson();
    const { val, filteredProducts, hasProducts } = search(req, allProducts);
    res.render("home", {
      pageTitle: "Home",
      filteredProducts,
      val,
      hasProducts,
    });
  }

  // add new product
  static add(req, res) {
    res.render("add", { pageTitle: "Add" });
  }

  // handle logic of add a new product
  static addLogic(req, res) {
    const allProducts = handle.readFromJson();
    const product = { id: Date.now(), ...req.body };
    product.active = +product.status;
    allProducts.push(product);
    handle.writeToJson(allProducts);
    res.redirect("/add");
  }

  // show single product
  static showSingle(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    res.render("show-single", {
      pageTitle: "show-single",
      productData: allProducts[idx],
    });
  }

  // show allproducts
  static showAll(req, res) {
    let allProducts = handle.readFromJson();
    const { val, filteredProducts } = search(req, allProducts);
    allProducts = val !== undefined ? filteredProducts : allProducts;
    const renderObj = {
      pageTitle: "All products",
      allProducts,
      hasProducts: allProducts.length,
    };

    res.render("show-all", renderObj);
  }

  // show active products
  static showActive(req, res) {
    let activeProducts = handle.readFromJson().filter((p) => p.active);
    const { val, filteredProducts } = search(req, activeProducts);
    activeProducts = val ? filteredProducts : activeProducts;
    res.render("active", {
      pageTitle: "active - products",
      activeProducts,
      hasProducts: activeProducts.length,
    });
  }

  // show inactive products
  static showInactive(req, res) {
    let inactiveProducts = handle.readFromJson().filter((p) => !p.active);
    const { val, filteredProducts } = search(req, inactiveProducts);
    inactiveProducts = val ? filteredProducts : inactiveProducts;
    res.render("inactive", {
      pageTitle: "inactive - products",
      inactiveProducts,
      hasProducts: inactiveProducts.length,
    });
  }

  // edit a product
  static edit(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    res.render("edit", { pageTitle: "edit", productData: allProducts[idx] });
  }

  // handle logic of edit a product
  static editLogic(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    allProducts[idx] = { id, ...req.body };
    allProducts[idx].active = +allProducts[idx].status;
    handle.writeToJson(allProducts);
    res.redirect(`/show/${id}`);
  }

  // delete a product
  static delete(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    allProducts.splice(idx, 1);
    handle.writeToJson(allProducts);
    res.redirect("/show-all");
  }

  // activate a product
  static activate(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    allProducts[idx].status = "1";
    allProducts[idx].active = 1;
    handle.writeToJson(allProducts);
    res.redirect(`/show/${id}`);
  }

  // deactivate a product
  static deactivate(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    allProducts[idx].status = "0";
    allProducts[idx].active = 0;
    handle.writeToJson(allProducts);
    res.redirect(`/show/${id}`);
  }

  // show page error
  static error(req, res) {
    res.render("error");
  }
}

module.exports = Procucts;
