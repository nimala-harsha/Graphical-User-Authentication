import Auth from '../models/auth.js'
import jwt from 'jsonwebtoken'
import { sendMails } from './mailController.js';
import { pwResetEmail } from '../mailTemplate/pwdReset.js';
let refreshtokens = [];
const pwResetTokenList = {}

export const UserRegister = async (req, res) => {
    console.log(req.body)
    try {
        const userExist = await Auth.findOne({ email: req.body.email })
        if (userExist) {
            res.status(400).json({
                message: "user Already exist..!"
            })
        } else if (!userExist) {
            const newAcct = new Auth({
                fullName: req.body.fullName,
                email: req.body.email,
                hashPass: req.body.hashPass,
                colorPass: req.body.colorPass,
                imagePass: req.body.imagePass

            })
            const createdAcc = await newAcct.save();
            if (createdAcc) {
                res.status(201).json({
                    message: 'account created..!',
                    payload: createdAcc
                })
            } else if (!createdAcc) {
                res.status(404).json({
                    message: 'account creating failed..!'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'somthing went wrong.!',
            error: error
        })
    }
}

export const Login = async (req, res) => {
    try {
        const registeredUser = await Auth.findOne({ email: req.body.email })
        if (registeredUser) {
            const enteredPass = req.body.hashPass;
            const dbPass = registeredUser.hashPass;
            const colorPass = req.body.colorPass;
            const dbColorPass = registeredUser.colorPass;
            const imagePass = req.body.imagePass;
            const dbImagePass = registeredUser.imagePass;

            if (enteredPass === dbPass && colorPass === dbColorPass && imagePass === dbImagePass) {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' })
                const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' })
                refreshtokens.push(refreshToken);
                res.status(200).json({
                    message: 'login successfull',
                    token,
                    refreshToken,
                    payload: registeredUser
                })
            } else {
                res.status(404).json({
                    message: 'password incorrect'
                })
            }
        } else if (!registeredUser) {
            res.status(401).json({
                message: 'user not found..!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!',
            error: error
        })
    }
}

export const tokenRefresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        res.status(401).json({
            message: "Unauthorized..!"
        })
    } else if (!refreshtokens.includes(refreshToken)) {
        res.status(403).json({
            message: "Forbidden..!"
        })
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    message: "Forbidden..!"
                })
            } else {
                const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });
                res.status(201).json({
                    message: "Session Extended..!",
                    token
                })
            }
        })
    }
}

export const getUser = async (req, res) => {
    console.log(req.body)
    try {
        const registeredUser = await Auth.findOne({ email: req.body.email })
        if (registeredUser) {
            res.status(201).json({
                message: 'Success..!',
                payload: registeredUser
            })
        } else if (!registeredUser) {
            res.status(400).json({
                message: 'error'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong..!'
        })
    }
}


const generateOTP = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
}


export const pwdResetRequest = async (req, res) => {
    try {
        const checkUser = await Auth.findOne({ email: req.body.email })
        if (checkUser) {
            const pwResetToken = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h' })
            const OTP = generateOTP()
            pwResetTokenList[pwResetToken] = {
                pwResetToken: pwResetToken,
                email: req.body.email,
                otp: OTP
            }
            const link = `http://localhost:3000/pwdReset1/${pwResetToken}`
            const mailData = {
                to: req.body.email,
                subject: "Password Reset Request",
                html: pwResetEmail(link, req.body.email, OTP),
                attachments: [],
                body: ``
            }
            sendMails(mailData)
            res.status(201).json({
                message: 'Password Reset Email Sent'
            })
        } else if (!checkUser) {
            res.status(404).json({
                message: "No User Account found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'somthing went wrong..!'
        })
    }
}


export const pwdReset = async (req, res) => {
    try {
        if (toString(pwResetTokenList[req.body.token].otp) === toString(req.body.otp)) {
            try {
                const user = jwt.verify(req.body.token, process.env.JWT_TOKEN_KEY)
                if (pwResetTokenList[req.body.token].email === user.email) {
                    const checkUser = await Auth.findOne({ email: user.email })
                    if (checkUser) {
                        const email = req.body.email
                        const newUser = {
                            hashPass: req.body.hashPass,
                            colorPass: req.body.colorPass,
                            imagePass: req.body.imagePass
                        }
                        const updateUser = await Auth.findOneAndUpdate(email, newUser, { new: true })
                        if (updateUser) {
                            delete pwResetTokenList[req.body.token]
                            res.status(201).json({
                                message: 'Password Reset Success'
                            })
                        } else {
                            res.status(401).json({
                                message: "something went wrong"
                            })
                        }
                    } else {
                        res.status(403).json({
                            message: "No User Account found"
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'Email cannot be verified'
                    })
                }
            } catch (error) {
                res.status(400).json({
                    message: "This link is expired"
                })
            }
        } else {
            delete pwResetTokenList[data.token]
            res.status(402).json({
                message: 'Invalid OTP'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'somthing went wrong..!'
        })
    }
}
