import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private address: any = null;
  private cartItems: { productId: string; quantity: number }[] = [];
  private shipmentOptions: string = '';
  private paymentMethod: string = '';
  private shipmentInstructions: string = '';
  private packagingOptions: { giftWrap: boolean; ecoFriendly: boolean } = {
    giftWrap: false,
    ecoFriendly: false,
  };

  constructor(private storage: StorageService) {
    const saved = this.storage.getItem('checkout');
    if (saved) {
      const data = JSON.parse(saved);
      this.shipmentOptions = data.shipmentOptions || '';
      this.shipmentInstructions = data.shipmentInstructions || '';
      this.paymentMethod = data.paymentMethod || '';
      this.address = data.address || null;
      this.cartItems = data.cartItems || [];
      this.packagingOptions = data.packagingOptions || null;
    }
  }

  private saveStorage() {
    this.storage.setItem(
      'checkout',
      JSON.stringify({
        shipmentOptions: this.shipmentOptions,
        shipmentInstructions: this.shipmentInstructions,
        address: this.address,
        paymentMethod: this.paymentMethod,
        packagingOptions: this.packagingOptions,
        cartItems: this.cartItems,
      })
    );
  }

  setShipmentOptions(option: string) {
    this.shipmentOptions = option;
    this.saveStorage();
  }
  setShipmentInstructions(option: string) {
    this.shipmentInstructions = option;
    this.saveStorage();
  }

  getShipmentInstructions() {
    return this.shipmentInstructions;
  }

  getShipmentOptions() {
    return this.shipmentOptions;
  }

  setAddress(address: string) {
    this.address = address;
    this.saveStorage();
  }

  getAddress() {
    return this.address;
  }

  setPaymentMethods(payment: string) {
    this.paymentMethod = payment;
    this.saveStorage();
  }

  getPaymentMethods() {
    return this.paymentMethod;
  }

  setPackagingOptions(packaging: { giftWrap: boolean; ecoFriendly: boolean }) {
    this.packagingOptions = packaging;
    this.saveStorage();
  }

  getPackagingOptions() {
    return this.packagingOptions;
  }

  setCartItems(items: any) {
    this.cartItems = items;
    this.saveStorage();
  }

  getCartItems() {
    return this.cartItems;
  }

  getOrderData() {
  return {
    address: this.address,
    cartItems: this.cartItems,
    shipmentOptions: this.shipmentOptions,
    paymentMethod: this.paymentMethod,
    packagingOptions: this.packagingOptions
  };
}

resetCheckout() {
  this.address = null;
  this.cartItems = [];
  this.shipmentOptions = '';
  this.paymentMethod = '';
  this.packagingOptions = { giftWrap: false, ecoFriendly: false };
  this.saveStorage()
}

 
}
