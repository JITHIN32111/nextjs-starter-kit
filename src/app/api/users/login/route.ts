
import { connect } from "@/dbConfig/dgConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { log } from "node:console"
connect()

export async function POST(request: NextRequest) {


    try {
        const reqBody = await request.json()
     console.log(reqBody);
     
        const { email, password } = reqBody

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user does not exists" }, { status: 400 })

        }

        const validPass = await bcryptjs.compare(password, user.password)

        if (!validPass) {
            return NextResponse.json({ error: "invalid password" }, { status: 400 })

        }


        //create token
        const tokenData = {
            id: user._id,
            username: user.userName,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
        const response = NextResponse.json({
            message: "login success",
            success: true
        })
        response.cookies.set("token", token, { httpOnly: true })

        return response


    } catch (error: any) {
        return NextResponse.json({ error: error.message })

    }




}