$(document).ready(function(){

  // results search
  var searchResults = {
    valueNames: [ 'title' ]
  };
  var resultsList = new List('results-section', searchResults);

  // price range slider
  var priceSlider = document.getElementById('price-range');
  noUiSlider.create(priceSlider, {
    start: [ 1000, 3000 ],
    step: 10,
    connect: true,
    range: {
      'min': 10,
      'max': 5000
    },
    format: wNumb({
      decimals: 0,
      postfix: 'k',
    })
  });
  var priceMin = document.getElementById('price-range-value-min'),
      priceMax = document.getElementById('price-range-value-max');
  priceSlider.noUiSlider.on('update', function ( values, handle ) {
    if ( handle ) {
      priceMax.innerHTML = values[handle];
    } else {
      priceMin.innerHTML = values[handle];
    }
  });

  // years range slider
  var yearsSlider = document.getElementById('years-range');
  noUiSlider.create(yearsSlider, {
    start: [ 10, 40 ],
    connect: true,
    range: {
      'min': 1,
      'max': 100
    },
    format: wNumb({
      decimals: 0
    })
  });
  var yearsMin = document.getElementById('years-range-value-min'),
      yearsMax = document.getElementById('years-range-value-max');
  yearsSlider.noUiSlider.on('update', function ( values, handle ) {
    if ( handle ) {
      yearsMax.innerHTML = values[handle];
    } else {
      yearsMin.innerHTML = values[handle];
    }
  });

});
