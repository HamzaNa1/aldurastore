import "server-only";

import db from "../db";

export async function GetProductImages(productId: string) {
	return await db.query.productImages.findMany({
		where: (img, { eq }) => eq(img.productId, productId),
	});
}
