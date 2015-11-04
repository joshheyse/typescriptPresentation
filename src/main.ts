/// <reference path="../typings/jquery/jquery.d.ts" />

interface Calculator {
  operator: string;
  performOperation(a: number, b: number);
}

class AdditionCalculator implements Calculator {
  constructor(public operator: string) {
  }

  performOperation(a: number, b: number) {
    if(this.operator === 'Add') {
      return a + b;
    }
    else if(this.operator === 'Subtract') {
      return a - b;
    }
  }
}

class ProductCalculator implements Calculator {
  constructor(public operator: string) {
  }

  perfromOperation(a: number, b: number) {
    if(this.operator === 'Multiply') {
      return a * b;
    }
    else if(this.operator === 'Divide') {
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
      new AdditionCalculator('Add'),
      new AdditionCalculator('Subtract'),
      new ProductCalculator('Multiply'),
      new ProductCalculator('Divide')
      ];
  }

  attach() {
    this.result = $('#result');
    this.operations = $('#operations');
    var self = this;
    this.calculators.forEach(function(calculator) {
      $('<button class="btn btn-default">' + calculator.operator + '</button>')
        .click(function() { self.performOperation(calculator); })
        .appendTo(self.operations);
    });
  }

  performOperation(calculator: Calculator) {
    this.result.val('');
    var a = $('#valueA').val();
    var b = $('#valueB').val();
    try {
      this.result.val('The result of ' +  a + ' and ' + b + ' is ' + calculator.performOperation(a, b));
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
