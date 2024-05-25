import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { log } from "console";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);
        const user = await User.findOne({email})
        
        //User already exists
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

    } catch (err:any) {
            return NextResponse.json({error: err.message},
            {status: 500}
        )
    }
}