import { relations } from "drizzle-orm";
import {
	mysqlTable,
	varchar,
	boolean,
	int,
	index,
	date,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("product", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	imageURL: varchar("url", { length: 255 }).notNull(),
	showOnMain: boolean("showOnMain").default(false).notNull(),
	activated: boolean("activated").default(true).notNull(),
});

export const users = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
});

export const cartItems = mysqlTable(
	"cartItem",
	{
		id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
		userId: varchar("userId", { length: 255 }).notNull(),
		productId: varchar("productId", { length: 255 }).notNull(),
		quantity: int("quantity").notNull(),
	},
	(table) => {
		return {
			userIdx: index("userIdx").on(table.userId),
		};
	}
);

export const orders = mysqlTable("orders", {
	id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
	userId: varchar("userId", { length: 255 }).notNull(),
	isProcessed: boolean("isProcessed").default(false).notNull(),
	boughtDate: date("boughtDate").default(new Date()).notNull(),
	fulfilledDate: date("fulfilledDate"),
});

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

export const userRelations = relations(users, ({ many }) => ({
	cartItems: many(cartItems),
	orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	products: many(products),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
