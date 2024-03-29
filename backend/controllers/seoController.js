const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const seoModel = require("../models/seoModel");
const blogPostModel = require("../models/blogPostModel");

//------------------get all seo

exports.getAllSeo = catchAsyncError(async (req, res, next) => {
  try {
    const seo = await seoModel.find();
    const seoReverse = seo.reverse();
    res.status(200).json({
      success: true,
      seo: seoReverse,
    });
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
