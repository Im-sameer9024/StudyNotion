import mongoose from "mongoose";
import mailSender from "../utils/mailSender";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    createAt: {
      type: Date,
      default: Date.now,
      expires: 5 * 60,
    },
  },
  { timestamps: true }
);

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "Verify the Email", otp);

    console.log("mailResponse is here", mailResponse);

    return mailResponse;
  } catch (error) {
    console.log("error occur in sendVerificationEmail function", error);
  }
}

OtpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default mongoose.model("Otp", OtpSchema);
