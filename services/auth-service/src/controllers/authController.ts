import { Request, Response } from "express";
import { User } from "../models/User.js";
import { hashPassowrd } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { sendOTP } from "../config/nodemailer.js";
import { checkOtpCorrect, otpData } from "../utils/otp.js";
import { comparePassword } from "../utils/checkPassword.js";
import cloudinary from "../config/cloudinary.js";
import lodash from "lodash";

//controller for checking email
export const checkEmailController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { email } = (request.body as { email: string }) || {};

    if (!email) {
      response
        .status(400)
        .json({ success: false, error: "Email must be provided" });
      return;
    }

    //check email already exist
    const checkEmail = await User.findOne(
      { email: email },
      { _id: 0, email: 1 },
    );

    if (checkEmail) {
      response
        .status(400)
        .json({ success: false, error: "Email is already in use" });
      return;
    }

    response.status(200).json({ success: true, message: "Email is not exist" });
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.log(`checkEmailController error ${error}`);
  }
};

//controller for signing
export const signController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  try {
    const { fullname, email, password } =
      (request.body as { fullname: string; email: string; password: string }) ||
      {};

    if (!fullname || !email || !password) {
      response.status(400).json({
        success: false,
        error: "Fullname , email and password are required",
      });
      return;
    }

    //checking email exits
    const checkEmail = await User.findOne(
      { email: email },
      { _id: 0, email: 1 },
    );

    if (checkEmail) {
      response
        .status(400)
        .json({ success: false, error: "Email is already in use" });
      return;
    }

    if (password.length < 6) {
      response
        .status(400)
        .json({ success: false, error: "Password must be 6 letters or above" });
      return;
    }

    //hashing password
    const hashedPassword = await hashPassowrd(password.trim());

    const newUser = await User.create({
      fullname: fullname.trim(),
      email: email.trim(),
      password: hashedPassword,
      authType: "Email",
    });

    //generate token
    await generateToken(newUser._id.toString(), newUser.fullname, response);

    response.status(201).json({ success: true, message: "Account created" });
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.debug(`sign controller error : ${error}`);
  }
};

//controller for sending OTP
export const sendotpController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  try {
    const { email } = (request.body as { email: string }) || {};

    if (email) {
      const otp: number = Math.round(1000 + Math.random() * 9999);
      const expireDate: number = Date.now() + 5 * 60 * 1000;

      //send otp
      await sendOTP(otp.toString(), email.trim());

      otpData.otp = otp;
      otpData.expireDate = expireDate;

      response.status(200).json({ success: true, message: "OTP sent" });
    } else {
      response
        .status(400)
        .json({ success: false, error: "Email must be provided" });
    }
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.log(`sendotpController error : ${error}`);
  }
};

//controller for checking OTP
export const checkOtpController = async (
  request: Request,
  response: Response,
): Promise<void> => {
  try {
    const { otp } = (request.params as { otp: string }) || {};

    if (otp) {
      const checkOtp: boolean = checkOtpCorrect(parseInt(otp)); //checking otp is correct

      if (checkOtp) {
        response.status(200).json({ success: true, message: "OTP is correct" });
      } else {
        response.status(400).json({ success: false, error: "OTP is invalid" });
      }
    }
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.log(`checkOtpController error : ${error}`);
  }
};

//controller for google sign
export const googleSignController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { fullname, email, profilePic } =
      (request.body as {
        fullname: string;
        email: string;
        profilePic: string;
      }) || {};

    if (!fullname || !email || !profilePic) {
      response.status(400).json({
        success: false,
        error: "Fullname , Email and profilePic are required",
      });
      return;
    }

    //check email exists
    const checkEmail = await User.findOne(
      { email: email },
      { _id: 0, email: 1 },
    );

    if (checkEmail) {
      response
        .status(400)
        .json({ success: false, error: "Email already in use" });
      return;
    }

    //uploading image to cloudinary
    const image = await cloudinary.uploader.upload(profilePic)

    if (!image) {
      response
        .status(400)
        .json({ success: false, error: "Image upload failed" });
      return;
    }

    const newUser = await User.create({
      fullname: fullname.trim(),
      email: email.trim(),
      profilePic: {
        url: image.secure_url,
        publicId: image.public_id,
      },
      authType: "Google",
    });

    await generateToken(newUser._id.toString(), newUser.fullname, response);
    response.status(201).json({ success: true, message: "Account Created" });
  } catch (error) {
    console.log(`googleSignController error : ${error}`);
    response.status(500).json({ success: false, error: "Server error" });
  }
};

//controller for login
export const loginController = async (request: Request, response: Response) => {
  try {
    const { email, password } =
      (request.body as { email: string; password: string }) || {};

    if (!email || !password) {
      response
        .status(400)
        .json({ success: false, error: "Email and password are required" });
      return;
    }

    //check user exists
    const user = await User.findOne(
      { email: email, authType: "Email" },
      { fullname: 1, email: 1, password: 1 },
    );

    if (!user) {
      response.status(400).json({ success: false, error: "User not found" });
      return;
    }

    //compare password
    const isCorrect = await comparePassword(password, user.password as string);

    if (!isCorrect) {
      response
        .status(400)
        .json({ success: false, error: "Password is incorrect" });
      return;
    }

    await generateToken(user._id.toString(), user.fullname, response);

    response.status(200).json({ success: true, message: "Login success" });
  } catch (error) {
    console.log(`loginController error : ${error}`);
    response.status(500).json({ success: false, error: "Server error" });
  }
};

//controller for google login
export const googleLoginController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { email } = (request.body as { email: string }) || {};

    if (!email) {
      response.status(400).json({ success: false, error: "Email is required" });
      return;
    }

    const user = await User.findOne(
      { email: email, authType: "Google" },
      { fullname: 1 },
    );

    if (!user) {
      response.status(400).json({ success: false, error: "User not found" });
    }

    await generateToken(
      user?._id.toString() as string,
      user?.fullname as string,
      response,
    );

    response.status(200).json({ success: true, message: "Login success" });
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.log(`googleLoginController error : ${error}`);
  }
};

//controller for logouting
export const logoutController = async (request: Request, response: Response) => {

  try {

    response.clearCookie("authToken").status(200).json({ success: true, message: "Successfully logout" })

  } catch (error) {
    console.log(`logoutController error : ${error}`)
    response.status(500).json({ success: false, error: "Server error" })
  }

}

//controller for getting user
export const getUserController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { userId } = request.params;

    if (!userId) {
      response
        .status(400)
        .json({ success: false, error: "User id must be provided" });
      return;
    }

    const user = await User.findOne(
      { _id: userId },
      { email : 0 , password : 0 , __v : 0 , authType : 0},
    );

    response.status(200).json({ success: true, user: user });
    return;
  } catch (error) {
    throw new Error(`getUserController error : ${error}`);
  }
};

//controller for getting authenticated user
export const getAuthUserController = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = lodash.get(request, "userDetails.id");

    if (!userId) {
      response
        .status(400)
        .json({ success: false, error: "User details is missing" });
      return;
    }

    const user = await User.findById(userId, { password: 0 , __v : 0});

    if (!user) {
      response.status(404).json({ success: false, error: "User not found" });
      return;
    }

    response.status(200).json({ success: true, user: user });
  } catch (error) {
    response.status(500).json({ success: false, error: "Server error" });
    console.log(`getUserController error : ${error}`);
  }
};

//controller for updating user data
export const updateUserDataController = async (
  request: Request,
  response: Response,
) => {
  try {
    const {
      fullname,
      bio,
      profilePic,
    }: {
      fullname: string;
      bio: string;
      profilePic: { url: string; publicId: string };
    } = request.body || {};

    const userId = lodash.get(request, "userDetails.id");

    if (!userId) {
      response
        .status(400)
        .json({ success: false, error: "User details is missing" });
      return;
    }

    if (!fullname) {
      response
        .status(400)
        .json({ success: false, error: "Fullname is required" });
      return;
    }

    let imageData: { image: string | null; publicId: string } = {
      image: null,
      publicId: profilePic.publicId || "",
    };
    console.log(request.body)

    if (!profilePic?.url.includes("cloudinary") && profilePic?.url) {
    
      const result = await cloudinary.uploader.upload(profilePic.url, {
        resource_type: "image",
        public_id: profilePic?.publicId,
        overwrite: true,
        invalidate: true,
      })

      imageData.image = result.secure_url
      imageData.publicId = result.public_id

    }

    if (imageData.image && imageData.publicId) {
      const updatedUser = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          fullname: fullname,
          bio: bio || "",
          profilePic: {
            url: imageData.image,
            publicId: imageData.publicId,
          },
        },
        {
          new: true,
          fields: { password: 0, __v: 0 }
        },
      );

      response.status(200).json({
        success: true,
        message: "User data are updated",
        updatedUser: updatedUser,
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { fullname: fullname, bio: bio || "" },
        {
          new: true,
          fields: { password: 0, __v: 0 }
        },
      );

      response.status(200).json({
        success: true,
        message: "User data are updated",
        updatedUser: updatedUser,
      });
    }
  } catch (error) {
    console.log(`updateUserDataController error : ${error}`);
    response.status(500).json({ success: false, error: "Server error" });
  }
};

//controller for changing password
export const changePasswordController = async (
  request: Request,
  response: Response,
) => {
  try {
    const userId = lodash.get(request, "userDetails.id");
    const { currentPassword, newPassword } = request.body || {};

    if (!userId) {
      response
        .status(400)
        .json({ success: false, error: "User details is missing" });
      return;
    }

    if (!currentPassword || !newPassword) {
      response
        .status(400)
        .json({
          success: false,
          error: "Current password and new password are must be provided",
        });
      return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      response.status(404).json({ success: false, error: "User is not found" });
      return;
    }

    const isPasswordCorrect = await comparePassword(
      currentPassword,
      user?.password as string,
    );

    if (!isPasswordCorrect) {
      response
        .status(400)
        .json({ success: false, error: "Password is incorrect" });
      return;
    }

    if (newPassword.length < 6) {
      response
        .status(400)
        .json({
          success: false,
          error: "Password must be atleast 6 letters or above",
        });
      return;
    }

    const hashedPassword = await hashPassowrd(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword },
      { new: true, fields: { password: 0, __v: 0 } },
    );

    response
      .status(200)
      .json({ success: true, message: "Password is updated", updatedUser: updatedUser });
  } catch (error) {
    console.log(`changePasswordController error : ${error}`);
    response.status(500).json({ success: false, error: "Server error" });
  }
};