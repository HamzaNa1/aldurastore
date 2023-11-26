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

interface ConfirmationEmailProps {
	code: string;
}

function ConfirmationEmailBuilder({ code }: ConfirmationEmailProps) {
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

const ConfirmationEmail = ({ code }: { code: string }) =>
	render(<ConfirmationEmailBuilder code={code} />);

export default ConfirmationEmail;

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
