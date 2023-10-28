import { createHash } from "crypto";

export default function hash(str: string) {
	var hash = createHash("sha1").update(str).digest("hex");

	return hash;
}
