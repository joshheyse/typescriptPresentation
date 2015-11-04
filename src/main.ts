/// <reference path="../typings/jquery/jquery.d.ts" />

interface Calculator {
  operator: string;
  performOperation(a: number, b: number);
}

enum AdditionOperators {
  Add,
  Subtract
}

enum ProductOperators {
  Multiply,
  Divide
}

class AdditionCalculator implements Calculator {

  operator: string;

  constructor(public operatorType: AdditionOperators) {
    this.operator = AdditionOperators[operatorType];
  }

  performOperation(a: number, b: number) {
    if(this.operatorType === AdditionOperators.Add) {
      return a + b;
    }
    else if(this.operatorType === AdditionOperators.Subtract) {
      return a - b;
    }
  }
}

class ProductCalculator implements Calculator {

  operator: string;

  constructor(public operatorType: ProductOperators) {
    this.operator = ProductOperators[operatorType];
  }

  performOperation(a: number, b: number) {
    if(this.operatorType === ProductOperators.Multiply) {
      return a * b;
    }
    else if(this.operatorType === ProductOperators.Divide) {
      return a / b;
    }
  }
}

class Controller {
  private calculators : Calculator[];
  private result: JQuery;
  private operations: JQuery;

  constructor() {
    this.calculators = [
      new AdditionCalculator(AdditionOperators.Add),
      new AdditionCalculator(AdditionOperators.Subtract),
      new ProductCalculator(ProductOperators.Multiply),
      new ProductCalculator(ProductOperators.Divide)
      ];
  }

  attach() {
    this.result = $('#result');
    this.operations = $('#operations');
    this.calculators.forEach(calculator => {
      $(`<button class="btn btn-default">${calculator.operator}</button>`)
        .click(() => { this.performOperation(calculator); })
        .appendTo(this.operations);
    });
  }

  performOperation(calculator: Calculator) {
    this.result.val('');
    var a = parseInt($('#valueA').val());
    var b = parseInt($('#valueB').val());
    try {
      this.result.val(`The result of ${a} and ${b} is ${calculator.performOperation(a, b)}`);
    }
    catch(err) {
      this.result.val('There was an error performing the operation');
    }
  }
}

$(function(){
  var controller = new Controller();
  controller.attach();
});
