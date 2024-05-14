import { check } from "express-validator";
import validator from "./base/index.js";
import { CustomerModel } from "../models/CustomerModel.js";
import bcrypt from "bcrypt";

export const CustomerValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (value) => {
      const vandor = await CustomerModel.findOne({ email: value });
      if (vandor) {
        throw new Error("This Email is already registered");
      }
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
    .withMessage("Maximum password length is 8"),
  (req, res, next) => {
    validator(req, res, next);
  },
];

export const CustomerLoginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(async (value, { req }) => {
      const customer = await CustomerModel.findOne({ email: value });
      if (!customer.email) {
        throw new Error("This email is not registered");
      }
      req.customer = customer;
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
      const customer = req.customer;
      if (!customer) {
        throw new Error("User Not Found!");
      }
      const comparePassword = await bcrypt.compare(value, customer.password);
      if (!comparePassword) {
        throw new Error("Invalid Email or Password!");
      }
    }),
  (req, res, next) => {
    validator(req, res, next);
  },
];