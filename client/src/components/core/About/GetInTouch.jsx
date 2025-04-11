import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import CountryCode from "../../../data/countrycode.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const GetInTouch = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      message: "",
    },
  });

  // Watch the country code value to use in validation
  const countryCode = watch("countryCode");

  const onSubmit = (data) => {
    // Combine country code and phone number
    
    console.log(data);
    reset();
  };

  return (
    <div className=" w-full py-10 mt-24 ">
      <div className=" w-4/12 mx-auto text-white">
        <h3 className=" text-center  text-3xl font-bold ">Get In Touch</h3>
        <p className=" text-center text-richblack-400">
          We’d love to here for you, Please fill out this form.
        </p>

        {/*--------------------- form section-----------------------  */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-6"
        >
          {/* Name  */}
          <div className="flex justify-between w-full gap-4">
            {/* firstName  */}
            <div className="w-full">
              <Label htmlFor="firstName" className="text-richblack-300">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-400 text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* lastName  */}
            <div className="w-full">
              <Label htmlFor="lastName" className="text-richblack-300">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-400 text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email address  */}
          <div>
            <Label htmlFor="email" className="text-richblack-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-[0.6rem] mt-1">
                <sup>*</sup>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number  */}
          <div>
            <Label htmlFor="phoneNumber" className="text-richblack-300">
              Phone Number
            </Label>
            <div className="flex gap-2">
              <div className="w-[100px]">
                <Select
                  onValueChange={(value) => setValue("countryCode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CountryCode.map((item,index) => (
                        <SelectItem
                          key={index}
                          value={item.code}
                        >
                          {item.code}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("countryCode", {
                    required: "Country code is required",
                  })}
                />
                {errors.countryCode && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.countryCode.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 digits required",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum 15 digits allowed",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are allowed",
                    },
                    validate: {
                      countrySelected: () =>
                        !!countryCode || "Please select a country code first",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Message  */}
          <div className="w-full">
            <Label htmlFor="message" className="text-richblack-300">
              Message
            </Label>
            <Textarea
              name="message"
              id="message"
              disabled={isSubmitting}
              placeholder="Enter email address"
              maxLength={1000}
              rows={8}
              {...register("message", {
                required: "Message is required",
              })}
            />

            {errors.message && (
              <p className="text-red-400 text-[0.6rem] mt-1">
                <sup>*</sup>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-yellow-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
