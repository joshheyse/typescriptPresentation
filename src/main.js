var AdditionCalculator = function(operator) {
    this.operator = operator;
};

AdditionCalculator.prototype.performOperation = function(a, b) {
  if(this.operator === 'Add') {
    return a + b;
  }
  else if(this.operator === 'Subtract') {
    return a - b;
  }
};

var ProductCalculator = function(operator) {
    this.operator = operator;
};

ProductCalculator.prototype.perfromOperation = function(a, b) {
  if(this.operator === 'Multiply') {
    return a * b;
  }
  else if(this.operator === 'Divide') {
    return a / b;
  }
};

var Controller = function() {
  this.calculators = [
    new AdditionCalculator('Add'),
    new AdditionCalculator('Subtract'),
    new ProductCalculator('Multiply'),
    new ProductCalculator('Divide')
    ];
};

Controller.prototype.attach = function(e) {
  this.result = $('#result');
  this.operations = $('#operations');
  var self = this;
  this.calculators.forEach(function(calculator) {
    $('<button class="btn btn-default">' + calculator.operator + '</button>')
      .click(function() { self.performOperation(calculator); })
      .appendTo(self.operations);
  });
};

Controller.prototype.performOperation = function(calculator) {
  this.result.val('');
  var a = $('#valueA').val();
  var b = $('#valueB').val();
  try {
    this.result.val('The result of ' +  a + ' and ' + b + ' is ' + calculator.performOperation(a, b));
  }
  catch(err) {
    this.result.val('There was an error performing the operation');
  }
};

$(function(){
  var controller = new Controller();
  controller.attach();
});
