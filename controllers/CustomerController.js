import { JWT_SECRET } from "../config/index.js";
import { CustomerModel } from "../models/CustomerModel.js";
import { FoodModel } from "../models/FoodModel.js";
import { generateOTP, onRequestOTP } from "../utils/notification.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OrderModel } from "../models/OrderModel.js";

export const CustomerSignup = async (req, res) => {
  const { email, password, phone, firstName, lastName, address } = req.body;
  try {
    const { otp, expiry } = generateOTP();

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const customer = await CustomerModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      address,
      phone,
      verified: false,
      otp,
      otp_expiry: expiry,
      lat: 0,
      lng: 0,
    });

    if (customer) {
      await onRequestOTP(otp, phone);
      const token = jwt.sign(
        {
          id: customer._id,
          email: customer.email,
          verified: customer.verified,
        },
        JWT_SECRET,
        { expiresIn: "100d" }
      );
      res.status(201).json({ token, verified: customer.verified, email });
    }
    res.status(400).json({ message: "error with signup" });
  } catch (error) {
    res.status(500).json("Error to create customer");
  }
};

export const CustomerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await CustomerModel.findOne({ email });

    // Generate Token
    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        verified: customer.verified,
      },
      JWT_SECRET,
      { expiresIn: "100d" }
    );
    res.status(200).json({ token, verified: customer.verified, email });
  } catch (error) {
    res.status(500).json("Error to login customer");
  }
};

export const CustomerVerify = async (req, res) => {
  try {
    const { otp } = req.body;
    const customer = req.Vandor;
    if (customer) {
      const profile = await CustomerModel.findById(customer.id);
      if (
        profile &&
        profile.otp === parseInt(otp) &&
        profile.otp_expiry >= new Date()
      ) {
        profile.verified = true;
        await profile.save();

        res
          .status(201)
          .json({ verified: profile.verified, email: profile.email });
      } else {
        res.status(400).json({ message: "error with OTP Validation" });
      }
    }
  } catch (error) {
    res.status(500).json("Error to verifie otp");
  }
};

export const RequestOTP = async (req, res) => {
  try {
    const customer = req.Vandor;
    if (customer) {
      const profile = await CustomerModel.findById(customer.id);
      if (profile) {
        const { otp, expiry } = generateOTP();
        profile.otp = otp;
        profile.otp_expiry = expiry;
        await profile.save();

        await onRequestOTP(otp, profile.phone);

        res
          .status(200)
          .json({ message: "OTP sent your registerd phone number" });
      }
    } else {
      res.status(400).json("Customer not found");
    }
  } catch (error) {
    res.status(500).json("Error to create customer");
  }
};

export const CustomerProfile = async (req, res) => {
  try {
    const customer = req.Vandor;

    const profile = await CustomerModel.findById(customer.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json("Error to get profile");
  }
};

export const EditCustomerProfile = async (req, res) => {
  try {
    const customer = req.Vandor;
    const { firstName, address } = req.body;
    const profile = await CustomerModel.findById(customer.id);
    if (profile) {
      profile.firstName = firstName;
      profile.address = address;
      await profile.save();
      res.status(200).json(profile);
    } else {
      res.status(400).send("The user is not found");
    }
  } catch (error) {
    res.status(500).json("Error to get profile");
  }
};

// Cart
export const AddToCart = async (req, res) => {
  try {
    const customer = req.Vandor;
    const profile = await CustomerModel.findById(customer.id)

    res.status(200).json("Error to verifie otp");
  } catch (error) {
    res.status(500).json("Error to verifie otp");
  }
};

export const GetCart = async (req, res) => {
  try {
    res.status(200).json("Error to verifie otp");
  } catch (error) {
    res.status(500).json("Error to verifie otp");
  }
};

export const DeleteCart = async (req, res) => {
  try {
    res.status(200).json("Error to verifie otp");
  } catch (error) {
    res.status(500).json("Error to verifie otp");
  }
};

// Order
export const CreateOrder = async (req, res) => {
  try {
    const customer = req.Vandor;

    const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;
    const profile = await CustomerModel.findById(customer.id);
    const cart = req.body; //[{id:xx,unit:xx}]
    let cartItems = Array();
    let netAmount = 0.0;
    const foods = await FoodModel.find({
      _id: { $in: cart.map((item) => item._id) },
    });
    foods.map((food) => {
      cart.forEach((item) => {
        if (food._id.toString() == item?._id) {
          netAmount += food.price * item?.unit;
          cartItems.push({ food: food, unit: item?.unit });
        }
      });
    });

    if (cartItems) {
      const currentOrder = await OrderModel.create({
        orderID: orderId,
        items: cartItems,
        totalAmount: netAmount,
        orderDate: new Date(),
        paidThrough: "COD",
        paymentResponse: "",
        orderStatus: "Waiting",
      });
      if (currentOrder) {
        profile.orders.push(currentOrder);
        const profileResponse = await profile.save();
        return res.status(200).json(profileResponse.orders);
      }
    }
  } catch (error) {
    res.status(500).json("Error to create order");
  }
};

export const GetOrders = async (req, res) => {
  try {
    const customer = req.Vandor;
    const profile = await CustomerModel.findById(customer.id);
    res.status(200).json(profile.orders);
  } catch (error) {
    res.status(500).json("Error to get order");
  }
};

export const GetOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json("Error to find order");
  }
};
