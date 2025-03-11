import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2025-02-24.acacia",
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Create Stripe account
    const account = await stripe.accounts.create({
      country: "US",
      type: "custom",
      business_type: "company",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      external_account: "btok_us",
      tos_acceptance: {
        date: 1547923073,
        ip: "172.18.80.19",
      },
    });

    // Update account with business profile
    await stripe.accounts.update(account.id, {
      business_profile: {
        mcc: "5045",
        url: "https://bestcookieco.com",
      },
      company: {
        address: {
          city: "Fairfax",
          line1: "123 State St",
          postal_code: "22031",
          state: "VA",
        },
        tax_id: "000000000",
        name: "The Best Cookie Co",
        phone: "8888675309",
      },
    });

    // Create representative person
    const person = await stripe.accounts.createPerson(account.id, {
      first_name: "Jenny",
      last_name: "Rosen",
      relationship: {
        representative: true,
        title: "CEO",
      },
    });

    // Update person with additional details
    await stripe.accounts.updatePerson(account.id, person.id, {
      address: {
        city: "victoria ",
        line1: "123 State St",
        postal_code: "V8P 1A1",
        state: "BC",
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      ssn_last_4: "0000",
      phone: "8888675309",
      email: "jenny@bestcookieco.com",
      relationship: {
        executive: true,
      },
    });

    // Create owner person
    await stripe.accounts.createPerson(account.id, {
      first_name: "Kathleen",
      last_name: "Banks",
      email: "kathleen@bestcookieco.com",
      address: {
        city: "victoria ",
        line1: "123 State St",
        postal_code: "V8P 1A1",
        state: "BC",
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      phone: "8888675309",
      relationship: {
        owner: true,
        percent_ownership: 80,
      },
    });

    // Mark owners as provided
    await stripe.accounts.update(account.id, {
      company: {
        owners_provided: true,
      },
    });

    // Save the account ID to user record
    await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: account.id,
      },
    });

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:3000/callback/stripe/refresh",
      return_url: "http://localhost:3000/callback/stripe/success",
      type: "account_onboarding",
      collection_options: {
        fields: "currently_due",
      },
    });

    return NextResponse.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account:",
      error
    );
    return NextResponse.json(
      { error: "Failed to create Stripe account" },
      { status: 500 }
    );
  }
}
