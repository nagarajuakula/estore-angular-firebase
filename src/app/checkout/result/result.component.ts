import { Component, OnInit } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Product } from "../../shared/models/product.model";
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  products: Product[];
  date: number;
  totalPrice = 0;
  tax = 6.4;

  constructor(private cartService: CartService) {  }

  ngOnInit() {
    this.products = this.cartService.items;
    this.products.forEach((product) => {
      this.totalPrice += product.price;
    });

    this.date = Date.now();
  }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("ikismail.pdf"); // Generated PDF
    });
  }
}
