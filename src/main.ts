import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

// Customer Aggregate
let customer = new Customer("1", "Lucian Tavares");
const address = new Address("Rua Célio Weber", 81, "12345-678", "Criciúma");
customer.Address = address;
customer.activate();

// Order Aggregate
const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 2);
const item2 = new OrderItem("1", "1", "DDD", 99.90, 1);
const order = new Order("1", "1", [item1, item2])