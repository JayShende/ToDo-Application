import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { contentModel, userModel } from "../DB/dataBase";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../Middleware/userMiddleware";
import { Types } from "mongoose";

// import dotenv from "dotenv";
// dotenv.config();

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const schema = z.object({
        username: z.string().min(5).max(10),
        email: z.string().email(),
        password: z
            .string()
            .min(8)
            .max(20)
            .refine(
                function (password) {
                    return /[a-z]/.test(password);
                },
                {
                    message: "Password Must Contain atleast one Lowercase Letter",
                }
            )
            .refine(
                function (password) {
                    return /[A-Z]/.test(password);
                },
                {
                    message: "Password Must Contain At Least One Uppercase Letter",
                }
            )
            .refine(
                function (password) {
                    return /[0-9]/.test(password);
                },
                {
                    message: "Password Must Contain Atleast a Single Number",
                }
            )
            .refine(
                function (password) {
                    return /[\W_]/.test(password);
                },
                {
                    message: "Password Must Contain Atleast one Special Character",
                }
            ),
    });

    //   Parsing the Schema Body using Zod Safe Parse
    const result = schema.safeParse(req.body);

    //   if res=success then sign in else the credentials dont follow the Constraints
    if (result.success) {
        // we will Signin
        const hashedPwd = await bcrypt.hash(password, 5);

        // make an DB Entry with the Credentials
        try {
            await userModel.create({
                username: username,
                email: email,
                password: hashedPwd,
            });
            res.send({
                value:true,
                msg: "Signed in",
            });
            return;
        } catch (e) {
            res.send({
                value:false,
                message: "Username / Email Already Exists ",
            });
            return;
        }
    } else {
        res.send({
            value:false,
            message:result.error});
    }
});

userRouter.post("/login", async (req, res) => {
    const { input, password } = req.body;
    console.log("inside Login")
    // we will initally check weather the username/email provided exists in the data base or not
    const user = await userModel.findOne({
        $or: [{ username: input }, { email: input }],
    });
    console.log("h");
    if (user === null || user.password == null) {
        res.status(403).json({
            message: "Invalid Username/ Password Please Signup",
        });
        return;
    } else {
        const ans = await bcrypt.compare(password, user.password);
        console.log(user)
        if (ans) {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SECRET);
            res.send({
                token: token,
            });
            return;
        } else {
            res.status(403).json({
                message: "Invalid Password",
            });
            return;
        }
    }
});

userRouter.post("/content", userMiddleware, async (req, res) => {
    const { title, content } = req.body;
    // @ts-ignore
    const userId = req.userId;

    try {
        await contentModel.create({
            userId: userId,
            title: title,
            content: content,
            done:false
        });

        res.send({
            message: "Content Added Successfully",
        });
    } catch (err) {
        res.send({
            message: "Some Issue at the Content Model ",
        });
    }
});

userRouter.get("/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    const response = await contentModel.find({
        userId: userId,
    });

    res.send(response);
});

userRouter.put("/update", userMiddleware, async (req, res) => {
    // @ts-ignore
    var userId = req.userId;
    userId = new Types.ObjectId(userId);
    const { oldPassword, newPassword } = req.body;
    console.log(typeof(userId));

    // verify the old password
    const response = await userModel.findOne({
        _id: userId
    });
    console.log(response);

    if (response === null || response.password == null) {
        res.status(403).json({
            message: "Invalid userId",
        });
        return;
    } else {
        const match = await bcrypt.compare(oldPassword, response.password);
        // console.log(match);
        // console.log(oldPassword);
        // console.log(response.password);
        
        if (match) {
            const schema = z.object({
                newPassword: z
                    .string()
                    .min(8)
                    .max(20)
                    .refine(
                        function (password) {
                            return /[a-z]/.test(password);
                        },
                        {
                            message: "Password Must Contain atleast one Lowercase Letter",
                        }
                    )
                    .refine(
                        function (password) {
                            return /[A-Z]/.test(password);
                        },
                        {
                            message: "Password Must Contain At Least One Uppercase Letter",
                        }
                    )
                    .refine(
                        function (password) {
                            return /[0-9]/.test(password);
                        },
                        {
                            message: "Password Must Contain Atleast a Single Number",
                        }
                    )
                    .refine(
                        function (password) {
                            return /[\W_]/.test(password);
                        },
                        {
                            message: "Password Must Contain Atleast one Special Character",
                        }
                    ),
            });
            //   Parsing the Schema Body using Zod Safe Parse
            const result = schema.safeParse({ newPassword });

            if (result.success) {
                // we will Signin
                const hashedPwd = await bcrypt.hash(newPassword, 5);
console.log("Generated hash:", hashedPwd);
await userModel.updateOne({ _id: userId }, { password: hashedPwd });
console.log("Password updated in the database");
                // make an DB Entry with the Credentials
                try {
                    await userModel.updateOne({ _id:userId }, { password: hashedPwd });
                    res.send("SuccessFul");
                    return;
                } catch (e) {
                    res.send({
                        message: "Error in Updating PWD ",
                    });
                    return;
                }
              
            } else {
                res.send(result.error);
            }
        } else {
            res.send({
                message: "Invalid Old Password",
            });
        }
    }
});

userRouter.delete("/remove", userMiddleware, async (req, res) => {
    const deleteId = req.body.deleteId;
    // @ts-ignore
    const userId = req.userId;
    console.log(deleteId);
    const response = await contentModel.findOne({
      _id: deleteId,
    });
    console.log(response?.userId!.toString());
    console.log(userId.toString());
    if (userId === response?.userId!.toString()) {
      const result = await contentModel.findByIdAndDelete(deleteId);
      if (result) {
        res.send({
          msg: "Deletion Successfull",
        });
      } else {
        res.send({
          msg: "Some Unknown Error on the delete endpoint okay",
        });
      }
    } else {
      res.sendStatus(403);
    }
  });


export { userRouter };
