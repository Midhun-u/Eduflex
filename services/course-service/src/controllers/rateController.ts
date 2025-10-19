import { Context } from "hono";
import { Rate } from "../models/Rate";
import { convertNumber } from "../utils/convertNumber";

//controller for adding rate
export const addRateController = async (context: Context) => {
  try {
    const {
      courseId,
      comment,
      rate,
    }: { courseId: string; comment: string; rate: number } =
      (await context.req.json()) || {};
    const userDetails = await context.get("userDetails");

    if (!userDetails) {
      context.status(400);
      return context.json({ success: false, error: "User details is missing" });
    }

    if (!courseId || !rate) {
      context.status(400);
      return context.json({ success: false, error: "All fields are required" });
    }

    const newRate = await Rate.create(
      {
        courseId: courseId,
        userId: userDetails.id,
        comment: comment || "",
        rate: convertNumber(rate),
      },
      { raw: true },
    );

    if (newRate) {
      context.status(201);
      return context.json({
        success: true,
        message: "Rated course",
        rateDetails: newRate,
      });
    }
  } catch (error) {
    throw new Error(`addRateController error : ${error}`);
  }
};

//controller for getting total ratings
export const getTotalRatingsController = async (context: Context) => {
  try {
    const courseId = context.req.param("courseId");

    if (!courseId) {
      context.status(400);
      return context.json({
        success: false,
        error: "Course id must be provided",
      });
    }

    const [totalRatingsCount = 0, totalRatingsSum = 0] = await Promise.all([
      Rate.count({
        where: {
          courseId: courseId,
        },
      }),
      Rate.sum("rate", {
        where: {
          courseId: courseId,
        },
      }),
    ]);

    const averageRatings = totalRatingsSum / totalRatingsCount || 0

    return context.json({
      success: true,
      totalRatings: totalRatingsCount,
      averageRatings: averageRatings,
    });
  } catch (error) {
    throw new Error(`getRatingsController error : ${error}`);
  }
};

//controller for getting user rate
export const getUserRateController = async (context: Context) => {
  try {
    const userDetails = context.get("userDetails");
    const courseId = context.req.param("courseId");

    if (!userDetails) {
      context.status(400);
      return context.json({ success: false, error: "User details is missing" });
    }

    if (!courseId) {
      context.status(400);
      return context.json({
        success: false,
        error: "Course id must be provided",
      });
    }

    const rate = await Rate.findOne({
      where: {
        courseId: courseId,
        userId: userDetails.id,
      },
      raw: true,
    });

    if (rate) {
      return context.json({ success: true, rate: rate });
    }

    return context.json({
      success: true,
      message: "User is not rated this course",
    });
  } catch (error) {
    throw new Error(`getUserRateController error : ${error}`);
  }
};

//controller for getting rate comments
export const getRateCommentsController = async (context: Context) => {
  try {
    const courseId = context.req.param("courseId");
    const { page = 1, limit = 10 } = context.req.query();
    const pageNumber = convertNumber(page);
    const limitNumber = convertNumber(limit);

    if (!courseId) {
      context.status(400);
      return context.json({
        success: false,
        error: "Course id must be provided",
      });
    }

    const { rows: rateComments, count: totalCount } =
      await Rate.findAndCountAll({
        where: {
          courseId: courseId,
        },
        order: [["createdAt", "DESC"]],
        offset: (pageNumber - 1) * limitNumber,
        limit: limitNumber,
      });

    return context.json({
      success: true,
      rateComments: rateComments,
      totalCount: totalCount,
    });
  } catch (error) {
    throw new Error(`getRatecommentsController error : ${error}`);
  }
};

// controller for removing rate
export const removeRateController = async (context : Context) => {
  
  try{
    
    const rateId = context.req.param("rateId") || {}
    
    if(!rateId){
      context.status(400)
      return context.json({success : false , error : "Rate id must be provided"})
    }
    
    await Rate.destroy({
      where : {
        id : rateId
      }
    })
    
    return context.json({success : true , message : "Rate removed"})
    
  }catch(error){
    throw new Error(`removeRateController error : ${error}`)
  }
  
}