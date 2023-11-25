import { relations } from "drizzle-orm";
import {
	mysqlTable,
	varchar,
	boolean,
	int,
	bigint,
	index,
	date,
	primaryKey,
	double,
	datetime,
	mysqlEnum,
} from "drizzle-orm/mysql-core";

export const heroImages = mysqlTable("heroImages", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	imageURL: varchar("imageURL", { length: 255 }).notNull(),
});

export const users = mysqlTable(
	"users",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		email: varchar("email", { length: 255 }).unique().notNull(),
		password: varchar("password", { length: 255 }).notNull(),
		createDate: datetime("createDate").default(new Date()).notNull(),
		admin: boolean("admin").default(false).notNull(),
		emailConfirmed: boolean("emailConfirmed").default(false).notNull(),
	},
	(table) => ({
		emailIdx: index("emailIdx").on(table.email),
	})
);

export const emailConfirmations = mysqlTable("emailConfirmations", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	key: varchar("key", { length: 6 }),
	expiresBy: bigint("expiresBy", { mode: "number" })
		.notNull()
		.default(new Date().getTime() + 1_000 * 60 * 15),
});

export const products = mysqlTable("products", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	type: mysqlEnum("type", ["women", "men"]).notNull(),
	imageURL: varchar("imageURL", { length: 255 }).notNull(),
	showOnMain: boolean("showOnMain").default(false).notNull(),
	activated: boolean("activated").default(true).notNull(),
});

export const productImages = mysqlTable(
	"productImages",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		productId: varchar("productId", { length: 255 }).notNull(),
		imageURL: varchar("imageURL", { length: 255 }).notNull(),
		order: int("order").notNull().default(0),
	},
	(table) => ({
		productIdx: index("productIdx").on(table.productId),
	})
);

export const productSettings = mysqlTable(
	"productSettings",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		productId: varchar("productId", { length: 255 }).notNull(),
		size: varchar("size", { length: 255 }).notNull(),
		quantity: int("quantity").notNull().default(0),
	},
	(table) => ({
		productIdx: index("productIdx").on(table.productId),
	})
);

export const productPrices = mysqlTable(
	"productPrices",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		productId: varchar("productId", { length: 255 }).notNull(),
		country: varchar("country", { length: 255 }).notNull(),
		cost: double("cost").notNull(),
	},
	(table) => ({
		productIdx: index("productIdx").on(table.productId),
	})
);

export const cartItems = mysqlTable(
	"cartItems",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		userId: varchar("userId", { length: 255 }).notNull(),
		productId: varchar("productId", { length: 255 }).notNull(),
		productSettingsId: varchar("productSettingsId", { length: 255 }).notNull(),
		quantity: int("quantity").notNull(),
	},
	(table) => ({
		userIdx: index("userIdx").on(table.userId),
	})
);

export const orders = mysqlTable("orders", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	userId: varchar("userId", { length: 255 }).notNull(),
	isProcessed: boolean("isProcessed").default(false).notNull(),
	boughtDate: date("boughtDate").default(new Date()).notNull(),
	fulfilledDate: date("fulfilledDate"),
});

export const ordersToProducts = mysqlTable(
	"ordersToProducts",
	{
		orderId: varchar("orderId", { length: 255 }).notNull(),
		productId: varchar("productId", { length: 255 }).notNull(),
		productSettingsId: varchar("productSettingsId", { length: 255 }).notNull(),
		cost: double("cost").notNull(),
	},
	(table) => ({
		pk: primaryKey(table.orderId, table.productId),
	})
);

export const userRelations = relations(users, ({ many }) => ({
	cartItems: many(cartItems),
	orders: many(orders),
}));

export const emailConfirmationRelations = relations(
	emailConfirmations,
	({ one }) => ({
		user: one(users, {
			fields: [emailConfirmations.id],
			references: [users.id],
		}),
	})
);

export const productRelations = relations(products, ({ many }) => ({
	productImages: many(productImages),
	productSettings: many(productSettings),
	productPrices: many(productPrices),
	ordersToProducts: many(ordersToProducts),
}));

export const productImageRelations = relations(productImages, ({ one }) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id],
	}),
}));

export const productSettingsRelations = relations(
	productSettings,
	({ one }) => ({
		product: one(products, {
			fields: [productSettings.productId],
			references: [products.id],
		}),
	})
);

export const productPriceRelations = relations(productPrices, ({ one }) => ({
	product: one(products, {
		fields: [productPrices.productId],
		references: [products.id],
	}),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
	user: one(users, {
		fields: [cartItems.userId],
		references: [users.id],
	}),
	product: one(products, {
		fields: [cartItems.productId],
		references: [products.id],
	}),
	productSettings: one(productSettings, {
		fields: [cartItems.productSettingsId],
		references: [productSettings.id],
	}),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	ordersToProducts: many(ordersToProducts),
}));

export const ordersToProductsRelations = relations(
	ordersToProducts,
	({ one }) => ({
		order: one(orders, {
			fields: [ordersToProducts.orderId],
			references: [orders.id],
		}),
		product: one(products, {
			fields: [ordersToProducts.productId],
			references: [products.id],
		}),
	})
);

export type User = typeof users.$inferSelect;

export type HeroImage = typeof heroImages.$inferSelect;

export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductSettings = typeof productSettings.$inferSelect;
export type ProductPrice = typeof productPrices.$inferSelect;

export type Order = typeof orders.$inferSelect;
export type OrdersToProducts = typeof ordersToProducts.$inferSelect;

export type CartItem = typeof cartItems.$inferSelect;
