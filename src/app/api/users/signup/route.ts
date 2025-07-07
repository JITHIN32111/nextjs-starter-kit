import { connect } from "@/dbConfig/dgConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Request Body:", reqBody);

    const { userName, email, password } = reqBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    // Remove password before sending response
    const { password: _, ...userData } = savedUser.toObject();

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: userData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
