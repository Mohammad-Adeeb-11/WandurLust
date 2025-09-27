const express = require("express");
const router = express.Router();
const{ listingSchema } = require("../schema.js");
const ExpressError = require("../Utils/ExpressErrors.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controller/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index)) //index Route
    .post(
        isLoggedIn, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.createListing)
    ); //Create Rouute

//New Route
router.get("/new",
    isLoggedIn ,
    listingController.renderNewForm
);

router.route("/:id")
    .get(
        wrapAsync(listingController.showListing)
    )//Show Route
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        validateListing, 
        wrapAsync(listingController.updateListing)
    )//Update Route
    .delete(
        isLoggedIn,isOwner, 
        wrapAsync(listingController.destroyListing)
    );//Delete Route



//Edit Route
router.get("/:id/edit",
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;