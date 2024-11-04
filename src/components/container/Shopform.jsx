import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";

export default function ShopForm() {
  return (
    <FullContainer className="py-8 lg:py-16">
      <Container>
        <div
          className="w-full rounded-xl p-8 md:p-12 lg:p-16 text-white grid md:grid-cols-2 gap-6 items-center"
          style={{
            backgroundImage: "url('/img/ShopformBanner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center md:text-left space-y-5">
            <h2 className="text-2xl lg:text-3xl font-semibold leading-tight">
              Join Now to Receive Exclusive Deals!
            </h2>
            <p className="text-sm lg:text-base">
              Sign up for our emails and get exclusive discounts on all your
              favorite plants and gardening products!
            </p>
          </div>
          <form className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 w-full">
            <input
              className="py-3 px-4 rounded-xl w-full md:w-auto lg:w-80 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="Enter Your Email"
              aria-label="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors w-full md:w-auto"
            >
              Sign Up
            </button>
          </form>
        </div>
      </Container>
    </FullContainer>
  );
}
