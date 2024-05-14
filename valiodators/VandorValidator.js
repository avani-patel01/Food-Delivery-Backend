import { check } from "express-validator";
import { VandorModel } from "../models/VandorModel.js";
import validator from "./base/index.js";
import bcrypt from "bcrypt";

export const VandorValidator = [
  check("name").not().isEmpty().withMessage("User name can not be empty!"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (value) => {
      const vandor = await VandorModel.findOne({ email: value });
      if (vandor) {
        throw new Error("This Email is already registered");
      }
    }),
  check("pincode")
    .not()
    .isEmpty()
    .withMessage("Pin code cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Enter a numeric pincode")
    .bail()
    .bail()
    .isLength({ min: 6 })
    .withMessage("At least 6 digits are required")
    .bail()
    .isLength({ max: 6 })
    .withMessage("Pin code must be 6 number long"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum password length is 8")
    .bail()
    .isLength({ max: 8 })
    .withMessage("Maximum password length is 8"),
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone Number Can't Be Empty!")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be in number"),
  check("ownerName")
    .not()
    .isEmpty()
    .withMessage("Owner Name Field Is Required!"),
  check("serviceavailable").default(false),
  (req, res, next) => {
    validator(req, res, next);
  },
];

export const VandorLoginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (value, { req }) => {
      const Vandor = await VandorModel.findOne({ email: value });
      if (!Vandor.email) {
        throw new Error("This email is not registered");
      }
      req.Vandor = Vandor;
    }),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum password length is 8")
    .bail()
    .isLength({ max: 8 })
    .withMessage("Maximum password length is 8")
    .bail()
    .custom(async (value, { req }) => {
      const Vandor = req.Vandor;
      if (!Vandor) {
        throw new Error("User Not Found!");
      }
      const comparePassword = await bcrypt.compare(value, Vandor.password);
      if (!comparePassword) {
        throw new Error("Invalid Email or Password!");
      }
    }),
  (req, res, next) => {
    validator(req, res, next);
  },
];

export const VandorProfileValidator = [
  check("name").not().isEmpty().withMessage("User name can not be empty!"),
  check("pincode")
    .not()
    .isEmpty()
    .withMessage("Pin code cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Enter a numeric pincode")
    .bail()
    .isLength({ min: 6 })
    .withMessage("At least 6 digits are required")
    .bail()
    .isLength({ max: 6 })
    .withMessage("Pin code must be 6 number long"),
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone Number Can't Be Empty!")
    .bail()
    .isNumeric()
    .withMessage("Phone number must be in number"),
 
  (req, res, next) => {
    validator(req, res, next);
  },
]
