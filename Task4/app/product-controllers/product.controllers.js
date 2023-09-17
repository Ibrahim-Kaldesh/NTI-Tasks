const Product = require("../DB/models/product.models");

const search = async function (req, status = "") {
  const val = req.query.search;
  let filteredProducts = [];
  if (val) {
    // search by name
    try {
      switch (status) {
        case "":
          filteredProducts = await Product.find({ name: new RegExp(val, "i") });
          break;
        case "a":
          filteredProducts = await Product.find({
            name: new RegExp(val, "i"),
            status: true,
          });
          break;
        case "i":
          filteredProducts = await Product.find({
            name: new RegExp(val, "i"),
            status: false,
          });
          break;
      }
      // search by parcode
      if (!filteredProducts.length) {
        switch (status) {
          case "":
            filteredProducts = await Product.find({ _id: val });
            break;
          case "a":
            filteredProducts = await Product.find({ _id: val, status: true });
            break;
          case "i":
            filteredProducts = await Product.find({ _id: val, status: false });
            break;
        }
      }
    } catch (e) {
      throw e;
    }
  }
  return { val, filteredProducts, hasProducts: filteredProducts.length };
};

class Procucts {
  // show home page
  static async showHome(req, res) {
    try {
      const { val, filteredProducts, hasProducts } = await search(req);
      res.render("home", {
        pageTitle: "Home",
        filteredProducts,
        val,
        hasProducts,
      });
    } catch (e) {
      res.send(e.errors);
    }
  }
  // add new product
  static add(req, res) {
    res.render("add", { pageTitle: "Add" });
  }

  // handle logic of add a new product
  static async addLogic(req, res) {
    try {
      await new Product(req.body).save();
      res.redirect("/add");
    } catch (e) {
      res.render("add", {
        errors: e.errors,
        pageTtile: "add-Error",
        productData: req.body,
      });
    }
  }
  // show single product
  static async showSingle(req, res) {
    try {
      const pro = await Product.findById(req.params.productID);
      res.render("show-single", {
        pageTitle: "show-single",
        productData: pro,
      });
    } catch (e) {
      res.send(e.errors);
    }
  }
  // show allproducts
  static async showAll(req, res) {
    try {
      let allProducts = await Product.find();
      const { val, filteredProducts } = await search(req);
      allProducts = val !== undefined ? filteredProducts : allProducts;
      const renderObj = {
        pageTitle: "All products",
        allProducts,
        hasProducts: allProducts.length,
      };
      res.render("show-all", renderObj);
    } catch (e) {
      res.send(e.errors);
    }
  }

  // show active products
  static async showActive(req, res) {
    try {
      let activeProducts = await Product.find({ status: true });
      const { val, filteredProducts } = search(req, "a");
      activeProducts = val ? filteredProducts : activeProducts;
      res.render("active", {
        pageTitle: "active - products",
        activeProducts,
        hasProducts: activeProducts.length,
      });
    } catch (e) {
      res.send(e);
    }
  }

  // show active products
  static async showInactive(req, res) {
    try {
      let inActiveProducts = await Product.find({ status: false });
      const { val, filteredProducts } = await search(req, "i");
      inActiveProducts = val ? filteredProducts : inActiveProducts;
      res.render("inactive", {
        pageTitle: "inactive - products",
        inActiveProducts,
        hasProducts: inActiveProducts.length,
      });
    } catch (e) {
      res.send(e);
    }
  }

  // edit a product
  static async edit(req, res) {
    try {
      res.render("edit", {
        pageTitle: "edit",
        productData: await Product.findById(req.params.productID),
      });
    } catch (e) {
      res.send(e);
    }
  }

  // handle logic of edit a product
  static async editLogic(req, res) {
    const data = req.body;
    try {
      await Product.findByIdAndUpdate(req.params.productID, req.body);
      res.redirect(`/show/${req.params.productID}`);
    } catch (e) {
      res.send(e);
      // res.render("edit", {
      //   errors: e.errors,
      //   pageTtile: "edit-Error",
      //   productData: req.body,
      // });
    }
  }

  // delete a product
  static async delete(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.productID);
      res.redirect("/show-all");
    } catch (e) {
      res.send(e.errors);
    }
  }

  // activate a product
  static async activate(req, res) {
    try {
      await Product.findByIdAndUpdate(req.params.productID, { status: true });
      res.redirect(`/show/${req.params.productID}`);
    } catch (e) {
      res.send(e.errors);
    }
  }

  // deactivate a product
  static async deactivate(req, res) {
    try {
      await Product.findByIdAndUpdate(req.params.productID, { status: false });
      res.redirect(`/show/${req.params.productID}`);
    } catch (e) {
      res.send(e.errors);
    }
  }

  // show page error
  static error(req, res) {
    res.render("error");
  }
}

module.exports = Procucts;
