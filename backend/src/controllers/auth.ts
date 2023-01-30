import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { dbCred }  from "../config/keys";
import { errorHandler } from "../utils/errorHandler";
import { statusMessage } from "../utils/statusMessage";

export const auth = {
    login: async function (req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email) { statusMessage.badRequest(res, 'email is required') }
        if (!password) { statusMessage.badRequest(res, 'password is required') }

        const foundUser = await User.findOne( {email});

        if (foundUser) {
            const passwordResult = await bcrypt.compare(password, foundUser.password)
            if (passwordResult) {
                const payload = {
                    userId: foundUser._id,
                    email: foundUser.email,
                }
                const token = jwt.sign(payload, dbCred.jwt, { expiresIn: 60 * 60 });

                res.status(200).json({ token })

            } else {
                res.status(401).json({
                    message: 'Password incorrect'
                })
            }
        } else {
            statusMessage.notFound(res, 'User not found')
        }
    },
    register: async function (req: Request, res: Response) {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (!email) {
            statusMessage.badRequest(res, 'email is required')
        }
        if (!password) {
            statusMessage.badRequest(res, 'password is required')
        }
        if (!firstName) {
            statusMessage.badRequest(res, 'firstName is required')
        }
        if (!lastName) {
            statusMessage.badRequest(res, 'lastName is required')
        }

        if (password !== confirmPassword) {
            res.status(400).json({
                message: 'Password and Confirm Password should match'
            });
        }

        const foundUser = await User.findOne({email});

        if (foundUser) {
            res.status(409).json({
                message: 'This user already exist'
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            });

            try {
                await user.save();
                res.status(201).json(user);
            } catch (e: any) {
                errorHandler(res, e);
            }
        }
    }
};