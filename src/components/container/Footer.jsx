import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
export default function Footer() {
  return (
    <FullContainer className="mt-16">
      <Container className="pt-12 border-t">
        <div className="w-full grid lg:grid-cols-footer gap-6 lg:gap-12">
          <div className="logo ">
            <h1 className="elementHeading3">BOOTABAZAAR</h1>
            <p className="my-3">
              Your one-stop destination for all your gardening needs! 🌿🌻 At
              Boota Bazar, we have reimagined the way gardening services and
              products are accessed and delivered.Are you in search of a skilled
              and reliable gardener to transform your outdoor space into a
              breathtaking oasis? Look no further! Our innovative platform
              connects you with a network of talented gardening professionals,
              each possessing a green thumb and a passion for{" "}
              {"nurturingnature's"}
              beauty. With just a few taps, you can find the perfect gardener to
              bring your garden dreams to life. But wait, {"there's"} more!
              Boota bazar Marketplace is not just about finding expert
              gardeners; {"it's"} also a thriving marketplace where boota-bazar
              entrepreneurs and gardening enthusiasts come together.
            </p>
          </div>

          <div>
            <p className="elementHeading5">Shop</p>
            <ul className="mt-3 space-y-1">
              <li>Trending</li>
              <li>Best Sellers</li>
              <li>New Releases</li>
              <li>Flash Sale</li>
              <li>Books</li>
              <li>Pestisides</li>
              <li>Tools</li>
            </ul>
            <p className="elementHeading5 mt-5">Careers</p>
            <ul className="mt-3 space-y-1">
              <li>Bootabazaar gardener</li>
              <li>Freelance gardener</li>
            </ul>
          </div>
          <div>
            <p className="elementHeading5">Quick Links</p>
            <ul className="mt-3 space-y-1">
              <li>Home</li>
              <li>About Bootabazaar</li>
              <li>Services</li>
              <li>Contact Us</li>
              <li>Blogs</li>
              <li>Term & Condition</li>
              <li>Privacy & Policy</li>
            </ul>
            <p className="elementHeading5 mt-5">Sell on Bootazbaar</p>
            <ul className="mt-3 space-y-1">
              <li>Create your store</li>
              <li>Bootabazaar Business</li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="mt-12 py-4 w-full bg-primary text-white text-center">
        Copyright © 2023 Bootabazaar. All Rights Reserved
      </div>
    </FullContainer>
  );
}
