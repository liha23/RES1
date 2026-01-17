import { NextRequest, NextResponse } from "next/server";
import connectDB, { isMongoDBConfigured } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    // Check if MongoDB is configured
    if (!isMongoDBConfigured()) {
      return NextResponse.json(
        {
          error: "Database not configured",
          message:
            "User credential storage is disabled. Please configure MONGODB_URI in environment variables.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { enrollmentNumber, password, rememberMe } = body;

    if (!enrollmentNumber || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Only save if rememberMe is explicitly true
    if (!rememberMe) {
      return NextResponse.json(
        { success: false, message: "Remember me not selected" },
        { status: 200 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    let user = await User.findOne({
      enrollmentNumber: enrollmentNumber.toUpperCase(),
    });

    if (user) {
      // Update existing user's password
      // Note: The password has already been verified by successful GGSIPU login,
      // so we can safely update it here
      user.password = password;
      user.lastLogin = new Date();
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Credentials updated successfully",
      });
    }

    // Create new user
    user = await User.create({
      enrollmentNumber: enrollmentNumber.toUpperCase(),
      password,
      lastLogin: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Credentials saved successfully",
    });
  } catch (error) {
    console.error("Error saving user credentials:", error);
    return NextResponse.json(
      {
        error: "Failed to save credentials",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check if MongoDB is configured
    if (!isMongoDBConfigured()) {
      return NextResponse.json(
        {
          error: "Database not configured",
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const enrollmentNumber = searchParams.get("enrollmentNumber");

    if (!enrollmentNumber) {
      return NextResponse.json(
        { error: "Missing enrollment number" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({
      enrollmentNumber: enrollmentNumber.toUpperCase(),
    });

    if (!user) {
      return NextResponse.json(
        { found: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return only that user exists, not the password
    return NextResponse.json({
      found: true,
      enrollmentNumber: user.enrollmentNumber,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error("Error fetching user credentials:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch credentials",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
