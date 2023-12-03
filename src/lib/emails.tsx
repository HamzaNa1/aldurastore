import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Preview,
	Text,
	render,
} from "@react-email/components";
import * as React from "react";
import { Language } from "./languages/dictionaries";
import { NewOrder } from "./schema";

interface ConfirmationEmailProps {
	code: string;
}

interface CheckoutEmailProps {
	order: NewOrder;
}

function ConfirmationEmailARBuilder({ code }: ConfirmationEmailProps) {
	return (
		<Html style={{ direction: "rtl" }}>
			<Head />
			<Preview>متجر الدرة</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`}
						width="150"
						height="150"
						alt="Aldurastore"
						style={logo}
					/>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						شكرا لك على التسجيل في متجرنا. يرجى استخدام الرمز التالي لتأكيد
						عنوان بريدك الإلكتروني.
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						رمز التأكيد: {code}
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						يرجى ملاحظة أن هذا الرمز سينتهي بعد 15 دقيقة.
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						إذا كان لديك أي أسئلة، يرجى التواصل معنا على:{" "}
						<a href="mailto:info@aldurastore.com">info@aldurastore.com</a>
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>شكرا لك,</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						فريق متجر الدرة
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

function ConfirmationEmailENBuilder({ code }: ConfirmationEmailProps) {
	return (
		<Html style={{ direction: "ltr" }}>
			<Head />
			<Preview>Durra Store</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`}
						width="150"
						height="150"
						alt="Aldurastore"
						style={logo}
					/>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						Thank you for registering in our store. Please use the following
						code to confirm your email address.
					</Text>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						Confirmation code: {code}
					</Text>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						Please note that this code will expire after 15 minutes.
					</Text>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						If you have any questions, please contact us at:{" "}
						<a href="mailto:info@aldurastore.com">info@aldurastore.com</a>
					</Text>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						Thank you,
					</Text>
					<Text style={{ textAlign: "left", direction: "ltr" }}>
						Aldurastore Team
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

function CheckoutEmailBuilder({ order }: CheckoutEmailProps) {
	return (
		<Html style={{ direction: "rtl" }}>
			<Head />
			<Preview>متجر الدرة</Preview>
			<Body style={main}>
				<Container style={container}>
					<Img
						src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`}
						width="150"
						height="150"
						alt="Aldurastore"
						style={logo}
					/>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						تم تسجيل طلب جديد
					</Text>

					<Text style={{ textAlign: "right", direction: "rtl" }}>
						<a href={"https://aldurastore.com/dashboard/orders/" + order.id}>
							Order Info
						</a>
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						الأسم: {order.firstname} {order.lastname}
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						الموقع: {order.location}, {order.region}, {order.area},{" "}
						{order.address}
					</Text>
					<Text style={{ textAlign: "right", direction: "rtl" }}>
						فريق متجر الدرة
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

export const ConfirmationEmail = (
	language: Language,
	props: ConfirmationEmailProps
) =>
	render(
		language == "ar" ? (
			<ConfirmationEmailARBuilder {...props} />
		) : (
			<ConfirmationEmailENBuilder {...props} />
		)
	);

export const CheckoutEmail = (props: CheckoutEmailProps) =>
	render(<CheckoutEmailBuilder {...props} />);

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const logo = {
	margin: "0 auto",
};
