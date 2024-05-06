"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { getErrorMessage, validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
	const senderEmail = formData.get("senderEmail");
	const message = formData.get("message");

	if (!validateString(senderEmail, 500)) {
		return {
			error: "Invalid email",
		};
	}

	if (!validateString(message, 5000)) {
		return {
			error: "Message too long",
		};
	}

	let data;

	try {
		data = await resend.emails.send({
			from: "Contact Form <onboarding@resend.dev>",
			to: "prathamesh_kulkarni@outlook.com",
			subject: "Contact Form Submission",
			reply_to: senderEmail,
			react: React.createElement(ContactFormEmail, {
				message: message as string,
				senderEmail: senderEmail as string,
			}),
		});
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		};
	}

	return {
		data,
	};
};
