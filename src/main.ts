import Address from "./domain/customer/entity/value-object/address";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";

// Customer Aggregate
let customer = new Customer("1", "Lucian Tavares");
const address = new Address("Rua Célio Weber", 81, "12345-678", "Criciúma");
customer.Address = address;
customer.activate();

// Order Aggregate
const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 2);
const item2 = new OrderItem("1", "1", "DDD", 99.90, 1);
const order = new Order("1", "1", [item1, item2])