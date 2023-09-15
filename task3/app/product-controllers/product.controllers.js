const handle = require("../helper/dealWithJson");

class Procucts {
  // show home page
  static showHome(req, res) {
    const val = req.query.search;
    if (val) {
      const allProducts = handle.readFromJson();
      let filteredProducts = allProducts.filter((pro) =>
        pro.name.includes(val)
      );

      if (!filteredProducts.length) {
        filteredProducts = allProducts.filter((pro) => {
          console.log(pro.id, val);
          pro.id == val;
        });
      }
      res.render("home", {
        pageTitle: "Home",
        filteredProducts,
        hasProducts: filteredProducts.length,
        val,
      });
      res.render("home", { val });
    }
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
    res.redirect("/show-all");
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
    const allProducts = handle.readFromJson();
    res.render("show-all", {
      pageTitle: "All products",
      allProducts,
      hasProducts: allProducts.length,
    });
  }

  // show active products
  static showActive(req, res) {
    const activeProducts = handle.readFromJson().filter((p) => p.active);
    res.render("active", {
      pageTitle: "active - products",
      activeProducts,
      hasProducts: activeProducts.length,
    });
  }

  // show inactive products
  static showInactive(req, res) {
    const inactiveProducts = handle.readFromJson().filter((p) => !p.active);
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
    res.redirect("/show-all");
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
    res.redirect("/active");
  }

  // deactivate a product
  static deactivate(req, res) {
    const allProducts = handle.readFromJson();
    const id = req.params.procuctID;
    const idx = allProducts.findIndex((p) => p.id == id);
    allProducts[idx].status = "0";
    allProducts[idx].active = 0;
    handle.writeToJson(allProducts);
    res.redirect("/inactive");
  }

  // show page error
  static error(req, res) {}
}

module.exports = Procucts;
