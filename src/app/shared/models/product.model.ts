export class Product {
    id: string; 
    title: string; 
    description: string;
    price: number;
    imageUrl: string; 
    category: string; 
    author?: string
    constructor(id, title, description, price, imageUrl, category, author) { }
}