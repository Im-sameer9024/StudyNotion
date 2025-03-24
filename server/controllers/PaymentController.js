import { instance } from "../config/razorpay.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";
// import courseEnrollmentEmail from "../mail/templates/courseEnrollmentEmail.js";

// capture the payment and initiate the razorpay order

const capturePayment = async (req, res) => {
  try {
    // get courseId and userId
    const { course_id } = req.body;
    const userId = req.user.id;

    // validate courseID
    if (!course_id) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    let course;

    try {
      course = await Course.findById(course_id);

      if (!course) {
        return res.status(400).json({
          success: false,
          message: "course not found",
        });
      }

      //user already enrolled in the course

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "user already enrolled in the course",
        });
      }

      // create the razorpay order

      const amount = course.price;
      const currency = "INR";
      const options = {
        amount: amount * 100,
        currency: currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
          courseId: course_id,
          userId: userId,
        },
      };

      const paymentResponse = await instance.orders.create(options);

      console.log("paymentResponse", paymentResponse);

      return res.status(200).json({
        success: true,
        message: "payment initiated",
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
      });
    } catch (error) {
      console.log("error occur in capturePayment controller", error);
      return res.status(403).json({
        success: false,
        message: "error to buy course",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifySignature = async (req, res) => {
  try {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret); //it is used to convert the webhooksecret in encrypted format

    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");

    if (digest === signature) {
      console.log("Payment is Authorized");

      const { courseId, userId } = req.body.payload.payment.entity.notes;

      try {
        //find the course and enroll the student
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          {
            $push: {
              studentEnrolled: userId,
            },
          },
          { new: true }
        );

        if (!enrolledCourse) {
          return res.status(400).json({
            success: false,
            message: "course not found",
          });
        }

        console.log("enrolledCourse is here", enrolledCourse);

        //find the student and add the course to the student

        const enrolledStudent = await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              courses: courseId,
            },
          },
          { new: true }
        );

        console.log("enrolledStudent is here", enrolledStudent);

        //mail send krdo confirmation vala

        const emailResponse = await mailSender(
          enrolledStudent.email,
          "Course Enrollment",
          `You have successfully enrolled in ${enrolledCourse.courseName}`,
          "Congratulations! You have successfully enrolled in the course. We are excited to have you as a part of our community. If you have any questions or concerns, please don't hesitate to reach out to us. Thank you for choosing us!"
        );

        console.log("emailResponse", emailResponse);

        return res.status(200).json({
          success: true,
          message: "payment verified",
        })


      } catch (error) {
        console.log("error in verifySignature controller", error);
        return res.status(403).json({
          success: false,
          message: "error in enrolling the course",
        });
      }
    }else{
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

  } catch (error) {
    console.log("error in verifySignature controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { capturePayment,verifySignature };
