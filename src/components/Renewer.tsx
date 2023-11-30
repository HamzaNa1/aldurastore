"use client";

import RenewUser from "@/actions/auth/RenewUser";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Renewer() {
	const path = usePathname();

	useEffect(() => {
		async function renew() {
			await RenewUser({});
		}

		renew();
	}, [path]);

	return <></>;
}
