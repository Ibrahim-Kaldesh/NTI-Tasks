const router = require("express").Router();
const Procucts = require("../product-controllers/product.controllers");

// route to go to home page
router.get("/", Procucts.showHome);

// route to go to add page
router.get("/add", Procucts.add);
// route to get data for the added product
router.post("/add", Procucts.addLogic);

// route to go to show single product page
router.get("/show/:productID", Procucts.showSingle);

// route to go to show all products
router.get("/show-all", Procucts.showAll);
// route to go to show active products page
router.get("/active", Procucts.showActive);
// route to go to show active products page
router.get("/inactive", Procucts.showInactive);

// route to go atcivate a product
router.get("/activate/:productID", Procucts.activate);
// route to go deatcivate a product
router.get("/deactivate/:productID", Procucts.deactivate);

// route to go to edit page
router.get("/edit/:productID", Procucts.edit);
// route to go to handle logic of edit page
router.post("/edit/:productID", Procucts.editLogic);

// route to go to delete page
router.get("/delete/:productID", Procucts.delete);

router.get("*", Procucts.error);

module.exports = router;
