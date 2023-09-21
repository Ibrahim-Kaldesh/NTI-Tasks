const router = require("express").Router();
const Procucts = require("../product-controllers/product.controllers");

// route to go to home page
router.get("/", Procucts.showHome);

// route to go to add page
router.get("/add", Procucts.add);
// route to get data for the added product
router.post("/add", Procucts.addLogic);

// route to go to show single product page
router.get("/show/:procuctID", Procucts.showSingle);

// route to go to show all products
router.get("/show-all", Procucts.showAll);
// route to go to show active products page
router.get("/active", Procucts.showActive);
// route to go to show active products page
router.get("/inactive", Procucts.showInactive);

// route to go atcivate a product
router.get("/activate/:procuctID", Procucts.activate);
// route to go deatcivate a product
router.get("/deactivate/:procuctID", Procucts.deactivate);

// route to go to edit page
router.get("/edit/:procuctID", Procucts.edit);
// route to go to handle logic of edit page
router.post("/edit/:procuctID", Procucts.editLogic);

// route to go to delete page
router.get("/delete/:procuctID", Procucts.delete);

// search by parcode or by product name
router.get("/", Procucts.showHome);

router.get("*", Procucts.error);

module.exports = router;
