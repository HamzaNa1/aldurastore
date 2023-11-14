import { relations } from "drizzle-orm";
import {
	mysqlTable,
	varchar,
	boolean,
	int,
	index,
	date,
	primaryKey,
	double,
	datetime,
} from "drizzle-orm/mysql-core";

export const heroImages = mysqlTable("heroImages", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	imageURL: varchar("imageURL", { length: 255 }).notNull(),
});

export const products = mysqlTable("products", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	cost: double("cost").notNull(),
	imageURL: varchar("imageURL", { length: 255 }).notNull(),
	showOnMain: boolean("showOnMain").default(false).notNull(),
	activated: boolean("activated").default(true).notNull(),
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
	},
	(table) => ({
		emailIdx: index("emailIdx").on(table.email),
	})
);

export const cartItems = mysqlTable(
	"cartItems",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		userId: varchar("userId", { length: 255 }).notNull(),
		productId: varchar("productId", { length: 255 }).notNull(),
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
	},
	(table) => ({
		pk: primaryKey(table.orderId, table.productId),
	})
);

export const productImages = mysqlTable("productImages", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	productId: varchar("productId", { length: 255 }).notNull(),
	imageURL: varchar("imageURL", { length: 255 }).notNull(),
});

export const productRelations = relations(products, ({ many }) => ({
	productImages: many(productImages),
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
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
}));

export const userRelations = relations(users, ({ many }) => ({
	cartItems: many(cartItems),
	orders: many(orders),
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

export const productImageRelations = relations(productImages, ({ one }) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id],
	}),
}));

export type HeroImage = typeof heroImages.$inferSelect;
export type NewHeroImage = typeof heroImages.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
