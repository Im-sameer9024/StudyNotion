import Category from "../models/Category.js";

//create Tag
const createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;

    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //create entry in DB

    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: CategoryDetails,
    });
  } catch (error) {
    console.log("error occur in createTag controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all tags
const showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log("error in allTag controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPage details

const categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;

    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("course")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    //get course for different category
    const otherCategories = await Category.find({
      _id: {
        $ne: categoryId,
      },
    });

    //get top selling course
    const topSellingCourses = await Course.find()
      .sort({ studentEnrolled: -1 })
      .limit(4);

    return res.status(200).json({
      success: true,
      message: "Category page details fetched successfully",
      data: {
        selectedCategory,
        otherCategories,
        topSellingCourses,
      },
    });
  } catch (error) {

    console.log("error in categoryPageDetails controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
  
};

export { showAllCategories, createCategory,categoryPageDetails };
